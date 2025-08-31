

import { useState } from 'react'
import { SignUpForm } from './SignUpForm'
import { SignInForm } from './SignInForm'
import { OtpVerification } from './OtpVerification'



export function AuthLayout() {
  const [currentView, setCurrentView] = useState<'signup' | 'signin' | 'otp'>('signup')
  const [otpEmail, setOtpEmail] = useState('')

  const handleOtpSent = (email: string) => {
    setOtpEmail(email)
    setCurrentView('otp')
  }

  const handleBackToSignUp = () => {
    setCurrentView('signup')
    setOtpEmail('')
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        {currentView === 'signup' && (
          <SignUpForm
            onSwitchToSignIn={() => setCurrentView('signin')}
            onOtpSent={handleOtpSent}
          />
        )}
        {currentView === 'signin' && (
          <SignInForm onSwitchToSignUp={() => setCurrentView('signup')} />
        )}
        {currentView === 'otp' && (
          <OtpVerification email={otpEmail} onBack={handleBackToSignUp} />
        )}
      </div>

       {/* Right Panel - Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="/right-column.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>


    </div>
  )
}