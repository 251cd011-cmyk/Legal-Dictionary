/**
 * Lexi Clear — State Management & Audio/OCR Services
 */

import { api } from './api.js';

export const state = {
  activeRoute: '/',
  categories: [],
  popularTerms: [],
  recentTerms: [],
  bookmarks: new Set(),
  stats: null,
  
  // Voice search state
  isListening: false,
  recognition: null,
  voiceSupported: false,
  voiceTranscript: '',

  // Pre-loaded sample legal documents for instant user demonstration
  sampleDocuments: [
    {
      id: 'rental-lease',
      title: 'Residential Lease Agreement Snippet',
      desc: 'Contains terms on consideration, indemnity, breach of contract, and damages.',
      content: `RESIDENTIAL LEASE AGREEMENT
This agreement is made between Landlord and Tenant. The Tenant covenants to pay monthly consideration of rent in the amount of $1,500. In the event of default or breach of contract, the Landlord shall be entitled to claim damages and forfeit the security deposit. The Tenant hereby agrees to furnish an indemnity protecting the Landlord against any negligence or third-party liabilities arising from occupancy.`
    },
    {
      id: 'police-fir',
      title: 'Police FIR & Criminal Complaint Snippet',
      desc: 'Contains terms on FIR, cognizable offence, bail, and warrant.',
      content: `FIRST INFORMATION REPORT (FIR) - CRIME NO. 412/2026
Complainant states that an armed robbery occurred at 02:00 hours. The investigating officer registered an FIR noting that daylight armed robbery constitutes a serious cognizable offence. The magistrate subsequently issued an arrest warrant for the prime suspect, who later moved an application seeking regular bail and anticipatory bail.`
    },
    {
      id: 'commercial-contract',
      title: 'Commercial Supply Contract Snippet',
      desc: 'Contains terms on contract, consideration, breach of contract, and res judicata.',
      content: `COMMERCIAL SUPPLY AND SERVICES CONTRACT
The Supplier agrees to deliver enterprise hardware within thirty days. Both parties acknowledge the mutual exchange of valuable consideration. Any dispute arising out of this contract shall be settled by arbitration; any prior decree shall operate as res judicata preventing subsequent claims on identical matters.`
    }
  ],

  async init() {
    this.categories = await api.getCategories();
    const popularRes = await api.getTerms({ popular: true });
    this.popularTerms = popularRes.terms;
    this.recentTerms = await api.getRecent();
    const bms = await api.getBookmarks();
    this.bookmarks = new Set(bms.map(b => b.slug));
    this.stats = await api.getStats();

    this.initSpeechRecognition();
  },

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.voiceSupported = true;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    } else {
      this.voiceSupported = false;
    }
  },

  speakText(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      showToast('🔊 Playing legal pronunciation audio');
    } else {
      showToast('Text-to-speech is not supported in this browser.');
    }
  }
};

/**
 * Global Toast Notification Helper
 */
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
