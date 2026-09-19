/**
 * Lexi Clear — UI Components & Views
 * Generates semantic, accessible, modern DOM components.
 */

import { api } from './api.js';
import { state, showToast } from './state.js';
import { navigate } from './router.js';

/* --- SVG Icons Helper --- */
export const icons = {
  scale: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  mic: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,
  scan: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" x2="17" y1="12" y2="12"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  bookmark: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  bookmarkFilled: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#b45309" stroke="#b45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  share: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`,
  volume: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  bookOpen: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  folder: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`,
  camera: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  help: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`
};

/**
 * Category Icon Selector
 */
export function getCategoryIconSvg(iconName) {
  const map = {
    'shield-alert': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
    'scale': icons.scale,
    'landmark': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`,
    'users': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    'building-2': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
    'file-signature': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 19.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L20 7.5V11"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>`,
    'home': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    'briefcase': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    'laptop': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>`,
    'receipt': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/></svg>`,
    'shopping-bag': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    'search': icons.search
  };
  return map[iconName] || icons.scale;
}

/**
 * Reusable Search Bar Component with Autocomplete Dropdown
 */
export function createSearchBar({ placeholder = 'Search legal terms (e.g., Bail, FIR, Tort, Habeas Corpus)...', initialQuery = '', onSearch = null, autoFocus = false } = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'search-bar-wrapper';

  wrapper.innerHTML = `
    <div class="search-input-group">
      <span class="search-icon-prefix">${icons.search}</span>
      <input type="text" class="search-input" id="main-search-input" placeholder="${placeholder}" value="${initialQuery}" autocomplete="off" aria-label="Search legal terms" />
      <div class="search-actions-group">
        <button type="button" class="clear-search-btn ${initialQuery ? 'visible' : ''}" id="clear-search-btn" title="Clear search" aria-label="Clear search">
          ${icons.close}
        </button>
        <button type="button" class="search-tool-btn voice-btn" id="voice-search-btn" title="Voice Search" aria-label="Voice Search">
          ${icons.mic}
        </button>
        <button type="button" class="search-tool-btn" id="scan-search-btn" title="Scan or Upload Document" aria-label="Scan Document">
          ${icons.scan}
        </button>
      </div>
    </div>
    <div class="suggestions-dropdown" id="search-suggestions-dropdown" role="listbox"></div>
  `;

  const input = wrapper.querySelector('#main-search-input');
  const clearBtn = wrapper.querySelector('#clear-search-btn');
  const suggestionsBox = wrapper.querySelector('#search-suggestions-dropdown');
  const voiceBtn = wrapper.querySelector('#voice-search-btn');
  const scanBtn = wrapper.querySelector('#scan-search-btn');

  if (autoFocus) {
    setTimeout(() => input.focus(), 100);
  }

  let debounceTimer = null;

  // Autocomplete fetch
  input.addEventListener('input', (e) => {
    const val = e.target.value;
    clearBtn.classList.toggle('visible', val.length > 0);

    clearTimeout(debounceTimer);
    if (!val || val.trim().length === 0) {
      suggestionsBox.classList.remove('visible');
      suggestionsBox.innerHTML = '';
      if (onSearch) onSearch('');
      return;
    }

    debounceTimer = setTimeout(async () => {
      const suggestions = await api.getSuggestions(val);
      if (suggestions && suggestions.length > 0) {
        suggestionsBox.innerHTML = `
          <div class="suggestion-header">Suggestions (${suggestions.length})</div>
          ${suggestions.map(s => `
            <div class="suggestion-item" data-slug="${s.slug}" role="option">
              <div>
                <div class="suggestion-term-title">${s.name}</div>
                <div class="suggestion-term-meaning">${s.simple_meaning}</div>
              </div>
              <span class="suggestion-category-tag">${s.category_name}</span>
            </div>
          `).join('')}
        `;
        suggestionsBox.classList.add('visible');
      } else {
        suggestionsBox.classList.remove('visible');
        suggestionsBox.innerHTML = '';
      }

      if (onSearch) onSearch(val);
    }, 220);
  });

  // Enter to search or navigate to first suggestion
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const firstItem = suggestionsBox.querySelector('.suggestion-item');
      if (suggestionsBox.classList.contains('visible') && firstItem) {
        navigate(`/term/${firstItem.dataset.slug}`);
        suggestionsBox.classList.remove('visible');
      } else if (input.value.trim()) {
        navigate(`/search?q=${encodeURIComponent(input.value.trim())}`);
      }
    }
  });

  // Click on suggestion
  suggestionsBox.addEventListener('click', (e) => {
    const item = e.target.closest('.suggestion-item');
    if (item && item.dataset.slug) {
      navigate(`/term/${item.dataset.slug}`);
      suggestionsBox.classList.remove('visible');
    }
  });

  // Clear button
  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.classList.remove('visible');
    suggestionsBox.classList.remove('visible');
    input.focus();
    if (onSearch) onSearch('');
  });

  // Voice button trigger
  voiceBtn.addEventListener('click', () => {
    openVoiceModal();
  });

  // Scan button trigger
  scanBtn.addEventListener('click', () => {
    openScanModal();
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      suggestionsBox.classList.remove('visible');
    }
  });

  return wrapper;
}

/**
 * Term Card Component
 */
export function createTermCard(term) {
  const card = document.createElement('article');
  card.className = 'card term-card';
  card.dataset.slug = term.slug;
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Legal term ${term.name}`);

  card.innerHTML = `
    <div class="term-card-header">
      <h3 class="term-card-title">${term.name}</h3>
      <span class="badge badge-primary">${term.category_name || 'Legal'}</span>
    </div>
    <p class="term-card-meaning">${term.simple_meaning}</p>
    <div class="term-card-footer">
      <span class="term-card-action">
        View Definition ${icons.arrowRight}
      </span>
    </div>
  `;

  card.addEventListener('click', () => {
    navigate(`/term/${term.slug}`);
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/term/${term.slug}`);
    }
  });

  return card;
}

/**
 * Category Card Component
 */
export function createCategoryCard(cat) {
  const card = document.createElement('div');
  card.className = 'card category-card';
  card.dataset.slug = cat.slug;
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Category ${cat.name}`);

  card.innerHTML = `
    <div class="category-card-top">
      <div class="category-icon-box">
        ${getCategoryIconSvg(cat.icon)}
      </div>
      <span class="badge badge-slate">${cat.term_count || cat.real_term_count || 0} terms</span>
    </div>
    <h3 class="category-card-title">${cat.name}</h3>
    <p class="category-card-desc">${cat.description}</p>
    <div class="category-card-bottom">
      <span>Explore Category</span>
      <span style="color: var(--primary);">${icons.arrowRight}</span>
    </div>
  `;

  card.addEventListener('click', () => {
    navigate(`/categories/${cat.slug}`);
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/categories/${cat.slug}`);
    }
  });

  return card;
}

/* ==========================================================================
   VIEWS: HOME / DASHBOARD VIEW
   ========================================================================== */
export async function renderHomeView(container) {
  container.innerHTML = `
    <section class="hero-section">
      <div class="container">
        <div class="hero-pill">
          ${icons.scale}
          <span>Lexi Clear Legal Dictionary</span>
        </div>
        <h1 class="hero-title">Understand the law, <span style="color: var(--primary);">simply.</span></h1>
        <p class="hero-tagline">Demystifying legal jargon through plain explanations, realistic examples, and interactive search.</p>
        
        <div class="hero-search-box" id="hero-search-container"></div>

        <div class="quick-search-tags">
          <span style="font-weight: 600;">Popular searches:</span>
          <button type="button" class="quick-search-tag" data-query="Bail">Bail</button>
          <button type="button" class="quick-search-tag" data-query="FIR">FIR</button>
          <button type="button" class="quick-search-tag" data-query="Negligence">Negligence</button>
          <button type="button" class="quick-search-tag" data-query="Defamation">Defamation</button>
          <button type="button" class="quick-search-tag" data-query="Contract">Contract</button>
          <button type="button" class="quick-search-tag" data-query="Habeas Corpus">Habeas Corpus</button>
        </div>
      </div>
    </section>

    <div class="container">
      <!-- Popular Legal Terms Section -->
      <section class="content-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <h2 class="section-title">Popular Legal Terms</h2>
            <span class="section-subtitle">Commonly searched legal concepts</span>
          </div>
          <button type="button" class="section-link-btn" id="view-all-terms-btn">
            Explore all terms ${icons.arrowRight}
          </button>
        </div>
        <div class="grid-responsive-terms" id="popular-terms-grid"></div>
      </section>

      <!-- Recently Viewed Section -->
      <section class="content-section" id="recent-terms-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <h2 class="section-title">Recently Viewed</h2>
            <span class="section-subtitle">Your learning trail</span>
          </div>
          <button type="button" class="section-link-btn" id="clear-recent-btn" style="color: var(--text-muted);">
            Clear History
          </button>
        </div>
        <div class="grid-responsive-terms" id="recent-terms-grid"></div>
      </section>

      <!-- Categories Section -->
      <section class="content-section" style="margin-bottom: 2rem;">
        <div class="section-header">
          <div class="section-title-wrap">
            <h2 class="section-title">Legal Categories</h2>
            <span class="section-subtitle">Browse terms by practice area</span>
          </div>
          <button type="button" class="section-link-btn" id="view-all-categories-btn">
            View All Categories ${icons.arrowRight}
          </button>
        </div>
        <div class="grid-responsive-categories" id="home-categories-grid"></div>
      </section>
    </div>
  `;

  // Attach search bar
  const heroSearchContainer = container.querySelector('#hero-search-container');
  const searchBar = createSearchBar({
    placeholder: 'Search legal terms, definitions, laws...'
  });
  heroSearchContainer.appendChild(searchBar);

  // Quick tag buttons
  container.querySelectorAll('.quick-search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      navigate(`/search?q=${encodeURIComponent(tag.dataset.query)}`);
    });
  });

  // Buttons navigation
  container.querySelector('#view-all-terms-btn').addEventListener('click', () => navigate('/search'));
  container.querySelector('#view-all-categories-btn').addEventListener('click', () => navigate('/categories'));

  // Popular Terms Grid
  const popularGrid = container.querySelector('#popular-terms-grid');
  if (state.popularTerms.length > 0) {
    state.popularTerms.forEach(t => popularGrid.appendChild(createTermCard(t)));
  } else {
    popularGrid.innerHTML = `<div class="skeleton" style="height: 140px;"></div>`;
  }

  // Recent Terms Grid
  const recentSection = container.querySelector('#recent-terms-section');
  const recentGrid = container.querySelector('#recent-terms-grid');
  const clearRecentBtn = container.querySelector('#clear-recent-btn');

  const updateRecentGrid = async () => {
    const recent = await api.getRecent();
    if (recent && recent.length > 0) {
      recentGrid.innerHTML = '';
      recent.slice(0, 3).forEach(t => recentGrid.appendChild(createTermCard(t)));
      recentSection.style.display = 'block';
    } else {
      recentSection.style.display = 'none';
    }
  };
  await updateRecentGrid();

  clearRecentBtn.addEventListener('click', async () => {
    await api.clearRecent();
    showToast('Recent viewing history cleared');
    updateRecentGrid();
  });

  // Categories Grid (display up to 6 on homepage)
  const catGrid = container.querySelector('#home-categories-grid');
  if (state.categories.length > 0) {
    state.categories.slice(0, 6).forEach(c => catGrid.appendChild(createCategoryCard(c)));
  }
}

/* ==========================================================================
   VIEWS: SEARCH PAGE
   ========================================================================== */
export async function renderSearchView(container, searchParams = {}) {
  const query = searchParams.q || '';
  const selectedCategory = searchParams.category || 'all';

  container.innerHTML = `
    <div class="container" style="padding-top: 1.75rem;">
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.35rem;">
          Legal Search
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Search through comprehensive definitions, case explanations, and statutory terminology.
        </p>
      </div>

      <div id="search-page-input-box" style="margin-bottom: 1.25rem;"></div>

      <!-- Filter Pills -->
      <div class="filter-pills-bar" id="search-category-filters" role="tablist" aria-label="Category filters">
        <button type="button" class="filter-pill ${selectedCategory === 'all' ? 'active' : ''}" data-cat="all">
          All Categories
        </button>
        ${state.categories.map(c => `
          <button type="button" class="filter-pill ${selectedCategory === c.slug ? 'active' : ''}" data-cat="${c.slug}">
            ${c.name}
          </button>
        `).join('')}
      </div>

      <!-- Results Info -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin: 1rem 0 1.25rem;">
        <span id="results-count-text" style="font-size: 0.9rem; font-weight: 600; color: var(--text-muted);">
          Loading results...
        </span>
      </div>

      <!-- Results Grid -->
      <div class="grid-responsive-terms" id="search-results-grid"></div>

      <!-- Empty State Container -->
      <div id="search-empty-state" style="display: none;"></div>
    </div>
  `;

  let currentQ = query;
  let currentCat = selectedCategory;

  const resultsGrid = container.querySelector('#search-results-grid');
  const countText = container.querySelector('#results-count-text');
  const emptyState = container.querySelector('#search-empty-state');
  const filterPills = container.querySelectorAll('.filter-pill');

  const executeSearch = async () => {
    resultsGrid.innerHTML = `
      <div class="skeleton" style="height: 140px;"></div>
      <div class="skeleton" style="height: 140px;"></div>
      <div class="skeleton" style="height: 140px;"></div>
    `;
    emptyState.style.display = 'none';

    const data = await api.getTerms({
      q: currentQ,
      category: currentCat
    });

    resultsGrid.innerHTML = '';
    const terms = data.terms || [];
    countText.textContent = `Showing ${terms.length} ${terms.length === 1 ? 'legal term' : 'legal terms'}${currentQ ? ` for "${currentQ}"` : ''}`;

    if (terms.length > 0) {
      terms.forEach(t => resultsGrid.appendChild(createTermCard(t)));
    } else {
      emptyState.style.display = 'block';
      emptyState.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">${icons.search}</div>
          <h3 class="empty-state-title">No legal terms found</h3>
          <p class="empty-state-desc">
            We couldn't find any results matching "<strong>${currentQ}</strong>"${currentCat !== 'all' ? ` in this category` : ''}. Check the spelling or explore popular legal terms below.
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <button type="button" class="secondary-btn" id="reset-filter-btn">
              Reset Filters
            </button>
            <button type="button" class="primary-btn" id="view-popular-btn">
              View Popular Terms
            </button>
          </div>
        </div>
      `;

      container.querySelector('#reset-filter-btn')?.addEventListener('click', () => {
        currentQ = '';
        currentCat = 'all';
        filterPills.forEach(p => p.classList.toggle('active', p.dataset.cat === 'all'));
        executeSearch();
      });

      container.querySelector('#view-popular-btn')?.addEventListener('click', () => {
        navigate('/');
      });
    }
  };

  // Attach search bar
  const searchContainer = container.querySelector('#search-page-input-box');
  const searchBar = createSearchBar({
    initialQuery: currentQ,
    autoFocus: !currentQ,
    onSearch: (newQ) => {
      currentQ = newQ;
      executeSearch();
    }
  });
  searchContainer.appendChild(searchBar);

  // Category filter clicks
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCat = pill.dataset.cat;
      executeSearch();
    });
  });

  await executeSearch();
}

/* ==========================================================================
   VIEWS: LEGAL TERM DETAIL PAGE
   ========================================================================== */
export async function renderTermDetailView(container, slug) {
  container.innerHTML = `
    <div class="container">
      <div class="term-detail-container">
        <div class="skeleton" style="height: 40px; width: 120px; margin-bottom: 1.5rem;"></div>
        <div class="skeleton" style="height: 300px; border-radius: 16px; margin-bottom: 1.5rem;"></div>
      </div>
    </div>
  `;

  const term = await api.getTermDetail(slug);
  if (!term) {
    container.innerHTML = `
      <div class="container" style="padding: 3rem 1.25rem; text-align: center;">
        <div class="empty-state">
          <div class="empty-state-icon">${icons.info}</div>
          <h2 class="empty-state-title">Term Not Found</h2>
          <p class="empty-state-desc">The legal term "${slug}" was not found in our legal dictionary database.</p>
          <button type="button" class="primary-btn" id="back-home-btn">${icons.arrowLeft} Return to Lexi Clear Home</button>
        </div>
      </div>
    `;
    container.querySelector('#back-home-btn')?.addEventListener('click', () => navigate('/'));
    return;
  }

  const isBookmarked = state.bookmarks.has(term.slug);

  container.innerHTML = `
    <div class="container">
      <div class="term-detail-container">
        <!-- Back Navigation -->
        <div class="back-nav-bar">
          <button type="button" class="back-link" id="detail-back-btn">
            ${icons.arrowLeft} Back
          </button>
          <div style="font-size: 0.85rem; color: var(--text-muted);">
            <a href="/" style="color: var(--primary); font-weight: 600;">Home</a> / 
            <a href="/categories/${term.category_slug}" style="color: var(--primary); font-weight: 600;">${term.category_name}</a> / 
            <span>${term.name}</span>
          </div>
        </div>

        <!-- Term Header Hero Card -->
        <article class="term-detail-hero">
          <div class="term-detail-meta">
            <a href="/categories/${term.category_slug}" class="badge badge-primary" style="font-size: 0.825rem; padding: 0.35rem 0.85rem;">
              ${term.category_name}
            </a>
            <div class="term-detail-actions">
              <button type="button" class="icon-button" id="pronounce-btn" title="Pronounce Term & Definition" aria-label="Pronounce Term">
                ${icons.volume}
              </button>
              <button type="button" class="icon-button" id="bookmark-btn" title="Save / Bookmark" aria-label="Bookmark">
                ${isBookmarked ? icons.bookmarkFilled : icons.bookmark}
              </button>
              <button type="button" class="icon-button" id="share-btn" title="Share Term" aria-label="Share">
                ${icons.share}
              </button>
            </div>
          </div>

          <h1 class="term-detail-name">${term.name}</h1>

          <!-- Simple Meaning Highlight Card -->
          <div class="simple-meaning-card">
            <div class="simple-meaning-badge">
              ${icons.lightbulb} In simple words
            </div>
            <p class="simple-meaning-text">${term.simple_meaning}</p>
          </div>

          <!-- Detailed Explanation -->
          <div class="detail-block-card">
            <h2 class="detail-block-title">${icons.bookOpen} Detailed Legal Explanation</h2>
            <p class="detail-block-content">${term.detailed_explanation}</p>
          </div>

          <!-- Example Card -->
          <div class="detail-block-card example-card">
            <h2 class="detail-block-title" style="color: var(--accent-gold);">${icons.scale} Real-World Example</h2>
            <p class="detail-block-content" style="font-style: italic; color: var(--text-main);">
              "${term.example}"
            </p>
          </div>

          <!-- Key Nuances / Points -->
          ${term.key_points && term.key_points.length > 0 ? `
            <div class="detail-block-card">
              <h2 class="detail-block-title">${icons.check} Key Legal Nuances</h2>
              <ul class="key-points-list">
                ${term.key_points.map(pt => `
                  <li class="key-point-item">
                    <span class="key-point-icon">${icons.check}</span>
                    <span>${pt}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- Related Terms Section -->
          ${term.related_terms_detailed && term.related_terms_detailed.length > 0 ? `
            <div style="margin-top: 2rem;">
              <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem;">
                Related Legal Terms
              </h2>
              <div class="grid-responsive-terms" id="related-terms-grid">
                ${term.related_terms_detailed.map(rt => `
                  <div class="card term-card" data-slug="${rt.slug}" tabindex="0" role="button">
                    <div class="term-card-header">
                      <h4 class="term-card-title">${rt.name}</h4>
                      <span class="badge badge-slate">${rt.category_name}</span>
                    </div>
                    <p class="term-card-meaning">${rt.simple_meaning}</p>
                    <div class="term-card-footer">
                      <span class="term-card-action">Explore ${icons.arrowRight}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </article>
      </div>
    </div>
  `;

  // Back button
  container.querySelector('#detail-back-btn')?.addEventListener('click', () => {
    window.history.back();
  });

  // Pronounce button (TTS)
  container.querySelector('#pronounce-btn')?.addEventListener('click', () => {
    state.speakText(`${term.name}. In simple words: ${term.simple_meaning}`);
  });

  // Bookmark toggle
  const bookmarkBtn = container.querySelector('#bookmark-btn');
  bookmarkBtn?.addEventListener('click', async () => {
    const res = await api.toggleBookmark(term.slug);
    if (res.success) {
      if (res.is_bookmarked) {
        state.bookmarks.add(term.slug);
        bookmarkBtn.innerHTML = icons.bookmarkFilled;
        showToast(`Saved "${term.name}" to your Bookmarks`, 'success');
      } else {
        state.bookmarks.delete(term.slug);
        bookmarkBtn.innerHTML = icons.bookmark;
        showToast(`Removed "${term.name}" from Bookmarks`);
      }
    }
  });

  // Share button
  container.querySelector('#share-btn')?.addEventListener('click', () => {
    openShareModal(term);
  });

  // Related terms click
  container.querySelectorAll('#related-terms-grid .term-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate(`/term/${card.dataset.slug}`);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate(`/term/${card.dataset.slug}`);
      }
    });
  });
}

/* ==========================================================================
   VIEWS: CATEGORIES OVERVIEW PAGE
   ========================================================================== */
export async function renderCategoriesView(container) {
  container.innerHTML = `
    <div class="container" style="padding-top: 2rem;">
      <div style="margin-bottom: 2rem; text-align: center;">
        <h1 style="font-size: 2.2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem;">
          Legal Categories
        </h1>
        <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 600px; margin: 0 auto;">
          Explore legal terms by area of law. From criminal justice to constitutional jurisprudence and corporate statutes.
        </p>
      </div>

      <div class="grid-responsive-categories" id="all-categories-grid">
        ${state.categories.map(c => `
          <div class="card category-card" data-slug="${c.slug}" tabindex="0" role="button">
            <div class="category-card-top">
              <div class="category-icon-box">
                ${getCategoryIconSvg(c.icon)}
              </div>
              <span class="badge badge-slate">${c.term_count || c.real_term_count || 0} terms</span>
            </div>
            <h2 class="category-card-title">${c.name}</h2>
            <p class="category-card-desc">${c.description}</p>
            <div class="category-card-bottom">
              <span>View Terms</span>
              <span style="color: var(--primary);">${icons.arrowRight}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate(`/categories/${card.dataset.slug}`);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate(`/categories/${card.dataset.slug}`);
      }
    });
  });
}

/* ==========================================================================
   VIEWS: CATEGORY DETAIL PAGE (with A-Z Filter)
   ========================================================================== */
export async function renderCategoryDetailView(container, slug) {
  container.innerHTML = `
    <div class="container" style="padding-top: 1.75rem;">
      <div class="skeleton" style="height: 120px; border-radius: 16px; margin-bottom: 1.5rem;"></div>
      <div class="grid-responsive-terms">
        <div class="skeleton" style="height: 140px;"></div>
        <div class="skeleton" style="height: 140px;"></div>
        <div class="skeleton" style="height: 140px;"></div>
      </div>
    </div>
  `;

  const category = await api.getCategoryDetail(slug);
  if (!category) {
    container.innerHTML = `
      <div class="container" style="padding: 3rem 1.25rem; text-align: center;">
        <div class="empty-state">
          <div class="empty-state-icon">${icons.info}</div>
          <h2 class="empty-state-title">Category Not Found</h2>
          <p class="empty-state-desc">The requested legal category does not exist.</p>
          <button type="button" class="primary-btn" id="cat-not-found-btn">Browse All Categories</button>
        </div>
      </div>
    `;
    container.querySelector('#cat-not-found-btn')?.addEventListener('click', () => navigate('/categories'));
    return;
  }

  const allTerms = category.terms || [];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  container.innerHTML = `
    <div class="container" style="padding-top: 1.75rem;">
      <!-- Breadcrumb -->
      <div style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--text-muted);">
        <a href="/" style="color: var(--primary); font-weight: 600;">Home</a> / 
        <a href="/categories" style="color: var(--primary); font-weight: 600;">Categories</a> / 
        <span>${category.name}</span>
      </div>

      <!-- Header Banner -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 1.75rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1.25rem;">
        <div class="category-icon-box" style="width: 56px; height: 56px; flex-shrink: 0;">
          ${getCategoryIconSvg(category.icon)}
        </div>
        <div>
          <h1 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.25rem;">
            ${category.name}
          </h1>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            ${category.description}
          </p>
        </div>
      </div>

      <!-- Search in category & Alphabetical Bar -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 0.75rem 1rem; margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; justify-content: space-between;">
          <input type="text" id="cat-search-filter" placeholder="Filter ${category.name} terms..." style="flex: 1; min-width: 200px; padding: 0.5rem 0.75rem; border: 1px solid var(--border-light); border-radius: var(--radius-md); outline: none; font-size: 0.925rem;" />
          <div class="alphabet-strip" id="cat-alphabet-strip">
            <button type="button" class="alphabet-btn active" data-letter="ALL">ALL</button>
            ${alphabet.map(l => `<button type="button" class="alphabet-btn" data-letter="${l}">${l}</button>`).join('')}
          </div>
        </div>
      </div>

      <!-- Terms count -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
        <span id="cat-terms-count" style="font-size: 0.9rem; font-weight: 600; color: var(--text-muted);">
          Showing ${allTerms.length} terms
        </span>
      </div>

      <!-- Terms Grid -->
      <div class="grid-responsive-terms" id="cat-terms-grid"></div>

      <div id="cat-empty-state" style="display: none;">
        <div class="empty-state">
          <div class="empty-state-icon">${icons.search}</div>
          <h3 class="empty-state-title">No terms found</h3>
          <p class="empty-state-desc">No terms in ${category.name} match your current filter.</p>
        </div>
      </div>
    </div>
  `;

  const termsGrid = container.querySelector('#cat-terms-grid');
  const countSpan = container.querySelector('#cat-terms-count');
  const emptyBox = container.querySelector('#cat-empty-state');
  const searchInput = container.querySelector('#cat-search-filter');
  const alphabetBtns = container.querySelectorAll('.alphabet-btn');

  let activeLetter = 'ALL';
  let activeQuery = '';

  const filterAndRender = () => {
    let filtered = allTerms;
    if (activeLetter !== 'ALL') {
      filtered = filtered.filter(t => t.name.toUpperCase().startsWith(activeLetter));
    }
    if (activeQuery.trim()) {
      const q = activeQuery.toLowerCase().trim();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.simple_meaning.toLowerCase().includes(q)
      );
    }

    termsGrid.innerHTML = '';
    countSpan.textContent = `Showing ${filtered.length} terms`;

    if (filtered.length > 0) {
      emptyBox.style.display = 'none';
      filtered.forEach(t => termsGrid.appendChild(createTermCard(t)));
    } else {
      emptyBox.style.display = 'block';
    }
  };

  alphabetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alphabetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeLetter = btn.dataset.letter;
      filterAndRender();
    });
  });

  searchInput.addEventListener('input', (e) => {
    activeQuery = e.target.value;
    filterAndRender();
  });

  filterAndRender();
}

/* ==========================================================================
   VIEWS: SAVED / BOOKMARKS VIEW
   ========================================================================== */
export async function renderBookmarksView(container) {
  container.innerHTML = `
    <div class="container" style="padding-top: 2rem;">
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.35rem;">
          Saved Terms
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Quickly access the legal concepts you've bookmarked for reference.
        </p>
      </div>

      <div class="grid-responsive-terms" id="bookmarks-grid">
        <div class="skeleton" style="height: 140px;"></div>
        <div class="skeleton" style="height: 140px;"></div>
      </div>

      <div id="bookmarks-empty-state" style="display: none;">
        <div class="empty-state">
          <div class="empty-state-icon">${icons.bookmark}</div>
          <h2 class="empty-state-title">No saved terms yet</h2>
          <p class="empty-state-desc">
            When exploring legal terms, tap the bookmark icon to save them here for quick study and reference.
          </p>
          <button type="button" class="primary-btn" id="browse-popular-btn">
            Explore Terms to Save
          </button>
        </div>
      </div>
    </div>
  `;

  const bookmarksGrid = container.querySelector('#bookmarks-grid');
  const emptyState = container.querySelector('#bookmarks-empty-state');

  const bookmarks = await api.getBookmarks();
  bookmarksGrid.innerHTML = '';

  if (bookmarks && bookmarks.length > 0) {
    emptyState.style.display = 'none';
    bookmarks.forEach(t => bookmarksGrid.appendChild(createTermCard(t)));
  } else {
    emptyState.style.display = 'block';
    container.querySelector('#browse-popular-btn')?.addEventListener('click', () => navigate('/search'));
  }
}

/* ==========================================================================
   VIEWS: RECENT VIEW
   ========================================================================== */
export async function renderRecentView(container) {
  container.innerHTML = `
    <div class="container" style="padding-top: 2rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.35rem;">
            Recently Viewed Terms
          </h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            History of definitions you have explored recently.
          </p>
        </div>
        <button type="button" class="secondary-btn" id="clear-all-recent-btn">
          Clear History
        </button>
      </div>

      <div class="grid-responsive-terms" id="recent-page-grid">
        <div class="skeleton" style="height: 140px;"></div>
      </div>

      <div id="recent-page-empty-state" style="display: none;">
        <div class="empty-state">
          <div class="empty-state-icon">${icons.clock}</div>
          <h2 class="empty-state-title">No viewing history</h2>
          <p class="empty-state-desc">You haven't viewed any legal terms yet. Start searching to build your history.</p>
          <button type="button" class="primary-btn" id="recent-search-btn">Search Dictionary</button>
        </div>
      </div>
    </div>
  `;

  const grid = container.querySelector('#recent-page-grid');
  const emptyBox = container.querySelector('#recent-page-empty-state');
  const clearBtn = container.querySelector('#clear-all-recent-btn');

  const loadRecent = async () => {
    const recent = await api.getRecent();
    grid.innerHTML = '';
    if (recent && recent.length > 0) {
      emptyBox.style.display = 'none';
      clearBtn.style.display = 'inline-flex';
      recent.forEach(t => grid.appendChild(createTermCard(t)));
    } else {
      emptyBox.style.display = 'block';
      clearBtn.style.display = 'none';
    }
  };

  clearBtn.addEventListener('click', async () => {
    await api.clearRecent();
    showToast('Viewing history cleared');
    loadRecent();
  });

  container.querySelector('#recent-search-btn')?.addEventListener('click', () => navigate('/search'));

  await loadRecent();
}

/* ==========================================================================
   GLOBAL MODALS: VOICE SEARCH MODAL
   ========================================================================== */
export function openVoiceModal() {
  const modalBackdrop = document.getElementById('voice-modal-backdrop');
  if (!modalBackdrop) return;

  modalBackdrop.classList.add('active');

  const micCircle = modalBackdrop.querySelector('#voice-mic-circle');
  const statusText = modalBackdrop.querySelector('#voice-status-text');
  const detectedText = modalBackdrop.querySelector('#voice-detected-text');
  const cancelBtn = modalBackdrop.querySelector('#voice-cancel-btn');
  const searchActionBtn = modalBackdrop.querySelector('#voice-search-action-btn');

  detectedText.textContent = 'Listening for legal term...';
  statusText.textContent = 'Listening...';
  micCircle.classList.add('recording');

  let recognizedQuery = '';

  // Use Web Speech API if supported
  if (state.voiceSupported && state.recognition) {
    try {
      state.recognition.start();

      state.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        recognizedQuery = transcript;
        detectedText.textContent = `"${transcript}"`;
        statusText.textContent = 'Speech detected!';
      };

      state.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          statusText.textContent = 'Microphone permission denied';
          detectedText.textContent = 'Please allow microphone access in your browser settings, or select a sample query below.';
        } else {
          statusText.textContent = 'Speech not detected';
          detectedText.textContent = 'Try speaking again or choose a sample term below.';
        }
        micCircle.classList.remove('recording');
      };

      state.recognition.onend = () => {
        micCircle.classList.remove('recording');
        if (recognizedQuery) {
          statusText.textContent = 'Ready to search';
        }
      };
    } catch (err) {
      console.warn('Speech recognition start error:', err);
    }
  } else {
    // Graceful fallback for non-speech browsers or headless testing
    statusText.textContent = 'Voice Search Simulation';
    detectedText.textContent = 'Click any demo voice query below to test voice search:';
    micCircle.classList.remove('recording');
  }

  // Quick prompt buttons in modal
  modalBackdrop.querySelectorAll('.voice-demo-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      recognizedQuery = chip.dataset.query;
      detectedText.textContent = `"${recognizedQuery}"`;
      statusText.textContent = 'Simulated voice input received';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    if (state.voiceSupported && state.recognition) {
      try { state.recognition.stop(); } catch (e) {}
    }
  };

  cancelBtn.onclick = closeModal;
  modalBackdrop.querySelector('.modal-close-btn').onclick = closeModal;

  searchActionBtn.onclick = () => {
    const finalQ = (recognizedQuery || detectedText.textContent.replace(/"/g, '')).trim();
    closeModal();
    if (finalQ && !finalQ.includes('Listening') && !finalQ.includes('Click any demo')) {
      navigate(`/search?q=${encodeURIComponent(finalQ)}`);
    } else {
      navigate('/search');
    }
  };
}

/* ==========================================================================
   GLOBAL MODALS: SCAN / DOCUMENT SEARCH MODAL
   ========================================================================== */
export function openScanModal() {
  const modalBackdrop = document.getElementById('scan-modal-backdrop');
  if (!modalBackdrop) return;

  modalBackdrop.classList.add('active');

  const dropzone = modalBackdrop.querySelector('#scan-dropzone');
  const fileInput = modalBackdrop.querySelector('#scan-file-input');
  const scannerBox = modalBackdrop.querySelector('#scan-scanner-box');
  const scannerText = modalBackdrop.querySelector('#scan-scanner-text');
  const resultsBox = modalBackdrop.querySelector('#scan-results-box');
  const detectedCount = modalBackdrop.querySelector('#scan-detected-count');
  const detectedCloud = modalBackdrop.querySelector('#scan-detected-cloud');
  const resetBtn = modalBackdrop.querySelector('#scan-reset-btn');

  // Reset state
  scannerBox.style.display = 'none';
  resultsBox.style.display = 'none';
  dropzone.style.display = 'block';

  // Process and analyze text
  const processContent = async (text, label = 'Document') => {
    dropzone.style.display = 'none';
    scannerBox.style.display = 'block';
    resultsBox.style.display = 'none';
    scannerText.textContent = `[ANALYZING ${label.toUpperCase()}]\nScanning legal vocabulary database...\nParsing covenants, definitions, and legal entities...`;

    // Visual scanning animation delay for realistic UX
    setTimeout(async () => {
      const data = await api.scanDocument({ text });
      scannerBox.style.display = 'none';
      resultsBox.style.display = 'block';

      if (data.success && data.detected_terms && data.detected_terms.length > 0) {
        detectedCount.textContent = `Detected ${data.detected_count} Legal Terms`;
        detectedCloud.innerHTML = data.detected_terms.map(t => `
          <button type="button" class="detected-term-chip" data-slug="${t.slug}">
            <span>${t.name}</span>
            <span style="font-size: 0.72rem; opacity: 0.85; background: rgba(255,255,255,0.25); padding: 0.1rem 0.35rem; border-radius: 99px;">
              ${t.category_name}
            </span>
          </button>
        `).join('');

        // Wire term chip clicks
        detectedCloud.querySelectorAll('.detected-term-chip').forEach(btn => {
          btn.addEventListener('click', () => {
            modalBackdrop.classList.remove('active');
            navigate(`/term/${btn.dataset.slug}`);
          });
        });
      } else {
        detectedCount.textContent = 'No known legal terms detected';
        detectedCloud.innerHTML = `
          <p style="color: var(--text-muted); font-size: 0.9rem;">
            No dictionary matches were found in this snippet. Try choosing one of the sample legal documents below.
          </p>
        `;
      }
    }, 1200);
  };

  // Sample documents quick trigger
  modalBackdrop.querySelectorAll('.sample-doc-btn').forEach(btn => {
    btn.onclick = () => {
      const docId = btn.dataset.docId;
      const sample = state.sampleDocuments.find(d => d.id === docId);
      if (sample) {
        processContent(sample.content, sample.title);
      }
    };
  });

  // Dropzone click
  dropzone.onclick = () => fileInput.click();

  // File upload trigger
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        processContent(ev.target.result, file.name);
      };
      reader.readAsText(file);
    }
  };

  // Reset button
  resetBtn.onclick = () => {
    dropzone.style.display = 'block';
    resultsBox.style.display = 'none';
    scannerBox.style.display = 'none';
    fileInput.value = '';
  };

  // Close modal
  const closeModal = () => modalBackdrop.classList.remove('active');
  modalBackdrop.querySelector('.modal-close-btn').onclick = closeModal;
}

/* ==========================================================================
   GLOBAL MODALS: SHARE MODAL
   ========================================================================== */
export function openShareModal(term) {
  const modalBackdrop = document.getElementById('share-modal-backdrop');
  if (!modalBackdrop) return;

  const url = `${window.location.origin}/term/${term.slug}`;
  const shareTitle = `${term.name} - Lexi Clear Legal Dictionary`;
  const shareText = `Check out the legal definition of "${term.name}" on Lexi Clear: "${term.simple_meaning}"`;

  modalBackdrop.querySelector('#share-url-input').value = url;
  modalBackdrop.querySelector('#share-term-title').textContent = term.name;

  modalBackdrop.classList.add('active');

  const copyBtn = modalBackdrop.querySelector('#copy-share-url-btn');
  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('Copied link to clipboard!', 'success');
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy Link', 2000);
    } catch (e) {
      showToast('Link copied to clipboard!');
    }
  };

  // WhatsApp share
  modalBackdrop.querySelector('#share-whatsapp-btn').onclick = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${url}`)}`, '_blank');
  };

  // Twitter/X share
  modalBackdrop.querySelector('#share-twitter-btn').onclick = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  // Native share if supported
  const nativeBtn = modalBackdrop.querySelector('#share-native-btn');
  if (navigator.share) {
    nativeBtn.style.display = 'inline-flex';
    nativeBtn.onclick = () => {
      navigator.share({ title: shareTitle, text: shareText, url: url });
    };
  } else {
    nativeBtn.style.display = 'none';
  }

  modalBackdrop.querySelector('.modal-close-btn').onclick = () => {
    modalBackdrop.classList.remove('active');
  };
}
