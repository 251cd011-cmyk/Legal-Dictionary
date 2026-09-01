import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LegalLogo } from '../common/LegalLogo';
import { TermsModal } from '../common/TermsModal';
import { Smartphone, Globe, Shield, Sparkles, Scale, ArrowRight } from 'lucide-react';

export function LoginHub() {
  const { 
    selectedLanguage, 
    setCurrentScreen, 
    setActiveModal 
  } = useApp();

  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [termsTab, setTermsTab] = useState('terms');

  const openTerms = (tab = 'terms') => {
    setTermsTab(tab);
    setTermsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F2EDE7] flex flex-col justify-between selection:bg-[#CCAD8E] selection:text-[#3A2D27]">
      
      {/* Top Bar with Language Indicator */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LegalLogo size="sm" showText={true} textClassName="text-base sm:text-lg" />
        </div>

        {selectedLanguage && (
          <button
            id="btn-switch-language-pill"
            onClick={() => setCurrentScreen('language')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#D2C8BE] text-xs sm:text-sm font-semibold text-[#3A2D27] hover:border-[#CCAD8E] hover:bg-[#CCAD8E]/10 transition-all shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#A48374]" />
            <span>{selectedLanguage.nativeName}</span>
            <span className="text-[11px] text-[#A48374]">({selectedLanguage.name})</span>
            <span className="text-[10px] text-[#CCAD8E] font-bold underline ml-0.5">Change</span>
          </button>
        )}
      </header>

      {/* Main Centered Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl border border-[#D2C8BE] shadow-xl p-6 sm:p-8 flex flex-col items-center text-center animate-fade-in relative overflow-hidden">
          
          {/* Subtle Decorative Accent Top */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#3A2D27] via-[#CCAD8E] to-[#3A2D27]" />

          {/* Lexi Clear Emblem */}
          <div className="my-2">
            <LegalLogo size="lg" showText={false} />
          </div>

          {/* Brand & Tagline */}
          <div className="space-y-1 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3A2D27] font-serif tracking-tight">
              Lexi Clear
            </h1>
            <h2 className="text-base sm:text-lg font-bold text-[#3A2D27]">
              Welcome to Lexi Clear
            </h2>
            <p className="text-xs sm:text-sm text-[#A48374] italic max-w-xs mx-auto">
              Your simple guide to understanding legal terms.
            </p>
          </div>

          {/* 3 Main Login Options */}
          <div className="w-full space-y-3.5 mb-6">
            
            {/* Option 1: Mobile Number Login */}
            <button
              id="btn-login-mobile"
              onClick={() => setCurrentScreen('mobile_login')}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-[#3A2D27] text-[#F2EDE7] hover:bg-[#A48374] active:scale-98 transition-all font-semibold text-sm sm:text-base shadow-md group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#CCAD8E] group-hover:text-white transition-colors">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="tracking-wide">Continue with Mobile Number</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#CCAD8E] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Option 2: Google Login */}
            <button
              id="btn-login-google"
              onClick={() => setActiveModal('google')}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white text-[#3A2D27] border border-[#D2C8BE] hover:border-[#3A2D27] hover:shadow-md active:scale-98 transition-all font-semibold text-sm sm:text-base group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                {/* Official Google Vector Logo */}
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                </div>
                <span className="tracking-wide">Continue with Google</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#A48374] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Option 3: Apple Login */}
            <button
              id="btn-login-apple"
              onClick={() => setActiveModal('apple')}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-black text-white hover:bg-neutral-800 active:scale-98 transition-all font-semibold text-sm sm:text-base shadow-md group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                {/* Official Apple Vector Logo */}
                <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.05-7.66-7.85-11.87-14.39-7.73-12.08-13.58-25.96-17.55-41.63-3.97-15.68-5.96-29.35-5.96-41.03 0-16.14 4.09-29.47 12.28-40.01 8.19-10.53 18.59-15.89 31.21-16.08 4.58 0 9.77 1.15 15.57 3.44 5.8 2.29 9.69 3.49 11.66 3.61 2.21-.24 6.29-1.52 12.24-3.83 5.95-2.31 11.05-3.35 15.3-3.11 12.02.72 21.68 5.16 28.98 13.33-10.53 6.39-15.68 15.34-15.46 26.85.22 9.07 3.73 16.73 10.53 22.98 6.8 6.26 14.87 9.87 24.2 10.84-2.2 6.53-4.88 13.32-8.04 20.37zM119.22 33.02c0-7.39 2.68-14.28 8.04-20.67 5.36-6.39 11.96-10.3 19.8-11.73.33 1.3.49 2.5.49 3.6 0 7.39-2.73 14.5-8.2 21.32-5.46 6.82-12.16 10.66-20.13 11.53z" />
                  </svg>
                </div>
                <span className="tracking-wide">Continue with Apple</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          {/* Security & Verification Guarantee Banner */}
          <div className="w-full py-2.5 px-3 rounded-xl bg-[#CCAD8E]/15 border border-[#CCAD8E]/30 flex items-center justify-center gap-2 text-xs text-[#3A2D27] mb-6">
            <Shield className="w-3.5 h-3.5 text-[#3A2D27] shrink-0" />
            <span>Secure 256-bit encrypted authentication</span>
          </div>

          {/* Terms & Privacy Footer */}
          <div className="text-xs text-[#A48374] leading-relaxed">
            By continuing, you agree to our{' '}
            <button
              onClick={() => openTerms('terms')}
              className="text-[#3A2D27] font-semibold underline hover:text-[#CCAD8E] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button
              onClick={() => openTerms('privacy')}
              className="text-[#3A2D27] font-semibold underline hover:text-[#CCAD8E] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            .
          </div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full text-center py-4 text-xs text-[#A48374]/80">
        Lexi Clear © {new Date().getFullYear()} • Simplified Multilingual Legal Dictionary
      </footer>

      {/* Terms & Privacy Modal */}
      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        initialTab={termsTab}
      />

    </div>
  );
}
