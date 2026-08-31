import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { authService } from '../../services/authService';
import { 
  User, 
  Phone, 
  Mail, 
  Briefcase, 
  Globe, 
  ShieldCheck, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Sparkles, 
  Upload, 
  Image as ImageIcon 
} from 'lucide-react';

// Preset professional avatars
const PRESET_AVATARS = [
  {
    id: 'avatar-1',
    label: 'Senior Advocate',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'avatar-2',
    label: 'Corporate Counsel',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'avatar-3',
    label: 'Law Scholar',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'avatar-4',
    label: 'Legal Associate',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  }
];

export function ProfilePage() {
  const { 
    user, 
    selectedLanguage, 
    updateProfile, 
    setCurrentScreen, 
    logout 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const fileInputRef = useRef(null);

  // Form edit state
  const [formData, setFormData] = useState({
    name: user?.name || 'Advocate User',
    phone: user?.phone ? user.phone.replace(/\D/g, '').slice(-10) : '9876543210',
    email: user?.email || '',
    role: user?.role || 'Legal Advocate & Scholar',
    avatar: user?.avatar || ''
  });

  const [validationError, setValidationError] = useState('');
  const [successBanner, setSuccessBanner] = useState(false);

  // Clean raw digits for mobile
  const cleanPhoneDigits = formData.phone.replace(/\D/g, '').slice(0, 10);
  const formattedPhoneDisplay = authService.formatPhoneNumber(cleanPhoneDigits);

  const handleInputChange = (field, value) => {
    setValidationError('');
    setSuccessBanner(false);
    if (field === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Handle local image file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setValidationError('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
        setShowPhotoModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url) => {
    setFormData((prev) => ({ ...prev, avatar: url }));
    setShowPhotoModal(false);
  };

  // Submit and save profile changes
  const handleSave = (e) => {
    e.preventDefault();

    // Validate Name
    if (!formData.name.trim()) {
      setValidationError('Full Name cannot be empty');
      return;
    }

    // Validate Phone Number if provided
    if (cleanPhoneDigits && cleanPhoneDigits.length !== 10) {
      setValidationError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (cleanPhoneDigits && !/^[6-9]/.test(cleanPhoneDigits)) {
      setValidationError('Mobile number must start with 6, 7, 8, or 9');
      return;
    }

    // Update profile in state & localStorage
    updateProfile({
      name: formData.name.trim(),
      phone: cleanPhoneDigits ? `+91 ${cleanPhoneDigits}` : user?.phone,
      email: formData.email.trim(),
      role: formData.role.trim() || 'Verified Member',
      avatar: formData.avatar
    });

    setIsEditing(false);
    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 5000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || 'Advocate User',
      phone: user?.phone ? user.phone.replace(/\D/g, '').slice(-10) : '9876543210',
      email: user?.email || '',
      role: user?.role || 'Legal Advocate & Scholar',
      avatar: user?.avatar || ''
    });
    setValidationError('');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F2EDE7] text-[#3A2D27] flex flex-col justify-between selection:bg-[#CCAD8E] selection:text-[#3A2D27]">
      
      {/* Header with back button */}
      <Header
        showBack={true}
        onBack={() => setCurrentScreen('dashboard')}
        step="Account & Profile Settings"
      />

      {/* Main Profile Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* Success Alert Banner */}
        {successBanner && (
          <div className="mb-6 p-4 rounded-2xl bg-[#3A2D27] text-[#F2EDE7] border border-[#CCAD8E] flex items-center justify-between gap-3 shadow-lg animate-slide-up">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-[#CCAD8E] shrink-0" />
              <span>Your profile changes have been saved successfully!</span>
            </div>
            <button
              onClick={() => setSuccessBanner(false)}
              className="p-1 rounded-lg text-[#D2C8BE] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#D2C8BE] shadow-xl overflow-hidden animate-fade-in relative">
          
          {/* Top Decorative Banner */}
          <div className="h-28 sm:h-32 bg-[#3A2D27] relative overflow-hidden flex items-center justify-between px-6 border-b border-[#CCAD8E]/30">
            <div className="space-y-0.5 z-10">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#CCAD8E] text-[#3A2D27] text-[10px] font-bold uppercase tracking-wider">
                Lexi Clear Member
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#F2EDE7]">
                User Profile & Preferences
              </h2>
            </div>
            <div className="w-32 h-32 bg-[#CCAD8E]/10 rounded-full blur-2xl absolute -right-6 -bottom-6 pointer-events-none" />
          </div>

          {/* Profile Header: Avatar & Name */}
          <div className="px-6 sm:px-8 pb-6 pt-0 relative">
            
            {/* Avatar with Camera / Change Photo Button */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-6">
              
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-[#3A2D27] flex items-center justify-center">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-extrabold text-[#CCAD8E] font-serif">
                      {formData.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>

                {/* Change Photo Overlay Button */}
                <button
                  type="button"
                  id="btn-change-photo"
                  onClick={() => setShowPhotoModal(true)}
                  className="absolute bottom-0 right-0 p-2.5 rounded-full bg-[#3A2D27] text-[#CCAD8E] hover:bg-[#A48374] hover:text-white border-2 border-white shadow-md transition-all cursor-pointer group-hover:scale-105"
                  title="Change Profile Photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons on top right */}
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <button
                    id="btn-edit-profile"
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2.5 rounded-xl bg-[#3A2D27] text-[#CCAD8E] hover:bg-[#A48374] hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2.5 rounded-xl bg-white border border-[#D2C8BE] text-[#3A2D27] hover:bg-[#F2EDE7] font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      id="btn-save-profile"
                      onClick={handleSave}
                      className="px-5 py-2.5 rounded-xl bg-[#3A2D27] text-[#CCAD8E] hover:bg-[#A48374] hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Validation Error Message */}
            {validationError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600 flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Profile Fields Section */}
            {!isEditing ? (
              /* VIEW MODE */
              <div className="space-y-4">
                
                {/* Name & Role Header */}
                <div className="pb-4 border-b border-[#D2C8BE]/60">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#3A2D27] tracking-tight">
                    {user?.name || formData.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs sm:text-sm font-semibold text-[#A48374] flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {user?.role || formData.role}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CCAD8E]" />
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  
                  {/* Mobile Number Card */}
                  <div className="p-4 rounded-2xl bg-[#F2EDE7]/60 border border-[#D2C8BE] space-y-1">
                    <span className="text-[11px] font-bold text-[#A48374] uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      Mobile Number
                    </span>
                    <p className="text-sm sm:text-base font-bold text-[#3A2D27] font-mono">
                      {user?.phone || (cleanPhoneDigits ? `+91 ${formattedPhoneDisplay}` : '+91 Not Linked')}
                    </p>
                  </div>

                  {/* Email Address Card */}
                  <div className="p-4 rounded-2xl bg-[#F2EDE7]/60 border border-[#D2C8BE] space-y-1">
                    <span className="text-[11px] font-bold text-[#A48374] uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      Email Address
                    </span>
                    <p className="text-sm sm:text-base font-bold text-[#3A2D27] truncate font-mono">
                      {user?.email || 'scholar.lexi@lexiclear.in'}
                    </p>
                  </div>

                  {/* Preferred Language Card */}
                  <div className="p-4 rounded-2xl bg-[#F2EDE7]/60 border border-[#D2C8BE] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#A48374] uppercase tracking-wider flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        Dictionary Language
                      </span>
                      <button
                        onClick={() => setCurrentScreen('language')}
                        className="text-[11px] text-[#3A2D27] font-bold underline hover:text-[#CCAD8E]"
                      >
                        Change
                      </button>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#3A2D27]">
                      {selectedLanguage?.name || 'English'} ({selectedLanguage?.nativeName || 'English'})
                    </p>
                  </div>

                  {/* Auth Provider Card */}
                  <div className="p-4 rounded-2xl bg-[#F2EDE7]/60 border border-[#D2C8BE] space-y-1">
                    <span className="text-[11px] font-bold text-[#A48374] uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Auth Provider
                    </span>
                    <p className="text-sm sm:text-base font-bold text-[#3A2D27] capitalize">
                      {user?.provider ? `${user.provider} Authentication` : 'Secure Member Session'}
                    </p>
                  </div>

                </div>

                {/* Quick Photo Change Trigger */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowPhotoModal(true)}
                    className="w-full py-3 rounded-2xl border border-dashed border-[#D2C8BE] hover:border-[#3A2D27] bg-[#F2EDE7]/30 hover:bg-[#F2EDE7] text-xs font-bold text-[#3A2D27] flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-[#A48374]" />
                    <span>Change Profile Photo / Choose Legal Avatar</span>
                  </button>
                </div>

              </div>
            ) : (
              /* EDIT MODE FORM */
              <form onSubmit={handleSave} noValidate className="space-y-4 pt-2 animate-fade-in">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#3A2D27] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A48374] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter full name"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#D2C8BE] text-sm font-semibold text-[#3A2D27] focus:outline-none focus:border-[#3A2D27] focus:ring-2 focus:ring-[#CCAD8E]/30"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-[#3A2D27] uppercase tracking-wider mb-1.5">
                    10-Digit Mobile Number
                  </label>
                  <div className="relative flex items-center rounded-2xl bg-white border border-[#D2C8BE] focus-within:border-[#3A2D27] focus-within:ring-2 focus-within:ring-[#CCAD8E]/30">
                    <div className="flex items-center gap-1 px-3 py-3 border-r border-[#D2C8BE] bg-[#F2EDE7]/60 rounded-l-2xl shrink-0 text-xs font-bold text-[#3A2D27]">
                      <span>🇮🇳 +91</span>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={formattedPhoneDisplay}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={11}
                      className="w-full px-3.5 py-3 text-sm font-semibold text-[#3A2D27] placeholder-[#A48374]/60 bg-transparent focus:outline-none"
                    />
                    <div className="pr-3 text-[11px] font-semibold text-[#A48374]">
                      {cleanPhoneDigits.length}/10
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-[#3A2D27] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A48374] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="e.g. advocate@lexiclear.in"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#D2C8BE] text-sm font-semibold text-[#3A2D27] focus:outline-none focus:border-[#3A2D27] focus:ring-2 focus:ring-[#CCAD8E]/30"
                    />
                  </div>
                </div>

                {/* Role / Designation */}
                <div>
                  <label className="block text-xs font-bold text-[#3A2D27] uppercase tracking-wider mb-1.5">
                    Legal Role / Designation
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-[#A48374] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      placeholder="e.g. Senior Legal Advocate, Law Student, Scholar"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#D2C8BE] text-sm font-semibold text-[#3A2D27] focus:outline-none focus:border-[#3A2D27] focus:ring-2 focus:ring-[#CCAD8E]/30"
                    />
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-2xl bg-[#3A2D27] text-[#CCAD8E] hover:bg-[#A48374] hover:text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3.5 rounded-2xl bg-[#F2EDE7] border border-[#D2C8BE] text-[#3A2D27] hover:bg-white font-semibold text-sm transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            )}

            {/* Logout Action at bottom */}
            <div className="mt-8 pt-6 border-t border-[#D2C8BE]/60 flex items-center justify-between">
              <span className="text-xs text-[#A48374]">
                Lexi Clear Account Security
              </span>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold text-red-700 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Session</span>
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Photo Picker Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#D2C8BE] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-slide-up">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#D2C8BE]/60">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#3A2D27]" />
                <h3 className="text-base font-bold font-serif text-[#3A2D27]">
                  Change Profile Photo
                </h3>
              </div>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Option A: Upload from Device */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-4 rounded-2xl border-2 border-dashed border-[#CCAD8E] bg-[#CCAD8E]/10 hover:bg-[#CCAD8E]/20 text-[#3A2D27] flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#3A2D27]" />
                <span>Upload from Device (PNG, JPG)</span>
              </button>
            </div>

            {/* Option B: Choose from Legal Presets */}
            <div>
              <label className="block text-xs font-bold text-[#3A2D27] uppercase tracking-wider mb-2">
                Or Select Professional Legal Avatar
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {PRESET_AVATARS.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => handleSelectPreset(avatar.url)}
                    className="flex flex-col items-center gap-1.5 p-1.5 rounded-2xl border border-[#D2C8BE] hover:border-[#3A2D27] hover:scale-105 transition-all cursor-pointer group"
                  >
                    <img
                      src={avatar.url}
                      alt={avatar.label}
                      className="w-14 h-14 rounded-full object-cover shadow-xs"
                    />
                    <span className="text-[10px] text-[#A48374] font-medium text-center truncate w-full">
                      {avatar.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Option C: Direct Image URL */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-[#A48374] mb-1">
                Paste Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatar}
                  onChange={(e) => setFormData((prev) => ({ ...prev, avatar: e.target.value }))}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#D2C8BE] focus:outline-none focus:border-[#3A2D27]"
                />
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(false)}
                  className="px-3 py-2 rounded-xl bg-[#3A2D27] text-[#CCAD8E] text-xs font-bold"
                >
                  Apply
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-[#A48374]/80">
        Lexi Clear © {new Date().getFullYear()} • Secure Multilingual Legal Dictionary Account
      </footer>

    </div>
  );
}
