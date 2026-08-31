import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { 
  Mail, 
  RotateCcw, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  CheckCircle2, 
  UserCheck, 
  Edit3 
} from 'lucide-react';

export function GoogleEmailOtpVerification() {
  const { 
    pendingGoogleAccount, 
    demoEmailOtp, 
    verifyGoogleEmailOtp, 
    selectGoogleAccount, 
    setCurrentScreen, 
    setActiveModal,
    isLoading, 
    authError, 
    setAuthError, 
    showToast 
  } = useApp();

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const inputRefs = useRef([]);

  // 45 seconds countdown timer
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const formattedTime = `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`;

  const handleDigitChange = (index, value) => {
    setAuthError(null);
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length > 1) {
      handlePaste(cleaned);
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = cleaned;
    setOtpDigits(newDigits);

    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveBoxIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
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

  const onPasteEvent = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    handlePaste(pasteData);
  };

  const autoFillDemoCode = () => {
    if (demoEmailOtp) {
      handlePaste(demoEmailOtp);
      showToast(`Autofilled Email OTP: ${demoEmailOtp}`, 'info');
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0 || !pendingGoogleAccount) return;
    setIsResending(true);
    setAuthError(null);
    try {
      await selectGoogleAccount(pendingGoogleAccount);
      setTimeLeft(45);
      setIsTimerActive(true);
      setOtpDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      setActiveBoxIndex(0);
    } catch (err) {
      // Handled in context
    } finally {
      setIsResending(false);
    }
  };

  const handleChangeAccount = () => {
    setActiveModal('google');
  };

  const isOtpComplete = otpDigits.every((d) => d !== '');
  const enteredOtp = otpDigits.join('');

  const handleVerify = async (e) => {
    e?.preventDefault();
    if (!isOtpComplete) {
      setAuthError('Please enter all 6 digits of the email verification code');
      return;
    }

    try {
      await verifyGoogleEmailOtp(enteredOtp);
      setIsSuccess(true);
    } catch (err) {
      // Error handled in context
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE7] flex flex-col justify-between selection:bg-[#CCAD8E] selection:text-[#3A2D27]">
      
      {/* Header with back button */}
      <Header
        showBack={true}
        onBack={() => setCurrentScreen('login_hub')}
        step="Google 2-Step Email Verification"
      />

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-[#D2C8BE] shadow-xl p-6 sm:p-8 flex flex-col animate-fade-in relative overflow-hidden">
          
          {/* Top Decorative Strip */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05]" />

          {/* Google Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center mb-4 shadow-xs">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
          </div>

          {/* Heading */}
          <div className="mb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3A2D27] font-serif tracking-tight mb-1">
              Verify your Google email
            </h1>
            <p className="text-xs sm:text-sm text-[#A48374] font-normal leading-relaxed">
              To secure your account, enter the 6-digit verification OTP sent to your email.
            </p>
          </div>

          {/* Chosen Google Account Pill */}
          {pendingGoogleAccount && (
            <div className="mb-5 p-3 rounded-2xl bg-[#F2EDE7]/70 border border-[#D2C8BE] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {pendingGoogleAccount.avatar ? (
                  <img
                    src={pendingGoogleAccount.avatar}
                    alt={pendingGoogleAccount.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-300 shrink-0 shadow-xs"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#3A2D27] text-[#CCAD8E] flex items-center justify-center font-bold text-sm shrink-0">
                    {pendingGoogleAccount.name?.charAt(0) || 'G'}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#3A2D27] truncate">
                    {pendingGoogleAccount.name}
                  </p>
                  <p className="text-[11px] text-[#A48374] truncate font-mono">
                    {pendingGoogleAccount.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleChangeAccount}
                className="px-2.5 py-1 rounded-xl bg-white border border-[#D2C8BE] text-[11px] font-bold text-[#3A2D27] hover:border-[#3A2D27] hover:bg-[#CCAD8E]/10 transition-all shrink-0 cursor-pointer"
              >
                Change
              </button>
            </div>
          )}

          {/* Demo OTP Helper */}
          {demoEmailOtp && (
            <div className="mb-5 p-3 rounded-2xl bg-[#CCAD8E]/20 border border-[#CCAD8E]/40 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-[#3A2D27]">
                <Mail className="w-4 h-4 text-[#3A2D27] shrink-0" />
                <span>
                  Demo Email OTP: <strong className="font-mono text-sm tracking-wider font-bold">{demoEmailOtp}</strong>
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

          {/* 6 OTP Input Boxes Form */}
          <form onSubmit={handleVerify} noValidate className="space-y-6">
            
            <div className="space-y-2">
              <label className="block text-center text-xs font-bold text-[#3A2D27] uppercase tracking-wider">
                6-Digit Email Code
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

              {authError && (
                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs font-semibold text-red-600 animate-fade-in text-center">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            {/* Countdown Timer & Resend */}
            <div className="flex items-center justify-between px-2 text-xs font-medium border-t border-b border-[#D2C8BE]/60 py-3">
              <div className="flex items-center gap-1.5 text-[#A48374]">
                {isTimerActive ? (
                  <span>
                    Resend in <strong className="text-[#3A2D27] font-mono font-bold">{formattedTime}</strong>
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold">
                    Code expired?
                  </span>
                )}
              </div>

              <button
                type="button"
                id="btn-resend-email-otp"
                disabled={isTimerActive || isResending}
                onClick={handleResend}
                className={`inline-flex items-center gap-1.5 font-bold transition-all ${
                  !isTimerActive && !isResending
                    ? 'text-[#3A2D27] hover:text-[#CCAD8E] cursor-pointer underline'
                    : 'text-[#A48374]/50 cursor-not-allowed'
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                <span>{isResending ? 'Sending...' : 'Resend Code'}</span>
              </button>
            </div>

            {/* Verify Button */}
            <button
              id="btn-verify-google-otp"
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
                  <span>Verifying Email Code...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Google Account Verified!</span>
                </>
              ) : (
                <>
                  <span>Verify Email & Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-[#A48374]/80">
        Lexi Clear Security • Google Identity 2-Step Verification
      </footer>

    </div>
  );
}
