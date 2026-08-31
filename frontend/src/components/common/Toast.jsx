import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast() {
  const { toastMessage, showToast } = useApp();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const bgStyles = {
    success: 'bg-[#3A2D27] text-[#F2EDE7] border-[#CCAD8E]',
    error: 'bg-red-900 text-white border-red-700',
    info: 'bg-[#3A2D27] text-[#F2EDE7] border-[#CCAD8E]'
  };

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#CCAD8E] shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-[#CCAD8E] shrink-0" />
  };

  return (
    <aside aria-label="Notifications" className="fixed top-4 right-4 z-50 max-w-sm w-full px-4 pointer-events-none animate-slide-up">
      <div className={`p-4 rounded-2xl border shadow-xl flex items-center justify-between gap-3 pointer-events-auto ${bgStyles[type] || bgStyles.info}`}>
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
          {icons[type]}
          <span>{message}</span>
        </div>
      </div>
    </aside>
  );
}
