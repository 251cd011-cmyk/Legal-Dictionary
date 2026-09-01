/**
 * Lexi Clear Authentication & API Service
 * 
 * Modular architecture ready for real backend OTP APIs, Google OAuth2,
 * Email OTP verification, and Apple Sign-In authentication services.
 */

// Simulated storage keys
const STORAGE_KEYS = {
  USER: 'lexi_clear_user',
  LANGUAGE: 'lexi_clear_language',
  PHONE_SESSION: 'lexi_clear_phone_session',
  EMAIL_SESSION: 'lexi_clear_email_session'
};

// Available mock Google Accounts for realistic browser simulation
export const MOCK_GOOGLE_ACCOUNTS = [
  {
    id: "g-1",
    name: "Adv. Priya Sharma",
    email: "priya.sharma.law@gmail.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    profession: "Senior Legal Advocate"
  },
  {
    id: "g-2",
    name: "Rahul Verma",
    email: "rahul.verma.legal@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    profession: "Corporate Counsel"
  },
  {
    id: "g-3",
    name: "Dr. Ananya Iyer",
    email: "ananya.iyer@gmail.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    profession: "Constitutional Law Scholar"
  }
];

export const authService = {
  /**
   * Validate Indian Mobile Number
   * Exactly 10 digits, starts with 6, 7, 8, or 9.
   */
  validateMobileNumber(phone) {
    const cleanDigits = (phone || '').replace(/\D/g, '');
    if (!cleanDigits) {
      return { isValid: false, error: 'Mobile number is required' };
    }
    if (cleanDigits.length !== 10) {
      return { isValid: false, error: `Mobile number must be exactly 10 digits (${cleanDigits.length}/10)` };
    }
    if (!/^[6-9]/.test(cleanDigits)) {
      return { isValid: false, error: 'Indian mobile numbers must start with 6, 7, 8, or 9' };
    }
    return { isValid: true, error: null, cleanNumber: cleanDigits };
  },

  /**
   * Format 10 digit number into Indian readable format: 98765 43210
   */
  formatPhoneNumber(digits) {
    const clean = (digits || '').replace(/\D/g, '').slice(0, 10);
    if (clean.length <= 5) return clean;
    return `${clean.slice(0, 5)} ${clean.slice(5)}`;
  },

  /**
   * Request OTP for Mobile Login
   * Replace this function body with fetch('/api/auth/send-otp') in production
   */
  async requestOtp(phoneNumber) {
    await new Promise(r => setTimeout(r, 600));

    const validation = this.validateMobileNumber(phoneNumber);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const demoOtp = '482910';
    const expiresAt = Date.now() + 45 * 1000;

    const sessionData = {
      phone: validation.cleanNumber,
      otp: demoOtp,
      expiresAt,
      createdAt: Date.now()
    };

    localStorage.setItem(STORAGE_KEYS.PHONE_SESSION, JSON.stringify(sessionData));

    return {
      success: true,
      message: `OTP sent successfully to +91 ${this.formatPhoneNumber(validation.cleanNumber)}`,
      expiresInSeconds: 45,
      demoOtp
    };
  },

  /**
   * Verify Mobile OTP
   */
  async verifyOtp(phoneNumber, enteredOtp) {
    await new Promise(r => setTimeout(r, 800));

    const cleanOtp = (enteredOtp || '').replace(/\D/g, '');
    if (cleanOtp.length !== 6) {
      throw new Error('Please enter the full 6-digit OTP code');
    }

    const sessionRaw = localStorage.getItem(STORAGE_KEYS.PHONE_SESSION);
    let session = sessionRaw ? JSON.parse(sessionRaw) : null;

    if (session && Date.now() > session.expiresAt) {
      throw new Error('The OTP code has expired. Please click "Resend OTP" to get a new code.');
    }

    const validCodes = [session?.otp, '482910', '123456'].filter(Boolean);

    if (!validCodes.includes(cleanOtp)) {
      throw new Error('Invalid OTP code. Please check and try again.');
    }

    const cleanPhone = (phoneNumber || session?.phone || '9876543210').replace(/\D/g, '');
    const user = {
      id: `user_mob_${Date.now()}`,
      name: `User +91 ${cleanPhone.slice(0, 4)}...`,
      phone: `+91 ${cleanPhone}`,
      provider: 'mobile',
      avatar: null,
      authTime: new Date().toISOString(),
      role: 'Member'
    };

    this.saveUser(user);
    localStorage.removeItem(STORAGE_KEYS.PHONE_SESSION);

    return {
      success: true,
      user,
      token: `jwt_lexi_${Date.now()}`
    };
  },

  /**
   * Request Email OTP for chosen Google Account
   */
  async requestGoogleEmailOtp(account) {
    await new Promise(r => setTimeout(r, 600));

    if (!account || !account.email) {
      throw new Error('Google email address is required');
    }

    const demoEmailOtp = '839201';
    const expiresAt = Date.now() + 45 * 1000;

    const sessionData = {
      account,
      email: account.email,
      otp: demoEmailOtp,
      expiresAt,
      createdAt: Date.now()
    };

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.EMAIL_SESSION, JSON.stringify(sessionData));
    }

    return {
      success: true,
      message: `Verification code sent to ${account.email}`,
      expiresInSeconds: 45,
      demoOtp: demoEmailOtp
    };
  },

  /**
   * Verify Google Email OTP
   */
  async verifyGoogleEmailOtp(account, enteredOtp) {
    await new Promise(r => setTimeout(r, 800));

    const cleanOtp = (enteredOtp || '').replace(/\D/g, '');
    if (cleanOtp.length !== 6) {
      throw new Error('Please enter the full 6-digit email verification code');
    }

    let session = null;
    if (typeof localStorage !== 'undefined') {
      const sessionRaw = localStorage.getItem(STORAGE_KEYS.EMAIL_SESSION);
      session = sessionRaw ? JSON.parse(sessionRaw) : null;
    }

    if (session && Date.now() > session.expiresAt) {
      throw new Error('The email verification code has expired. Please click "Resend Code".');
    }

    const validCodes = [session?.otp, '839201', '482910', '123456'].filter(Boolean);

    if (!validCodes.includes(cleanOtp)) {
      throw new Error('Invalid email verification code. Please check and try again.');
    }

    const acc = account || session?.account || { name: 'Google User', email: 'user@gmail.com' };
    const user = {
      id: acc.id || `user_g_${Date.now()}`,
      name: acc.name || 'Google User',
      email: acc.email || 'user@gmail.com',
      avatar: acc.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(acc.name || 'G')}&background=3A2D27&color=F2EDE7`,
      provider: 'google',
      authTime: new Date().toISOString(),
      role: 'Verified Google Legal Member',
      emailVerified: true
    };

    this.saveUser(user);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.EMAIL_SESSION);
    }

    return {
      success: true,
      user,
      token: `g_token_${Date.now()}`
    };
  },

  /**
   * Authenticate with Apple
   */
  async loginWithApple(options = {}) {
    await new Promise(r => setTimeout(r, 800));

    if (options.simulateError) {
      throw new Error('Apple Sign-In authorization failed. Please try again.');
    }

    if (options.simulateCancel) {
      throw new Error('Sign-In with Apple was cancelled.');
    }

    const user = {
      id: `user_apple_${Date.now()}`,
      name: options.customName || 'Apple User',
      email: options.customEmail || 'apple.user@privaterelay.appleid.com',
      avatar: null,
      provider: 'apple',
      authTime: new Date().toISOString(),
      role: 'Apple Verified Member'
    };

    this.saveUser(user);
    return { success: true, user, token: `apple_token_${Date.now()}` };
  },

  /**
   * User persistence
   */
  saveUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn('Storage failed', e);
    }
  },

  getUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.PHONE_SESSION);
    localStorage.removeItem(STORAGE_KEYS.EMAIL_SESSION);
  },

  /**
   * Language persistence
   */
  saveLanguage(language) {
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, JSON.stringify(language));
    } catch (e) {
      console.warn('Language save error', e);
    }
  },

  getLanguage() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }
};
