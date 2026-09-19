/**
 * Lexi Clear — Main Application Entrypoint
 */

import { state } from './state.js';
import { initRouter, navigate } from './router.js';
import { openVoiceModal, openScanModal } from './components.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize state and preload categories/popular terms
  await state.init();

  // Initialize SPA routing
  initRouter();

  // Global header search shortcut button
  const headerSearchBtn = document.getElementById('header-search-btn');
  if (headerSearchBtn) {
    headerSearchBtn.addEventListener('click', () => {
      navigate('/search');
    });
  }

  // Global header scan button
  const headerScanBtn = document.getElementById('header-scan-btn');
  if (headerScanBtn) {
    headerScanBtn.addEventListener('click', () => {
      openScanModal();
    });
  }

  // Global header help button
  const headerHelpBtn = document.getElementById('header-help-btn');
  const helpModal = document.getElementById('help-modal-backdrop');
  if (headerHelpBtn && helpModal) {
    headerHelpBtn.addEventListener('click', () => {
      helpModal.classList.add('active');
    });

    helpModal.querySelector('.modal-close-btn')?.addEventListener('click', () => {
      helpModal.classList.remove('active');
    });

    helpModal.querySelector('#close-help-btn')?.addEventListener('click', () => {
      helpModal.classList.remove('active');
    });
  }

  // Close modals on clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
      }
    });
  });

  // Mobile Bottom Navigation Bar Links
  document.querySelectorAll('.mobile-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route;
      if (route) {
        navigate(route);
      }
    });
  });

  console.log('Lexi Clear initialized successfully with', state.categories.length, 'legal categories.');
});
