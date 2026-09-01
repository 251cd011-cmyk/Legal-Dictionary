import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { authService } from '../../services/authService';
import { Smartphone, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

export function MobileLogin() {
  const { 
    sendOtp, 
    setCurrentScreen, 
    pendingPhone, 
    isLoading,
    authError,
    setAuthError
  } = useApp();

  // Local input state (raw digits)
  const [phoneNumber, setPhoneNumber] = useState(() => {
    return pendingPhone ? pendingPhone.replace(/\D/g, '').slice(0, 10) : '';
  });

  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Validate on input change
  useEffect(() => {
    if (!phoneNumber) {
      setValidationError(touched ? 'Mobile number is required' : '');
      return;
    }

    if (phoneNumber.length < 10) {
      setValidationError(touched ? `Enter all 10 digits (${phoneNumber.length}/10)` : '');
      return;
    }

    if (!/^[6-9]/.test(phoneNumber)) {
      setValidationError('Indian mobile number must start with 6, 7, 8, or 9');
      return;
    }

    setValidationError('');
  }, [phoneNumber, touched]);

  // Clean and filter non-digit characters strictly, removing spaces automatically
  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    // Extract only digits (automatically strips any typed or pasted spaces)
    const digitsOnly = rawValue.replace(/\D/g, '');
    // Enforce max 10 digits constraint
    const limitedDigits = digitsOnly.slice(0, 10);
    setPhoneNumber(limitedDigits);
    setAuthError(null);
  };

  // Format value for display: "98765 43210"
  const formattedDisplay = authService.formatPhoneNumber(phoneNumber);

  const isValidNumber = phoneNumber.length === 10 && /^[6-9]/.test(phoneNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!isValidNumber) {
      if (!/^[6-9]/.test(phoneNumber)) {
        setValidationError('Indian mobile numbers must start with 6, 7, 8, or 9');
      } else {
        setValidationError('Please enter a valid 10-digit mobile number');
      }
      return;
    }

    try {
      // Pass clean 10-digit number
      await sendOtp(phoneNumber);
    } catch (err) {
      // Error is set in context
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE7] flex flex-col justify-between selection:bg-[#CCAD8E] selection:text-[#3A2D27]">
      
      {/* Header with back button */}
      <Header
        showBack={true}
        onBack={() => setCurrentScreen('login_hub')}
        step="Step 1 of 2: Mobile Login"
      />

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-[#D2C8BE] shadow-xl p-6 sm:p-8 flex flex-col animate-fade-in relative overflow-hidden">
          
          {/* Top Decorative Strip */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#3A2D27] via-[#CCAD8E] to-[#3A2D27]" />

          {/* Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-[#3A2D27] text-[#CCAD8E] flex items-center justify-center mb-5 shadow-sm border border-[#CCAD8E]/30">
            <Smartphone className="w-6 h-6" />
          </div>

          {/* Heading and Subtitle */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3A2D27] font-serif tracking-tight mb-1.5">
              Enter your mobile number
            </h1>
            <p className="text-xs sm:text-sm text-[#A48374] font-normal leading-relaxed">
              We'll send a 6-digit verification OTP code to confirm your phone number.
            </p>
          </div>

          {/* Mobile Login Form - noValidate prevents native browser tooltips */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            
            <div>
              <label htmlFor="mobile-input" className="block text-xs font-bold text-[#3A2D27] uppercase tracking-wider mb-2">
                Mobile Number
              </label>

              {/* Combined Country Code & 10-Digit Input */}
              <div className={`relative flex items-center rounded-2xl bg-white border transition-all duration-200 ${
                validationError || authError
                  ? 'border-red-500 ring-2 ring-red-200'
                  : isValidNumber
                    ? 'border-[#3A2D27] ring-2 ring-[#CCAD8E]/40'
                    : 'border-[#D2C8BE] focus-within:border-[#3A2D27] focus-within:ring-2 focus-within:ring-[#CCAD8E]/30'
              }`}>
                
                {/* 🇮🇳 +91 Country Code Box */}
                <div className="flex items-center gap-1.5 px-3.5 py-4 border-r border-[#D2C8BE] bg-[#F2EDE7]/60 rounded-l-2xl shrink-0 select-none">
                  <span className="text-xl leading-none">🇮🇳</span>
                  <span className="text-sm sm:text-base font-bold text-[#3A2D27] tracking-tight">
                    +91
                  </span>
                </div>

                {/* 10-Digit Phone Input Field without conflicting pattern attribute */}
                <input
                  id="mobile-input"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={formattedDisplay}
                  onChange={handleInputChange}
                  onBlur={() => setTouched(true)}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={11} // Accounts for the formatted space "98765 43210"
                  autoFocus
                  className="w-full px-3.5 py-4 text-base sm:text-lg font-semibold text-[#3A2D27] placeholder-[#A48374]/60 bg-transparent focus:outline-none tracking-wider"
                />

                {/* Character Counter / Success Check: Only green ✓ when number is valid */}
                <div className="pr-3.5 flex items-center">
                  {isValidNumber ? (
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shadow-xs">
                      ✓
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#A48374] tabular-nums">
                      {phoneNumber.length}/10
                    </span>
                  )}
                </div>

              </div>

              {/* Validation & Error Messages */}
              {(validationError || authError) && (
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-red-600 animate-shake">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{validationError || authError}</span>
                </div>
              )}
            </div>

            {/* Quick Demo Assist Banner */}
            <div className="p-3 rounded-xl bg-[#CCAD8E]/15 border border-[#CCAD8E]/30 flex items-start gap-2.5 text-xs text-[#3A2D27]">
              <ShieldCheck className="w-4 h-4 text-[#A48374] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#3A2D27]">Indian Mobile Verification</p>
                <p className="text-[11px] text-[#A48374]">
                  Enter any valid 10-digit number (e.g. 98765 43210) to receive an instant OTP.
                </p>
              </div>
            </div>

            {/* Continue Button: Enabled only when valid */}
            <button
              id="btn-mobile-continue"
              type="submit"
              disabled={!isValidNumber || isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-98 cursor-pointer mt-2 ${
                isValidNumber && !isLoading
                  ? 'bg-[#3A2D27] text-[#CCAD8E] hover:bg-[#A48374] hover:text-[#F2EDE7] shadow-[#3A2D27]/20 ring-2 ring-[#CCAD8E]/50'
                  : 'bg-[#D2C8BE]/70 text-[#A48374] cursor-not-allowed opacity-60'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <span>Continue to Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-[#A48374]/80">
        Lexi Clear • Protected by standard SMS security & Indian Telecommunication norms
      </footer>

    </div>
  );
}
