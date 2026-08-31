import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { SCHEDULED_LANGUAGES, DEFAULT_LANGUAGE } from '../../data/languages';
import { LegalLogo } from '../common/LegalLogo';
import { 
  Globe, 
  ChevronDown, 
  Search, 
  Check, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Languages 
} from 'lucide-react';

export function LanguageSelector() {
  const { selectedLanguage, setSelectedLanguage, proceedToLogin } = useApp();
  
  // Default to existing selectedLanguage or English
  const currentLang = selectedLanguage || DEFAULT_LANGUAGE;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Set default language on mount if none was set
  useEffect(() => {
    if (!selectedLanguage) {
      setSelectedLanguage(DEFAULT_LANGUAGE);
    }
  }, [selectedLanguage, setSelectedLanguage]);

  // Filter languages
  const filteredLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SCHEDULED_LANGUAGES;
    return SCHEDULED_LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        (lang.nativeAlt && lang.nativeAlt.toLowerCase().includes(q)) ||
        lang.region.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelect = (lang) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#F2EDE7] flex flex-col justify-between selection:bg-[#CCAD8E] selection:text-[#3A2D27]">
      
      {/* Top Bar / Decorative Strip */}
      <div className="w-full bg-[#3A2D27] text-[#CCAD8E] py-2 px-4 text-center text-xs font-medium tracking-wide border-b border-[#CCAD8E]/20">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#CCAD8E]" />
          Multilingual Legal Dictionary • English & 22 Scheduled Indian Languages
        </span>
      </div>

      {/* Main Centered Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl border border-[#D2C8BE] shadow-2xl p-6 sm:p-9 flex flex-col items-center animate-fade-in relative overflow-visible">
          
          {/* Top Decorative Accent Strip */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#3A2D27] via-[#CCAD8E] to-[#3A2D27] rounded-t-3xl" />

          {/* Lexi Clear Emblem */}
          <div className="my-2">
            <LegalLogo size="lg" showText={false} />
          </div>

          {/* Header Title & Subtitle */}
          <div className="text-center space-y-1.5 mb-7">
            <span className="inline-block px-3 py-1 rounded-full bg-[#D2C8BE]/40 text-[#3A2D27] text-xs font-bold tracking-wider uppercase">
              Lexi Clear
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3A2D27] font-serif tracking-tight">
              Choose your language
            </h1>
            <p className="text-xs sm:text-sm text-[#A48374] font-normal">
              Select your preferred language to continue
            </p>
          </div>

          {/* Custom Language Dropdown Section */}
          <div className="w-full space-y-5" ref={dropdownRef}>
            
            <div>
              <label 
                htmlFor="language-dropdown-trigger" 
                className="block text-xs font-bold text-[#3A2D27] uppercase tracking-wider mb-2"
              >
                Preferred Application Language
              </label>

              {/* Dropdown Trigger Box */}
              <div className="relative">
                <button
                  id="language-dropdown-trigger"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full p-4 rounded-2xl bg-[#F2EDE7]/60 border transition-all flex items-center justify-between text-left cursor-pointer shadow-xs ${
                    isOpen 
                      ? 'border-[#3A2D27] ring-2 ring-[#CCAD8E]/40 bg-white' 
                      : 'border-[#D2C8BE] hover:border-[#3A2D27] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#3A2D27] text-[#CCAD8E] flex items-center justify-center shrink-0 shadow-xs">
                      <Languages className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-bold text-[#3A2D27] tracking-tight truncate">
                          {currentLang.name}
                        </span>
                        <span className="text-sm font-semibold text-[#A48374]">
                          ({currentLang.nativeName})
                        </span>
                      </div>
                      <p className="text-xs text-[#A48374] truncate">
                        {currentLang.region} • {currentLang.script} script
                      </p>
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-xl transition-transform duration-200 text-[#3A2D27] ${isOpen ? 'rotate-180 bg-[#D2C8BE]/40' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-[#3A2D27]" />
                  </div>
                </button>

                {/* Dropdown Menu Overlay */}
                {isOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#D2C8BE] shadow-2xl z-50 overflow-hidden animate-slide-up flex flex-col max-h-80">
                    
                    {/* Search inside Dropdown */}
                    <div className="p-3 border-b border-[#D2C8BE]/70 bg-[#F2EDE7]/50 sticky top-0 z-10">
                      <div className="relative">
                        <Search className="w-4 h-4 text-[#A48374] absolute left-3 top-3" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search language (e.g. English, Hindi, தமிழ்)..."
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#D2C8BE] text-[#3A2D27] placeholder-[#A48374] focus:outline-none focus:border-[#3A2D27]"
                        />
                      </div>
                    </div>

                    {/* Language Options List */}
                    <div className="overflow-y-auto divide-y divide-[#D2C8BE]/30 flex-1">
                      {filteredLanguages.length === 0 ? (
                        <div className="p-6 text-center text-xs text-[#A48374]">
                          No languages match "{searchQuery}"
                        </div>
                      ) : (
                        filteredLanguages.map((lang) => {
                          const isSelected = currentLang.id === lang.id;
                          return (
                            <button
                              key={lang.id}
                              type="button"
                              onClick={() => handleSelect(lang)}
                              className={`w-full p-3.5 text-left flex items-center justify-between hover:bg-[#F2EDE7] transition-colors cursor-pointer ${
                                isSelected ? 'bg-[#CCAD8E]/15 font-bold' : ''
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                                  isSelected 
                                    ? 'bg-[#3A2D27] text-[#CCAD8E]' 
                                    : 'bg-[#D2C8BE]/40 text-[#3A2D27]'
                                }`}>
                                  {lang.id.toUpperCase()}
                                </div>
                                <div>
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-bold text-[#3A2D27]">
                                      {lang.name}
                                    </span>
                                    <span className="text-xs text-[#A48374] font-medium">
                                      – {lang.nativeName}
                                    </span>
                                  </div>
                                  <span className="text-[11px] text-[#A48374]">
                                    {lang.region}
                                  </span>
                                </div>
                              </div>

                              {isSelected && (
                                <span className="w-6 h-6 rounded-full bg-[#3A2D27] text-[#CCAD8E] flex items-center justify-center shadow-xs">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </span>
                              )}
                            </button>
                          );
                        })
                      )}
                    </div>

                    {/* Dropdown Footer info */}
                    <div className="p-2.5 bg-[#F2EDE7]/70 border-t border-[#D2C8BE]/70 text-center text-[11px] text-[#A48374]">
                      Total {SCHEDULED_LANGUAGES.length} languages available (English + 22 Scheduled)
                    </div>

                  </div>
                )}
              </div>
            </div>

            {/* Selected Language Live Preview Box */}
            <div className="p-4 rounded-2xl bg-[#CCAD8E]/15 border border-[#CCAD8E]/35 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#3A2D27] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#A48374]" />
                  Language Preview
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#3A2D27] text-[#CCAD8E] text-[10px] font-bold uppercase">
                  {currentLang.isScheduled ? 'Scheduled Language' : 'Standard Language'}
                </span>
              </div>

              <div className="pt-1">
                <p className="text-xs text-[#A48374]">Greeting in {currentLang.name}:</p>
                <p className="text-sm font-semibold text-[#3A2D27] font-serif italic">
                  "{currentLang.welcomeText}"
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <button
              id="btn-language-continue"
              type="button"
              onClick={proceedToLogin}
              className="w-full py-4 rounded-2xl font-bold text-sm sm:text-base bg-[#3A2D27] text-[#CCAD8E] hover:bg-[#A48374] hover:text-[#F2EDE7] shadow-lg shadow-[#3A2D27]/15 ring-2 ring-[#CCAD8E]/40 flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer mt-2"
            >
              <span>Continue with {currentLang.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* Security & Access Info */}
          <div className="mt-6 flex items-center gap-2 text-xs text-[#A48374]">
            <ShieldCheck className="w-4 h-4 text-[#3A2D27]" />
            <span>You can change your language anytime from the settings.</span>
          </div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full text-center py-4 text-xs text-[#A48374]/80">
        Lexi Clear © {new Date().getFullYear()} • Simplified Multilingual Legal Dictionary
      </footer>

    </div>
  );
}
