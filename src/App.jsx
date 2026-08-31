import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import MobileDrawer from './components/MobileDrawer';
import VoiceSearchModal from './components/VoiceSearchModal';
import ScanModal from './components/ScanModal';
import ShareModal from './components/ShareModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import TermDetailPage from './pages/TermDetailPage';
import BookmarksPage from './pages/BookmarksPage';
import RecentPage from './pages/RecentPage';

export default function App() {
  const { currentPath } = useApp();

  // Route Dispatcher
  const renderCurrentRoute = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }

    // 2. Search
    if (currentPath.startsWith('/search')) {
      return <SearchPage />;
    }

    // 3. Category Detail: /categories/:slug
    if (currentPath.startsWith('/categories/') && currentPath.length > '/categories/'.length) {
      const slug = currentPath.replace('/categories/', '').split('?')[0].split('/')[0];
      return <CategoryDetailPage categorySlug={slug} />;
    }

    // 4. Categories Overview: /categories
    if (currentPath === '/categories') {
      return <CategoriesPage />;
    }

    // 5. Term Detail: /term/:slug
    if (currentPath.startsWith('/term/')) {
      const slug = currentPath.replace('/term/', '').split('?')[0].split('/')[0];
      return <TermDetailPage termSlug={slug} />;
    }

    // 6. Bookmarks / Saved: /bookmarks or /saved
    if (currentPath === '/bookmarks' || currentPath === '/saved') {
      return <BookmarksPage />;
    }

    // 7. Recently Viewed: /recent
    if (currentPath === '/recent') {
      return <RecentPage />;
    }

    // Fallback: 404
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The legal page or category you are looking for does not exist.
        </p>
        <a href="/" className="btn btn-primary">
          Return to Lexi Clear Home
        </a>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="main-content">
        {renderCurrentRoute()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav />

      {/* Mobile Slide-Over Menu */}
      <MobileDrawer />

      {/* Interactive Global Modals */}
      <VoiceSearchModal />
      <ScanModal />
      <ShareModal />

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
}
