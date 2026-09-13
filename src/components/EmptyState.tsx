import React from 'react';
import { PlusCircle, Sparkles } from 'lucide-react';
import { BowlIcon, SparkleDoodle } from './DoodleDecorations';

interface EmptyStateProps {
  onAddFood: () => void;
  onLoadSampleData: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onAddFood,
  onLoadSampleData,
}) => {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#FFE8DD] shadow-soft-lg text-center max-w-xl mx-auto my-8 relative overflow-hidden">
      {/* Decorative Doodles */}
      <div className="absolute top-4 left-6 pointer-events-none opacity-40">
        <SparkleDoodle className="w-6 h-6 text-[#3975EA]" />
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none opacity-40">
        <SparkleDoodle className="w-6 h-6 text-[#FFC5AD]" />
      </div>

      {/* Illustration */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#E8F0FF] text-[#3975EA] flex items-center justify-center mx-auto mb-6 shadow-soft transform -rotate-3 hover:rotate-0 transition-transform">
        <BowlIcon className="w-14 h-14 sm:w-16 sm:h-16 text-[#3975EA]" />
      </div>

      {/* Texts */}
      <h3 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#183153] mb-2 leading-tight">
        Belum ada pilihan.
      </h3>
      <p className="text-sm sm:text-base text-[#183153]/70 max-w-md mx-auto mb-8 font-medium">
        Tambahkan kuliner favoritmu dulu, yuk! Masukkan menu sarapan, makan siang, atau camilan malam andalanmu.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onAddFood}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3975EA] hover:bg-[#2e62c7] text-white font-bold py-3.5 px-6 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#183153]"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Tambah kuliner</span>
        </button>

        <button
          onClick={onLoadSampleData}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFE8DD] hover:bg-[#ffdacf] text-[#183153] border border-[#FFC5AD] font-bold py-3.5 px-6 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
        >
          <Sparkles className="w-4 h-4 text-[#3975EA]" />
          <span>Coba data contoh</span>
        </button>
      </div>

      <p className="text-[11px] text-[#183153]/50 mt-6">
        * Data contoh bisa diedit atau dihapus kapan saja sesuai seleramu.
      </p>
    </div>
  );
};
