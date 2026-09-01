import React from 'react';
import { useApp } from '../../context/AppContext';
import { LegalLogo } from './LegalLogo';
import { ChevronLeft, Globe, RotateCcw } from 'lucide-react';

export function Header({ showBack = false, onBack, title, step }) {
  const { selectedLanguage, setCurrentScreen, resetEntireFlow, currentScreen } = useApp();

  return (
    <header className="w-full bg-[#F2EDE7]/90 backdrop-blur-md border-b border-[#D2C8BE]/60 sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Left Side: Back button or Brand Logo */}
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl text-[#3A2D27] hover:bg-[#D2C8BE]/40 active:scale-95 transition-all flex items-center justify-center"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <div 
            onClick={() => {
              if (currentScreen !== 'language') {
                setCurrentScreen('login_hub');
              }
            }}
            className="flex items-center cursor-pointer group"
          >
            <LegalLogo size="sm" showText={true} textClassName="text-lg sm:text-xl" />
          </div>
        </div>

        {/* Center / Step indicator on mobile/tablet */}
        {step && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#D2C8BE]/30 text-xs font-semibold text-[#A48374]">
            <span>{step}</span>
          </div>
        )}

        {/* Right Side: Language Badge & Reset button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {selectedLanguage && (
            <button
              onClick={() => setCurrentScreen('language')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#D2C8BE] text-xs sm:text-sm font-medium text-[#3A2D27] hover:border-[#CCAD8E] hover:bg-[#CCAD8E]/10 transition-all shadow-xs"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#A48374]" />
              <span className="font-semibold">{selectedLanguage.nativeName}</span>
              <span className="hidden sm:inline text-xs text-[#A48374]">({selectedLanguage.name})</span>
            </button>
          )}

          {/* Quick Reset Flow (for easy pair-testing of all auth paths) */}
          <button
            onClick={resetEntireFlow}
            className="p-2 rounded-xl text-[#A48374] hover:text-[#3A2D27] hover:bg-[#D2C8BE]/40 transition-all"
            title="Reset to Language Selection"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
