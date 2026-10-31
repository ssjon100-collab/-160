import React from 'react';
import { useSite } from '../../context/SiteContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useSite();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 animate-bounce-in max-w-sm">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#151224] border border-purple-500/40 text-purple-100 shadow-2xl purple-glow text-sm font-medium">
        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
