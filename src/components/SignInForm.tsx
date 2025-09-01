


import { useEffect, useState } from 'react'
import { requestOtp, verifyOtp } from '../lib/auth';
import {  Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import { Eye, EyeOff, Key } from "lucide-react"; // Eye icons + OTP ke liye Key icon


interface SignInFormProps {
  onSwitchToSignUp: () => void
}

export function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false)
  const [otpRequested, setOtpRequested] = useState(false);

  const navigate = useNavigate()


   useEffect(()=>{
     console.log("otpSent: ",otpSent,setOtpSent)
   },[otpSent])

  // Validate email
 


  /*

 const validateEmail = () => {
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email';
    return null;
  };

  
   const handleRequestOtp = async () => {
    const emailError = validateEmail();
    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      setLoading(true);
      setError('');
      await requestOtp(email);
      setOtpSent(true);
      alert('OTP sent to your email!');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };
  
  */
 

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError('OTP is required');
      return;
    }

    setLoading(true);
    setError('');

    const res = await verifyOtp(email, otp);
    const result = await res.json()
    console.log("result: ",result)

    if (result) {
      alert('Logged in successfully! ✅');
      Cookies.set("accessToken",result?.accessToken)
      navigate("/dashboard")
    } else {
      setError(result); // now shows the real backend error
    }

    setLoading(false);
  };

  const handleResendOtp = async () => {
    setResending(true);
    setError('');

    const result = await requestOtp(email);

    if (result == true) {
      alert(otpRequested ? "OTP resent! 📩" : "OTP sent! 📩");
      setOtpRequested(true); // ✅ once requested, flip the flag

    } else {
      setError(result); // shows error from API
    }

    setResending(false);
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

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h1>
      <p className="text-[rgb(131,132,133)] mb-8">
        Please login to continue to your account
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleVerifyOtp} className="space-y-6">

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={loading}
          />
        </div>

        {/* OTP */}
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type={showOtp ? "text" : "password"}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowOtp(!showOtp)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showOtp ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {/* Keep me logged in + Resend OTP */}
        <div className="flex flex-col items-start space-y-3">
          {/* Resend OTP (left aligned) */}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resending}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resending
              ? "Sending..."
              : otpRequested
                ? "Resend OTP"
                : "Get OTP"}         
                
           </button>

          {/* Keep me logged in */}
          <label className="flex items-center space-x-2 text-gray-600">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm">Keep me logged in</span>
          </label>
        </div>



        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>
      </div>

      {/* Switch to Sign up */}
      <p className="mt-8 text-center text-gray-600">
        Need an account?{" "}
        <button
          onClick={onSwitchToSignUp}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          Create one
        </button>
      </p>
    </div>

  )
}