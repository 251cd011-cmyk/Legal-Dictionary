import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

export function TermsModal({ isOpen, onClose, initialTab = 'terms' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#F2EDE7] border border-[#D2C8BE] rounded-3xl max-w-xl w-full max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-white/70 border-b border-[#D2C8BE]/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#3A2D27] text-[#CCAD8E]">
              {activeTab === 'terms' ? <FileText className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#3A2D27] font-serif">
                {activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h3>
              <p className="text-xs text-[#A48374]">Lexi Clear Legal Dictionary</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#3A2D27] hover:bg-[#D2C8BE]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#D2C8BE] bg-white/40 px-6 pt-3 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'terms'
                ? 'border-[#3A2D27] text-[#3A2D27]'
                : 'border-transparent text-[#A48374] hover:text-[#3A2D27]'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'privacy'
                ? 'border-[#3A2D27] text-[#3A2D27]'
                : 'border-transparent text-[#A48374] hover:text-[#3A2D27]'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#3A2D27]/90 leading-relaxed">
          {activeTab === 'terms' ? (
            <>
              <div className="p-3.5 rounded-xl bg-[#CCAD8E]/15 border border-[#CCAD8E]/40 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#3A2D27] shrink-0 mt-0.5" />
                <p className="text-xs text-[#3A2D27]">
                  <strong>Legal Notice:</strong> Lexi Clear provides simplified explanations of legal terminology for educational, informational, and reference purposes. It does not constitute formal legal advice or attorney-client representation.
                </p>
              </div>

              <h4 className="font-bold text-[#3A2D27] text-base">1. User Acceptance</h4>
              <p>
                By accessing Lexi Clear via mobile OTP, Google authentication, or Apple Sign-In, you agree to comply with these terms, applicable Indian statutory laws, and the Eighth Schedule multilingual provisions.
              </p>

              <h4 className="font-bold text-[#3A2D27] text-base">2. Accurate Information</h4>
              <p>
                You agree to provide valid 10-digit Indian mobile contact details or authentic verified email credentials. OTP codes generated are confidential and personal to your session.
              </p>

              <h4 className="font-bold text-[#3A2D27] text-base">3. Intellectual Property</h4>
              <p>
                All legal term annotations, cross-lingual translations in 22 Scheduled Indian Languages, simplified summaries, and UI design elements are proprietary to Lexi Clear.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-[#3A2D27] text-base">1. Information We Collect</h4>
              <p>
                We collect your verified mobile phone number, authentication provider credentials (Google Name/Email or Apple Relay ID), and your chosen regional language preference.
              </p>

              <h4 className="font-bold text-[#3A2D27] text-base">2. Purpose of Data Processing</h4>
              <p>
                Your phone number is used exclusively for one-time password (OTP) verification and session security. We never sell, rent, or share your contact details with external third-party advertisers.
              </p>

              <h4 className="font-bold text-[#3A2D27] text-base">3. Data Security & Encryption</h4>
              <p>
                All communication is encrypted using industry standard TLS protocols. Stored authentication tokens adhere to modern cryptographic and OAuth2 standards.
              </p>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white/70 border-t border-[#D2C8BE]/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#3A2D27] text-[#F2EDE7] font-semibold text-sm hover:bg-[#A48374] transition-all"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
}
