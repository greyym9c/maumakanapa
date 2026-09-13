import React, { useEffect } from 'react';
import { FoodItem } from '../types/food';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  item: FoodItem | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  item,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !item) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
    >
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />

      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#FFE8DD] z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#183153] transition-colors"
          aria-label="Batal hapus"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 id="confirm-title" className="font-fredoka text-xl font-bold text-[#183153] mb-2">
          Hapus Kuliner Ini?
        </h3>

        <p id="confirm-desc" className="text-sm text-[#183153]/70 mb-4 leading-relaxed">
          Kamu yakin ingin menghapus{' '}
          <strong className="text-[#183153]">"{item.menuName}"</strong> di{' '}
          <strong className="text-[#183153]">{item.placeName}</strong> dari daftar penyelamatmu?
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-2xl font-bold text-sm text-[#183153] hover:bg-[#FFE8DD]/60 transition-colors min-h-[44px]"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-2 bg-[#EF4444] hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-2xl shadow-soft btn-press min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <Trash2 className="w-4 h-4" />
            <span>Ya, Hapus</span>
          </button>
        </div>
      </div>
    </div>
  );
};
