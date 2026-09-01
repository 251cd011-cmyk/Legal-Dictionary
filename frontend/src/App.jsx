import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageSelector } from './components/language/LanguageSelector';
import { LoginHub } from './components/auth/LoginHub';
import { MobileLogin } from './components/auth/MobileLogin';
import { OtpVerification } from './components/auth/OtpVerification';
import { GoogleEmailOtpVerification } from './components/auth/GoogleEmailOtpVerification';
import { GoogleAuthModal } from './components/auth/GoogleAuthModal';
import { AppleAuthModal } from './components/auth/AppleAuthModal';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProfilePage } from './components/profile/ProfilePage';
import { Toast } from './components/common/Toast';

function AppContent() {
  const { currentScreen, activeModal, setActiveModal } = useApp();

  return (
    <div className="min-h-screen bg-[#F2EDE7] text-[#3A2D27] flex flex-col font-sans">
      
      {/* Dynamic Screen Routing */}
      {currentScreen === 'language' && <LanguageSelector />}
      {currentScreen === 'login_hub' && <LoginHub />}
      {currentScreen === 'mobile_login' && <MobileLogin />}
      {currentScreen === 'otp_verify' && <OtpVerification />}
      {currentScreen === 'google_otp' && <GoogleEmailOtpVerification />}
      {currentScreen === 'dashboard' && <Dashboard />}
      {currentScreen === 'profile' && <ProfilePage />}

      {/* Global Authentication Modals */}
      <GoogleAuthModal
        isOpen={activeModal === 'google'}
        onClose={() => setActiveModal(null)}
      />

      <AppleAuthModal
        isOpen={activeModal === 'apple'}
        onClose={() => setActiveModal(null)}
      />

      {/* Global Toast Notifications */}
      <Toast />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
