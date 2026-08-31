import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_GOOGLE_ACCOUNTS } from '../../services/authService';
import { X, UserPlus, ArrowRight, Loader2, ShieldCheck, Mail, User } from 'lucide-react';

export function GoogleAuthModal({ isOpen, onClose }) {
  const { selectGoogleAccount, isLoading, authError, setAuthError } = useApp();
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  if (!isOpen) return null;

  const handleSelectAccount = async (account) => {
    setSelectedAccountId(account.id);
    try {
      await selectGoogleAccount(account);
    } catch (err) {
      setSelectedAccountId(null);
    }
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!customEmail.trim()) {
      setAuthError('Please enter a valid Gmail or Google Workspace email address');
      return;
    }
    if (!customEmail.includes('@')) {
      setAuthError('Please enter a valid email address');
      return;
    }

    const customAccount = {
      id: `g_custom_${Date.now()}`,
      name: customName.trim() || customEmail.split('@')[0],
      email: customEmail.trim(),
      avatar: null
    };

    setSelectedAccountId(customAccount.id);
    try {
      await selectGoogleAccount(customAccount);
    } catch (err) {
      setSelectedAccountId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-[#D2C8BE] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
        
        {/* Google Header */}
        <div className="p-6 pb-4 border-b border-neutral-100 flex items-start justify-between bg-white">
          <div className="flex items-center gap-3">
            {/* Google Logo SVG */}
            <div className="w-10 h-10 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 font-serif">
                Sign in with Google
              </h2>
              <p className="text-xs text-neutral-500">
                Choose an account to continue to <strong className="text-neutral-800">Lexi Clear</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          
          {!isCustomMode ? (
            <>
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Available Google Accounts
              </div>

              {/* Account List */}
              <div className="space-y-2">
                {MOCK_GOOGLE_ACCOUNTS.map((account) => {
                  const isBeingSelected = selectedAccountId === account.id && isLoading;

                  return (
                    <button
                      key={account.id}
                      onClick={() => handleSelectAccount(account)}
                      disabled={isLoading}
                      className="w-full p-3.5 rounded-2xl border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/80 active:bg-neutral-100 transition-all flex items-center justify-between text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Profile Picture / Avatar */}
                        <img
                          src={account.avatar}
                          alt={account.name}
                          className="w-10 h-10 rounded-full object-cover border border-neutral-300 shadow-xs shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-neutral-900 truncate group-hover:text-blue-600 transition-colors">
                            {account.name}
                          </p>
                          <p className="text-xs text-neutral-500 truncate">
                            {account.email}
                          </p>
                        </div>
                      </div>

                      {isBeingSelected ? (
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Use Another Account Button */}
              <button
                onClick={() => setIsCustomMode(true)}
                disabled={isLoading}
                className="w-full p-3.5 rounded-2xl border border-dashed border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50/60 active:bg-neutral-100 transition-all flex items-center gap-3 text-left group cursor-pointer text-sm font-semibold text-neutral-700"
              >
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-200 transition-colors">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span>Use another account</span>
              </button>
            </>
          ) : (
            /* Custom Account Sign-In Form */
            <form onSubmit={handleCustomSubmit} className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Enter Google Account Details
                </span>
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Back to accounts
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  Full Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Adv. Vikram Sethi"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  Google Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !customEmail}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting Google Account...</span>
                  </>
                ) : (
                  <>
                    <span>Continue with this account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Google Security Footer */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>Google Identity Services OAuth 2.0</span>
            </div>
            <a 
              href="https://policies.google.com/privacy" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:underline text-neutral-500"
            >
              Privacy
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
