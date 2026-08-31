import React, { createContext, useContext, useState, useEffect } from 'react';
import { LEGAL_TERMS, getTermBySlug } from '../data/legalData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Routing State
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || '/';
  });

  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lexi_theme') || 'light';
  });

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('lexi_bookmarks');
      return saved ? JSON.parse(saved) : ['bail', 'habeas-corpus', 'tort', 'contract'];
    } catch {
      return ['bail', 'habeas-corpus', 'tort', 'contract'];
    }
  });

  // Recently Viewed Terms
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('lexi_recent');
      return saved ? JSON.parse(saved) : ['bail', 'fir', 'indemnity', 'negligence', 'defamation'];
    } catch {
      return ['bail', 'fir', 'indemnity', 'negligence', 'defamation'];
    }
  });

  // Modals State
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareData, setShareData] = useState(null);

  // Mobile Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global Search Query state for cross-component coordination
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lexi_theme', theme);
  }, [theme]);

  // Sync bookmarks
  useEffect(() => {
    localStorage.setItem('lexi_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Sync recently viewed
  useEffect(() => {
    localStorage.setItem('lexi_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation function
  const navigate = (path) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Toast dispatch
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    addToast(theme === 'light' ? 'Switched to Dark Mode' : 'Switched to Light Mode', 'info', 2000);
  };

  // Bookmark Management
  const toggleBookmark = (slug) => {
    const term = getTermBySlug(slug);
    const termName = term ? term.term : slug;

    if (bookmarks.includes(slug)) {
      setBookmarks((prev) => prev.filter((s) => s !== slug));
      addToast(`Removed "${termName}" from Saved Terms`, 'info');
    } else {
      setBookmarks((prev) => [slug, ...prev]);
      addToast(`Saved "${termName}" to your bookmarks`, 'success');
    }
  };

  const isBookmarked = (slug) => bookmarks.includes(slug);

  const clearBookmarks = () => {
    setBookmarks([]);
    addToast('Cleared all saved terms', 'info');
  };

  // Recently Viewed Management
  const addRecentlyViewed = (slug) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      return [slug, ...filtered].slice(0, 15);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    addToast('Cleared recently viewed history', 'info');
  };

  // Modal Handlers
  const openVoiceModal = () => setIsVoiceModalOpen(true);
  const closeVoiceModal = () => setIsVoiceModalOpen(false);

  const openScanModal = () => setIsScanModalOpen(true);
  const closeScanModal = () => setIsScanModalOpen(false);

  const openShareModal = (term) => {
    setShareData(term);
    setIsShareModalOpen(true);
  };
  const closeShareModal = () => {
    setIsShareModalOpen(false);
    setShareData(null);
  };

  // Trigger search from any input
  const executeSearch = (query, category = 'all') => {
    setGlobalSearchQuery(query);
    setSelectedCategoryFilter(category);
    navigate(`/search?q=${encodeURIComponent(query)}&cat=${category}`);
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        theme,
        toggleTheme,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
        recentlyViewed,
        addRecentlyViewed,
        clearRecentlyViewed,
        isVoiceModalOpen,
        openVoiceModal,
        closeVoiceModal,
        isScanModalOpen,
        openScanModal,
        closeScanModal,
        isShareModalOpen,
        shareData,
        openShareModal,
        closeShareModal,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        globalSearchQuery,
        setGlobalSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        executeSearch,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
