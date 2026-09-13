import React from 'react';
import { PlusCircle, Sparkles, Heart } from 'lucide-react';
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
      <div className="absolute top-4 left-6 pointer-events-none opacity-40">
        <SparkleDoodle className="w-6 h-6 text-[#3975EA]" />
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none opacity-40">
        <SparkleDoodle className="w-6 h-6 text-[#FFC5AD]" />
      </div>

      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#FFE8DD] text-[#E05A47] flex items-center justify-center mx-auto mb-6 shadow-soft transform -rotate-3 hover:rotate-0 transition-transform">
        <BowlIcon className="w-14 h-14 sm:w-16 sm:h-16 text-[#E05A47]" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FF] text-[#3975EA] text-xs font-bold mb-3">
        <Heart className="w-3.5 h-3.5 text-[#E05A47] fill-current" />
        <span>Buku Kuliner Heru & Nadine</span>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#183153] mb-2 leading-tight">
        Belum ada daftar makanan nih!
      </h3>
      <p className="text-sm sm:text-base text-[#183153]/75 max-w-md mx-auto mb-8 font-medium">
        Yuk tambahkan makanan favorit Heru, kesukaan Nadine, atau spot makan kencan andalan kalian!
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onAddFood}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3975EA] hover:bg-[#285ec4] text-white font-bold py-3.5 px-6 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#183153]"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Tambah kuliner baru</span>
        </button>

        <button
          onClick={onLoadSampleData}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFE8DD] hover:bg-[#ffdacf] text-[#183153] border border-[#FFC5AD] font-bold py-3.5 px-6 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
        >
          <Sparkles className="w-4 h-4 text-[#E05A47]" />
          <span>Coba data contoh kencan</span>
        </button>
      </div>

      <p className="font-handwriting text-base text-[#183153]/60 mt-6">
        * Bisa langsung diedit atau dihapus sesuai selera kalian berdua 💕
      </p>
    </div>
  );
};
