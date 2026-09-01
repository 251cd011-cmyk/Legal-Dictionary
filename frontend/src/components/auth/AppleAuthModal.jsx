import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Fingerprint, Scan, AlertTriangle, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';

export function AppleAuthModal({ isOpen, onClose }) {
  const { loginWithApple, isLoading, showToast } = useApp();
  const [authStage, setAuthStage] = useState('prompt'); // 'prompt' | 'authenticating' | 'failed' | 'cancelled'
  const [errorMessage, setErrorMessage] = useState('');
  const [hideEmail, setHideEmail] = useState(true);

  if (!isOpen) return null;

  const handleAppleAuth = async (scenario = 'success') => {
    setAuthStage('authenticating');
    setErrorMessage('');

    try {
      if (scenario === 'cancel') {
        await new Promise((r) => setTimeout(r, 600));
        setAuthStage('cancelled');
        return;
      }

      if (scenario === 'fail') {
        await new Promise((r) => setTimeout(r, 700));
        setErrorMessage('Sign in with Apple could not verify your biometric credentials.');
        setAuthStage('failed');
        return;
      }

      // Success
      await loginWithApple({
        customName: 'Apple Legal Scholar',
        customEmail: hideEmail ? 'privaterelay_8372@privaterelay.appleid.com' : 'scholar.lexi@icloud.com',
      });
    } catch (err) {
      setErrorMessage(err.message || 'Apple Sign-In failed');
      setAuthStage('failed');
    }
  };

  const handleCancelClick = () => {
    setAuthStage('cancelled');
    showToast('Apple Sign-In was cancelled.', 'info');
    setTimeout(() => {
      onClose();
      setAuthStage('prompt');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-[#1C1C1E] text-white border border-neutral-800 rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden animate-slide-up">
        
        {/* Apple ID Native Header */}
        <div className="p-6 pb-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Apple Vector Logo */}
            <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center shadow-xs">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.05-7.66-7.85-11.87-14.39-7.73-12.08-13.58-25.96-17.55-41.63-3.97-15.68-5.96-29.35-5.96-41.03 0-16.14 4.09-29.47 12.28-40.01 8.19-10.53 18.59-15.89 31.21-16.08 4.58 0 9.77 1.15 15.57 3.44 5.8 2.29 9.69 3.49 11.66 3.61 2.21-.24 6.29-1.52 12.24-3.83 5.95-2.31 11.05-3.35 15.3-3.11 12.02.72 21.68 5.16 28.98 13.33-10.53 6.39-15.68 15.34-15.46 26.85.22 9.07 3.73 16.73 10.53 22.98 6.8 6.26 14.87 9.87 24.2 10.84-2.2 6.53-4.88 13.32-8.04 20.37zM119.22 33.02c0-7.39 2.68-14.28 8.04-20.67 5.36-6.39 11.96-10.3 19.8-11.73.33 1.3.49 2.5.49 3.6 0 7.39-2.73 14.5-8.2 21.32-5.46 6.82-12.16 10.66-20.13 11.53z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Sign in with Apple
              </h2>
              <p className="text-[11px] text-neutral-400">Lexi Clear Legal Dictionary</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {authStage === 'prompt' && (
            <>
              <div className="text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Fingerprint className="w-8 h-8 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    Do you want to sign in to Lexi Clear with your Apple ID?
                  </p>
                  <p className="text-xs text-neutral-400">
                    Use Face ID, Touch ID, or your device passcode.
                  </p>
                </div>
              </div>

              {/* Privacy Option */}
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300 font-medium">Hide My Email</span>
                  <input
                    type="checkbox"
                    checked={hideEmail}
                    onChange={(e) => setHideEmail(e.target.checked)}
                    className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  {hideEmail 
                    ? 'Forward to: privaterelay_8372@privaterelay.appleid.com' 
                    : 'Share my real Apple ID email address'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  id="btn-apple-authenticate-success"
                  onClick={() => handleAppleAuth('success')}
                  className="w-full py-3.5 rounded-2xl bg-white text-black hover:bg-neutral-200 active:scale-98 transition-all font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Scan className="w-4 h-4" />
                  <span>Continue with Touch / Face ID</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleAppleAuth('fail')}
                    className="py-2.5 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-medium text-neutral-400 hover:text-red-400 hover:border-red-900/50 transition-colors"
                  >
                    Simulate Failure
                  </button>

                  <button
                    onClick={handleCancelClick}
                    className="py-2.5 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-medium text-neutral-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}

          {authStage === 'authenticating' && (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <Loader2 className="w-10 h-10 text-blue-400 animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Authenticating with Apple ID...</p>
                <p className="text-xs text-neutral-400">Verifying secure token exchange</p>
              </div>
            </div>
          )}

          {authStage === 'failed' && (
            <div className="py-4 text-center space-y-4 animate-shake">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-red-400">Authentication Failed</p>
                <p className="text-xs text-neutral-400 px-2">{errorMessage}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setAuthStage('prompt')}
                  className="flex-1 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white font-medium text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {authStage === 'cancelled' && (
            <div className="py-6 text-center space-y-3 animate-fade-in">
              <p className="text-sm font-bold text-neutral-300">Sign in Cancelled</p>
              <p className="text-xs text-neutral-500">Returning to login options...</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
