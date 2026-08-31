import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { authService } from '../../services/authService';
import { ShieldCheck, RotateCcw, Edit3, ArrowRight, AlertCircle, Loader2, KeyRound, CheckCircle2 } from 'lucide-react';

export function OtpVerification() {
  const { 
    pendingPhone, 
    demoOtp, 
    verifyOtp, 
    sendOtp, 
    setCurrentScreen, 
    isLoading,
    authError,
    setAuthError,
    showToast
  } = useApp();

  // 6 separate OTP boxes state
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const inputRefs = useRef([]);

  // 45 seconds countdown timer
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Timer countdown hook
  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Format time display: "00:28"
  const formattedTime = `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`;

  // Formatted mobile number for display: "+91 98765 43210"
  const formattedPhoneDisplay = authService.formatPhoneNumber(pendingPhone);

  // Handle single digit input
  const handleDigitChange = (index, value) => {
    setAuthError(null);
    const cleaned = value.replace(/\D/g, '');

    // If multiple digits (from typing or fast paste)
    if (cleaned.length > 1) {
      handlePaste(cleaned);
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = cleaned;
    setOtpDigits(newDigits);

    // Auto-advance to next box if digit entered
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveBoxIndex(index + 1);
    }
  };

  // Handle Backspace, Arrow navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        // Move to previous box and clear
        const newDigits = [...otpDigits];
        newDigits[index - 1] = '';
        setOtpDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
        setActiveBoxIndex(index - 1);
      } else {
        const newDigits = [...otpDigits];
        newDigits[index] = '';
        setOtpDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveBoxIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveBoxIndex(index + 1);
    }
  };

  // Handle 6-digit OTP Paste
  const handlePaste = (pastedText) => {
    const digits = pastedText.replace(/\D/g, '').slice(0, 6);
    if (!digits) return;

    const newDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < digits.length; i++) {
      newDigits[i] = digits[i];
    }
    setOtpDigits(newDigits);

    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
    setActiveBoxIndex(nextIndex);
  };

  // On Paste event
  const onPasteEvent = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    handlePaste(pasteData);
  };

  // Quick auto-fill helper for demo code
  const autoFillDemoCode = () => {
    if (demoOtp) {
      handlePaste(demoOtp);
      showToast(`Autofilled OTP: ${demoOtp}`, 'info');
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (timeLeft > 0) return;
    setIsResending(true);
    setAuthError(null);
    try {
      await sendOtp(pendingPhone);
      setTimeLeft(45);
      setIsTimerActive(true);
      setOtpDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      setActiveBoxIndex(0);
    } catch (err) {
      // Error handled in context
    } finally {
      setIsResending(false);
    }
  };

  const isOtpComplete = otpDigits.every((d) => d !== '');
  const enteredOtp = otpDigits.join('');

  // Submit OTP Verification
  const handleVerify = async (e) => {
    e?.preventDefault();
    if (!isOtpComplete) {
      setAuthError('Please enter all 6 digits of the verification OTP');
      return;
    }

    try {
      await verifyOtp(enteredOtp);
      setIsSuccess(true);
    } catch (err) {
      // Failed verification triggers shake
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE7] flex flex-col justify-between selection:bg-[#CCAD8E] selection:text-[#3A2D27]">
      
      {/* Header with back button */}
      <Header
        showBack={true}
        onBack={() => setCurrentScreen('mobile_login')}
        step="Step 2 of 2: OTP Verification"
      />

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-[#D2C8BE] shadow-xl p-6 sm:p-8 flex flex-col animate-fade-in relative overflow-hidden">
          
          {/* Top Decorative Strip */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#3A2D27] via-[#CCAD8E] to-[#3A2D27]" />

          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-[#3A2D27] text-[#CCAD8E] flex items-center justify-center mb-5 shadow-sm border border-[#CCAD8E]/30">
            <KeyRound className="w-6 h-6" />
          </div>

          {/* Headings */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3A2D27] font-serif tracking-tight mb-1.5">
              Verify your mobile number
            </h1>
            
            <p className="text-xs sm:text-sm text-[#A48374] font-normal leading-relaxed">
              Enter the 6-digit OTP sent to{' '}
              <strong className="text-[#3A2D27] font-bold">
                +91 {formattedPhoneDisplay || 'XXXXX XXXXX'}
              </strong>
            </p>

            {/* Change Mobile Number Button */}
            <button
              onClick={() => setCurrentScreen('mobile_login')}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#3A2D27] hover:text-[#CCAD8E] hover:underline transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Change Mobile Number</span>
            </button>
          </div>

          {/* Demo OTP Helper Banner */}
          {demoOtp && (
            <div className="mb-6 p-3 rounded-2xl bg-[#CCAD8E]/20 border border-[#CCAD8E]/40 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-[#3A2D27]">
                <ShieldCheck className="w-4 h-4 text-[#3A2D27] shrink-0" />
                <span>
                  Demo OTP Code: <strong className="font-mono text-sm tracking-wider font-bold">{demoOtp}</strong>
                </span>
              </div>
              <button
                onClick={autoFillDemoCode}
                className="px-2.5 py-1 rounded-lg bg-[#3A2D27] text-[#CCAD8E] text-[11px] font-bold hover:bg-[#A48374] hover:text-white transition-all cursor-pointer shrink-0"
              >
                Auto-fill
              </button>
            </div>
          )}

          {/* 6 OTP Input Boxes */}
          <form onSubmit={handleVerify} noValidate className="space-y-6">
            
            <div className="space-y-2">
              <label className="block text-center text-xs font-bold text-[#3A2D27] uppercase tracking-wider">
                6-Digit Security Code
              </label>

              <div 
                className={`flex items-center justify-between gap-1.5 sm:gap-2.5 max-w-sm mx-auto ${authError ? 'animate-shake' : ''}`}
                onPaste={onPasteEvent}
              >
                {otpDigits.map((digit, index) => {
                  const isFilled = digit !== '';
                  const isCurrent = activeBoxIndex === index;

                  return (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onFocus={() => setActiveBoxIndex(index)}
                      className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-bold font-mono rounded-2xl border transition-all duration-150 otp-input ${
                        authError
                          ? 'border-red-500 bg-red-50/50 text-red-700'
                          : isFilled
                            ? 'border-[#3A2D27] bg-white text-[#3A2D27] shadow-xs'
                            : isCurrent
                              ? 'border-[#3A2D27] ring-2 ring-[#CCAD8E]/50 bg-white'
                              : 'border-[#D2C8BE] bg-[#F2EDE7]/40 text-[#3A2D27]'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Error Message */}
              {authError && (
                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs font-semibold text-red-600 animate-fade-in text-center">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            {/* Countdown Timer & Resend OTP */}
            <div className="flex items-center justify-between px-2 text-xs font-medium border-t border-b border-[#D2C8BE]/60 py-3">
              
              <div className="flex items-center gap-1.5 text-[#A48374]">
                {isTimerActive ? (
                  <span>
                    Resend code in <strong className="text-[#3A2D27] font-mono font-bold">{formattedTime}</strong>
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold">
                    Code expired or not received?
                  </span>
                )}
              </div>

              <button
                type="button"
                id="btn-resend-otp"
                disabled={isTimerActive || isResending}
                onClick={handleResend}
                className={`inline-flex items-center gap-1.5 font-bold transition-all ${
                  !isTimerActive && !isResending
                    ? 'text-[#3A2D27] hover:text-[#CCAD8E] cursor-pointer underline'
                    : 'text-[#A48374]/50 cursor-not-allowed'
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                <span>{isResending ? 'Sending...' : 'Resend OTP'}</span>
              </button>

            </div>

            {/* Verify OTP Button */}
            <button
              id="btn-verify-otp"
              type="submit"
              disabled={!isOtpComplete || isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-98 cursor-pointer ${
                isOtpComplete && !isLoading
                  ? 'bg-[#3A2D27] text-[#CCAD8E] hover:bg-[#A48374] hover:text-[#F2EDE7] shadow-[#3A2D27]/20 ring-2 ring-[#CCAD8E]/50'
                  : 'bg-[#D2C8BE]/70 text-[#A48374] cursor-not-allowed opacity-60'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying Security Code...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Verified Successfully!</span>
                </>
              ) : (
                <>
                  <span>Verify OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-[#A48374]/80">
        Lexi Clear Security • End-to-end encrypted session
      </footer>

    </div>
  );
}
