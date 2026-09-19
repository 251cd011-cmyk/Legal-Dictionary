/**
 * Lexi Clear — Client-side SPA Router
 * Supports HTML5 History API with automatic route parsing and navigation.
 */

import {
  renderHomeView,
  renderSearchView,
  renderTermDetailView,
  renderCategoriesView,
  renderCategoryDetailView,
  renderBookmarksView,
  renderRecentView
} from './components.js';

export function navigate(path, updateHistory = true) {
  if (updateHistory) {
    window.history.pushState({}, '', path);
  }
  handleRoute();
}

export function handleRoute() {
  const fullPath = window.location.pathname;
  const searchStr = window.location.search;
  const urlParams = new URLSearchParams(searchStr);

  const searchObj = {};
  for (const [key, value] of urlParams.entries()) {
    searchObj[key] = value;
  }

  const appRoot = document.getElementById('app-root');
  if (!appRoot) return;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Update nav active states
  updateNavActiveState(fullPath);

  // Route matching
  if (fullPath === '/' || fullPath === '') {
    renderHomeView(appRoot);
  } else if (fullPath.startsWith('/search')) {
    renderSearchView(appRoot, searchObj);
  } else if (fullPath === '/categories' || fullPath === '/categories/') {
    renderCategoriesView(appRoot);
  } else if (fullPath.startsWith('/categories/')) {
    const slug = fullPath.replace('/categories/', '').replace(/\/$/, '');
    renderCategoryDetailView(appRoot, slug);
  } else if (fullPath.startsWith('/term/')) {
    const slug = fullPath.replace('/term/', '').replace(/\/$/, '');
    renderTermDetailView(appRoot, slug);
  } else if (fullPath.startsWith('/bookmarks')) {
    renderBookmarksView(appRoot);
  } else if (fullPath.startsWith('/recent')) {
    renderRecentView(appRoot);
  } else {
    // Fallback to home
    renderHomeView(appRoot);
  }
}

function updateNavActiveState(path) {
  // Desktop links
  document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile links
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    const route = item.dataset.route;
    if (route === path || (route !== '/' && path.startsWith(route))) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Global click interceptor for SPA navigation
export function initRouter() {
  window.addEventListener('popstate', () => {
    handleRoute();
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && link.origin === window.location.origin && !link.target && !link.hasAttribute('download')) {
      e.preventDefault();
      const targetPath = link.pathname + link.search + link.hash;
      navigate(targetPath);
    }
  });

  // Initial dispatch
  handleRoute();
}
