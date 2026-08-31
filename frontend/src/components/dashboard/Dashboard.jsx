import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_LEGAL_TERMS } from '../../data/legalTerms';
import { LegalLogo } from '../common/LegalLogo';
import { 
  Search, 
  Globe, 
  LogOut, 
  BookOpen, 
  Scale, 
  ShieldCheck, 
  Bookmark, 
  Volume2, 
  Share2, 
  Sparkles, 
  Tag, 
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

export function Dashboard() {
  const { 
    user, 
    selectedLanguage, 
    setCurrentScreen, 
    logout, 
    resetEntireFlow,
    showToast 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set(['term-1']));
  const [speakingId, setSpeakingId] = useState(null);

  // Categories list
  const categories = ['All', 'Constitutional Law', 'Criminal Law', 'Criminal Procedure', 'Evidence Law', 'Civil & Legal Drafting', 'Property & Civil Law'];

  // Filtered terms
  const filteredTerms = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return SAMPLE_LEGAL_TERMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.term.toLowerCase().includes(q) ||
        item.shortDefinition.toLowerCase().includes(q) ||
        item.simplifiedMeaning.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [searchTerm, selectedCategory]);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Term removed from saved bookmarks', 'info');
      } else {
        next.add(id);
        showToast('Term saved to your legal library!', 'success');
      }
      return next;
    });
  };

  const handleSpeak = (item) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.term);
      utterance.rate = 0.9;
      setSpeakingId(item.id);
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      showToast(`Pronouncing: ${item.pronunciation}`, 'info');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE7] text-[#3A2D27] flex flex-col justify-between selection:bg-[#CCAD8E] selection:text-[#3A2D27]">
      
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-[#3A2D27] text-[#F2EDE7] border-b border-[#CCAD8E]/30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          
          {/* Brand Emblem */}
          <div className="flex items-center gap-3">
            <LegalLogo size="sm" showText={true} textClassName="text-xl text-[#F2EDE7]" />
          </div>

          {/* Center Search Preview (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#CCAD8E] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search legal terms in ${selectedLanguage?.name || 'your language'}...`}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-[#CCAD8E]/30 text-sm text-[#F2EDE7] placeholder-[#D2C8BE]/60 focus:outline-none focus:bg-white/20 focus:border-[#CCAD8E] transition-all"
              />
            </div>
          </div>

          {/* Right Actions: Language Switcher & Profile/Logout */}
          <div className="flex items-center gap-3">
            
            {/* Language Switch Button */}
            <button
              onClick={() => setCurrentScreen('language')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#CCAD8E]/20 hover:bg-[#CCAD8E]/30 border border-[#CCAD8E]/40 text-xs sm:text-sm font-semibold text-[#CCAD8E] transition-all cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-bold">{selectedLanguage?.nativeName || 'हिन्दी'}</span>
              <span className="hidden sm:inline text-xs opacity-80">({selectedLanguage?.name || 'Hindi'})</span>
            </button>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/15">
              <button
                id="btn-nav-profile"
                onClick={() => setCurrentScreen('profile')}
                className="flex items-center gap-2.5 text-left p-1 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                title="View & Edit Profile"
              >
                <div className="w-8 h-8 rounded-full bg-[#CCAD8E] text-[#3A2D27] flex items-center justify-center font-bold text-xs overflow-hidden border border-[#CCAD8E]/60 shrink-0">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#F2EDE7] truncate max-w-[120px] group-hover:text-[#CCAD8E] transition-colors">
                    {user?.name || 'Advocate'}
                  </span>
                  <span className="text-[10px] text-[#CCAD8E] font-medium uppercase tracking-wider">
                    {user?.provider || 'Verified'}
                  </span>
                </div>
              </button>

              <button
                id="btn-logout"
                onClick={logout}
                className="p-2 rounded-xl text-[#D2C8BE] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </nav>

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
        
        {/* Welcome Hero Banner */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#3A2D27] text-[#F2EDE7] border border-[#CCAD8E]/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Background Decorative Gradient */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#CCAD8E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#CCAD8E] text-[#3A2D27] text-[11px] font-bold uppercase tracking-wider">
                Active Session
              </span>
              <span className="text-xs text-[#D2C8BE]">
                Logged in via <strong className="capitalize text-[#CCAD8E]">{user?.provider || 'Mobile OTP'}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif tracking-tight text-[#F2EDE7]">
              {selectedLanguage?.welcomeText || 'Welcome to Lexi Clear'}
            </h1>

            <p className="text-xs sm:text-sm text-[#D2C8BE] leading-relaxed">
              Exploring simplified Indian statutory legal terms, constitutional rights, and case law in <strong className="text-[#CCAD8E]">{selectedLanguage?.name} ({selectedLanguage?.nativeName})</strong>.
            </p>
          </div>

          {/* Quick Flow Tester Card */}
          <div className="p-4 rounded-2xl bg-white/10 border border-[#CCAD8E]/30 backdrop-blur-xs flex flex-col gap-2 shrink-0 md:w-64">
            <div className="flex items-center justify-between text-xs font-semibold text-[#CCAD8E]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Authentication State
              </span>
              <span className="text-emerald-400">Active</span>
            </div>
            <p className="text-[11px] text-[#D2C8BE]">
              User: <strong className="text-white">{user?.name || user?.phone || 'Scholar'}</strong>
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setCurrentScreen('profile')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-white/20 text-white hover:bg-white/30 text-[11px] font-bold transition-all text-center cursor-pointer"
              >
                Manage Profile
              </button>
              <button
                onClick={resetEntireFlow}
                className="flex-1 py-1.5 px-2 rounded-lg bg-[#CCAD8E] text-[#3A2D27] text-[11px] font-bold hover:bg-[#A48374] hover:text-white transition-all text-center cursor-pointer"
              >
                Test First Flow
              </button>
            </div>
          </div>

        </section>

        {/* Mobile Search Bar */}
        <div className="md:hidden relative">
          <Search className="w-5 h-5 text-[#A48374] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search legal terms..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#D2C8BE] text-sm text-[#3A2D27] placeholder-[#A48374]/70 shadow-xs focus:outline-none focus:border-[#3A2D27]"
          />
        </div>

        {/* Category Filter Pills */}
        <section className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-[#A48374] shrink-0 mr-1" />
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#3A2D27] text-[#CCAD8E] shadow-sm'
                    : 'bg-white/80 text-[#3A2D27] border border-[#D2C8BE] hover:border-[#CCAD8E]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </section>

        {/* Legal Dictionary Terms Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#3A2D27] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#A48374]" />
              <span>Legal Dictionary Catalog</span>
            </h2>
            <span className="text-xs text-[#A48374] font-medium">
              Showing {filteredTerms.length} verified terms
            </span>
          </div>

          {filteredTerms.length === 0 ? (
            <div className="bg-white/70 border border-[#D2C8BE] rounded-3xl p-10 text-center">
              <Scale className="w-10 h-10 text-[#A48374] mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold text-[#3A2D27]">No legal terms found for "{searchTerm}"</p>
              <p className="text-xs text-[#A48374] mt-1">Try resetting the category filter or search keywords.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="mt-3 px-4 py-2 rounded-xl bg-[#3A2D27] text-[#F2EDE7] text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredTerms.map((item) => {
                const isBookmarked = bookmarkedIds.has(item.id);
                const isSpeaking = speakingId === item.id;
                const translation = item.translations[selectedLanguage?.id] || item.translations['hi'];

                return (
                  <article
                    key={item.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#D2C8BE] hover:border-[#CCAD8E] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      
                      {/* Card Header: Category & Actions */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-lg bg-[#F2EDE7] border border-[#D2C8BE] text-[11px] font-bold text-[#3A2D27]">
                          {item.category}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleSpeak(item)}
                            className={`p-1.5 rounded-lg text-[#A48374] hover:text-[#3A2D27] hover:bg-[#F2EDE7] transition-colors ${
                              isSpeaking ? 'text-[#CCAD8E] animate-pulse' : ''
                            }`}
                            title="Listen Pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => toggleBookmark(item.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isBookmarked 
                                ? 'text-[#3A2D27] bg-[#CCAD8E]/30' 
                                : 'text-[#A48374] hover:text-[#3A2D27] hover:bg-[#F2EDE7]'
                            }`}
                            title="Save Bookmark"
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Term Title & Pronunciation */}
                      <div className="mb-2">
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#3A2D27] tracking-tight">
                            {item.term}
                          </h3>
                        </div>
                        <p className="text-xs text-[#A48374] font-mono">
                          {item.pronunciation} • {item.origin}
                        </p>
                      </div>

                      {/* Simplified Meaning Box */}
                      <div className="my-3 p-3.5 rounded-2xl bg-[#F2EDE7]/70 border border-[#D2C8BE]/70 space-y-1">
                        <p className="text-[11px] font-bold text-[#A48374] uppercase tracking-wider">
                          Simplified Explanation
                        </p>
                        <p className="text-xs sm:text-sm text-[#3A2D27] font-medium leading-relaxed">
                          {item.simplifiedMeaning}
                        </p>
                      </div>

                      {/* Multi-lingual Translation in Chosen Language */}
                      {translation && (
                        <div className="my-3 p-3 rounded-2xl bg-[#CCAD8E]/15 border border-[#CCAD8E]/40 space-y-0.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#3A2D27]">
                            <Globe className="w-3 h-3 text-[#A48374]" />
                            <span>In {selectedLanguage?.name || 'Selected Language'}:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#3A2D27] font-semibold leading-relaxed">
                            {translation}
                          </p>
                        </div>
                      )}

                      {/* Full Formal Definition */}
                      <p className="text-xs text-[#3A2D27]/80 leading-relaxed line-clamp-3 mb-3">
                        {item.shortDefinition}
                      </p>

                    </div>

                    {/* Card Footer: Article Reference & Tags */}
                    <div className="pt-3 border-t border-[#D2C8BE]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-[11px] font-semibold text-[#A48374]">
                        Ref: {item.article}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md bg-[#F2EDE7] text-[10px] font-medium text-[#A48374]">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </article>
                );
              })}
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#3A2D27] text-[#D2C8BE] py-6 px-4 border-t border-[#CCAD8E]/30 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <LegalLogo size="sm" showText={true} textClassName="text-base text-white" />
            <span className="text-[#CCAD8E] ml-2">| Multilingual Legal Dictionary</span>
          </div>

          <div className="text-center sm:text-right text-[#D2C8BE]/80">
            Selected Language: <strong className="text-[#CCAD8E]">{selectedLanguage?.name} ({selectedLanguage?.nativeName})</strong> • 22 Scheduled Languages
          </div>
        </div>
      </footer>

    </div>
  );
}
