

import React, { useState } from 'react';
import { Calendar, Mail, User } from 'lucide-react';
import { signUp } from '../lib/auth';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
  onOtpSent: (email: string) => void; // callback to switch to OTP verification
}

export function SignUpForm({ onSwitchToSignIn, onOtpSent }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.dateOfBirth) return 'Date of birth is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const result = await signUp(formData.email, formData.name, formData.dateOfBirth);

    if (result === true) {
      // ✅ success → move to OTP verification
      alert('Signup successful! OTP sent 📩');
      onOtpSent(formData.email);
    } else {
      // ❌ error → show backend message
      setError(result);
    }

    setLoading(false);
  };


  return (
    <div className="w-full max-w-md">
      <div className="flex items-center mb-8">
        {/* Image */}
        <div className="mr-2">
          <img
            src="/icon.png"
            alt="Logo"
            className="h-8 w-8 object-contain"
          />
        </div>
        {/* Text */}        
        <span className="text-xl font-semibold text-gray-800">HD</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign up</h1>
      <p className="text-gray-600 mb-8">Sign up to enjoy the features of HD</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={loading}
          />
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending OTP...' : 'Get OTP'}
        </button>
      </form>

      <p className="mt-8 text-center text-gray-600">
        Already have an account?{' '}
        <button
          onClick={onSwitchToSignIn}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
