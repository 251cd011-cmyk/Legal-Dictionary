import React, { createContext, useContext, useState, useEffect } from 'react';
import { SCHEDULED_LANGUAGES, DEFAULT_LANGUAGE } from '../data/languages';
import { authService } from '../services/authService';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Check persisted state
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return authService.getLanguage() || DEFAULT_LANGUAGE;
  });

  const [user, setUser] = useState(() => {
    return authService.getUser() || null;
  });

  // Screen flow: 'language' | 'login_hub' | 'mobile_login' | 'otp_verify' | 'google_otp' | 'dashboard'
  const [currentScreen, setCurrentScreen] = useState(() => {
    if (authService.getUser()) {
      return 'dashboard';
    }
    if (authService.getLanguage()) {
      return 'login_hub';
    }
    return 'language';
  });

  // Modal overlays: 'google' | 'apple' | 'terms' | null
  const [activeModal, setActiveModal] = useState(null);

  // Mobile Auth State
  const [pendingPhone, setPendingPhone] = useState('');
  const [demoOtp, setDemoOtp] = useState('482910');
  const [otpSentTime, setOtpSentTime] = useState(null);

  // Google Email OTP State
  const [pendingGoogleAccount, setPendingGoogleAccount] = useState(null);
  const [demoEmailOtp, setDemoEmailOtp] = useState('839201');

  // Loading & Global Alerts
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Clear toast after timeout
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
  };

  /**
   * Set language and persist
   */
  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    authService.saveLanguage(language);
  };

  /**
   * Continue from Language Selection to Login Page
   */
  const proceedToLogin = () => {
    if (!selectedLanguage) {
      handleSelectLanguage(DEFAULT_LANGUAGE);
    }
    setCurrentScreen('login_hub');
  };

  /**
   * Send OTP via Mobile Auth
   */
  const handleSendOtp = async (phoneNumber) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authService.requestOtp(phoneNumber);
      setPendingPhone(phoneNumber);
      setDemoOtp(res.demoOtp);
      setOtpSentTime(Date.now());
      setCurrentScreen('otp_verify');
      showToast(`Demo Mobile OTP: ${res.demoOtp}`, 'success');
      return res;
    } catch (err) {
      setAuthError(err.message || 'Failed to send OTP. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verify entered Mobile OTP
   */
  const handleVerifyOtp = async (otpCode) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authService.verifyOtp(pendingPhone, otpCode);
      setUser(res.user);
      setCurrentScreen('dashboard');
      showToast('Mobile number verified & logged in!', 'success');
      return res;
    } catch (err) {
      setAuthError(err.message || 'Verification failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Google Account Selection -> Triggers Email OTP Verification
   */
  const handleSelectGoogleAccount = async (account) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authService.requestGoogleEmailOtp(account);
      setPendingGoogleAccount(account);
      setDemoEmailOtp(res.demoOtp);
      setActiveModal(null);
      setCurrentScreen('google_otp');
      showToast(`Email OTP sent to ${account.email} (Code: ${res.demoOtp})`, 'success');
      return res;
    } catch (err) {
      setAuthError(err.message || 'Failed to send email verification code');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verify Google Email OTP
   */
  const handleVerifyGoogleEmailOtp = async (otpCode) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authService.verifyGoogleEmailOtp(pendingGoogleAccount, otpCode);
      setUser(res.user);
      setCurrentScreen('dashboard');
      showToast(`Google Email verified! Welcome, ${res.user.name}`, 'success');
      return res;
    } catch (err) {
      setAuthError(err.message || 'Email verification failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Apple Login
   */
  const handleAppleLogin = async (options = {}) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authService.loginWithApple(options);
      setUser(res.user);
      setActiveModal(null);
      setCurrentScreen('dashboard');
      showToast(`Signed in with Apple ID!`, 'success');
    } catch (err) {
      setAuthError(err.message || 'Apple Sign-In failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update Profile
   */
  const handleUpdateProfile = (updatedData) => {
    const updated = {
      ...(user || {}),
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    setUser(updated);
    authService.saveUser(updated);
    showToast('Profile updated successfully!', 'success');
    return updated;
  };

  /**
   * Log Out
   */
  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setPendingPhone('');
    setPendingGoogleAccount(null);
    setCurrentScreen('login_hub');
    showToast('You have been logged out safely.', 'info');
  };

  /**
   * Reset everything (to test language screen from scratch)
   */
  const resetEntireFlow = () => {
    authService.logout();
    localStorage.removeItem('lexi_clear_language');
    setUser(null);
    setSelectedLanguage(DEFAULT_LANGUAGE);
    setPendingPhone('');
    setPendingGoogleAccount(null);
    setActiveModal(null);
    setCurrentScreen('language');
    showToast('Reset to first-time launch state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage: handleSelectLanguage,
        proceedToLogin,
        user,
        currentScreen,
        setCurrentScreen,
        activeModal,
        setActiveModal,
        pendingPhone,
        setPendingPhone,
        demoOtp,
        otpSentTime,
        pendingGoogleAccount,
        setPendingGoogleAccount,
        demoEmailOtp,
        isLoading,
        authError,
        setAuthError,
        toastMessage,
        showToast,
        sendOtp: handleSendOtp,
        verifyOtp: handleVerifyOtp,
        selectGoogleAccount: handleSelectGoogleAccount,
        verifyGoogleEmailOtp: handleVerifyGoogleEmailOtp,
        loginWithApple: handleAppleLogin,
        updateProfile: handleUpdateProfile,
        logout: handleLogout,
        resetEntireFlow
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
