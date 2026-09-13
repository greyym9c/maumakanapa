import React from 'react';
import { ToastInfo } from '../types/food';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastInfo[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-50 flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => {
        const bg =
          toast.type === 'success'
            ? 'bg-[#183153] text-white border-[#3975EA]'
            : toast.type === 'error'
            ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FCA5A5]'
            : toast.type === 'warning'
            ? 'bg-[#FFFBEB] text-[#B45309] border-[#FCD34D]'
            : 'bg-white text-[#183153] border-brand-peach';

        const Icon =
          toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#FFC5AD] shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-[#3975EA] shrink-0" />
          );

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl border shadow-soft-lg transition-all transform duration-200 animate-in fade-in slide-in-from-bottom-3 ${bg}`}
          >
            <div className="flex items-center gap-3 pr-2">
              {Icon}
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-full hover:bg-black/10 transition-colors shrink-0 text-current min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
