import React, { useEffect } from 'react';
import { FoodItem, CATEGORY_LABELS } from '../types/food';
import { formatRupiah } from '../utils/formatters';
import { RotateCcw, MapPin, ExternalLink, Edit3, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BowlIcon, SparkleDoodle } from './DoodleDecorations';

interface ResultPanelProps {
  selectedItem: FoodItem;
  onResetRound: () => void;
  onEditItem: (item: FoodItem) => void;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  selectedItem,
  onResetRound,
  onEditItem,
}) => {
  const categoryInfo = CATEGORY_LABELS[selectedItem.category] || CATEGORY_LABELS['lainnya'];

  useEffect(() => {
    // Respect prefers-reduced-motion for confetti
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#3975EA', '#FFC5AD', '#FFE8DD', '#FFF9F4', '#183153'],
          ticks: 200,
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  }, [selectedItem.id]);

  return (
    <section
      aria-label="Hasil Pilihan Makanan Hari Ini"
      className="w-full max-w-2xl mx-auto bg-[#FFE8DD] border-2 border-[#FFC5AD] rounded-3xl p-6 sm:p-8 shadow-soft-lg transition-all animate-in fade-in zoom-in-95 duration-300 mt-8 relative overflow-hidden"
    >
      {/* Decorative SVG Sparkles */}
      <div className="absolute -top-4 -right-4 w-20 h-20 opacity-30 pointer-events-none">
        <SparkleDoodle className="w-full h-full text-[#3975EA]" />
      </div>

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#FFC5AD] text-[#183153] text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#3975EA]" />
          <span>Pilihanmu hari ini!</span>
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#3975EA] text-white text-xs font-bold">
          <span>{categoryInfo.emoji}</span>
          <span>{categoryInfo.label}</span>
        </span>
      </div>

      {/* Core Details */}
      <div className="space-y-3">
        <div>
          <h2 className="font-fredoka text-2xl sm:text-4xl font-bold text-[#183153] tracking-tight leading-tight">
            {selectedItem.menuName}
          </h2>
          <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#3975EA] mt-1">
            <div className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center shrink-0">
              <BowlIcon className="w-4 h-4 text-[#3975EA]" />
            </div>
            <span>{selectedItem.placeName}</span>
          </div>
        </div>

        {/* Price & Address & Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-white/70 rounded-2xl p-3 border border-[#FFC5AD]/60">
            <span className="text-[11px] font-bold text-[#183153]/60 uppercase tracking-wider block">
              Perkiraan Harga
            </span>
            <span className="text-base font-extrabold text-[#183153]">
              {selectedItem.price ? formatRupiah(selectedItem.price) : 'Belum diisi'}
            </span>
          </div>

          {selectedItem.address && (
            <div className="bg-white/70 rounded-2xl p-3 border border-[#FFC5AD]/60">
              <span className="text-[11px] font-bold text-[#183153]/60 uppercase tracking-wider block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#3975EA]" />
                Alamat / Lokasi
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#183153] line-clamp-2">
                {selectedItem.address}
              </p>
            </div>
          )}
        </div>

        {selectedItem.notes && (
          <div className="bg-white/90 rounded-2xl p-3.5 border border-[#FFC5AD]/70">
            <span className="text-[11px] font-bold text-[#3975EA] uppercase tracking-wider block mb-1">
              Catatan Pribadi:
            </span>
            <p className="text-xs sm:text-sm text-[#183153] italic leading-relaxed">
              "{selectedItem.notes}"
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-[#FFC5AD]">
        <button
          onClick={onResetRound}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-[#3975EA] hover:bg-[#2e62c7] text-white font-bold py-3 px-5 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#183153]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Acak lagi</span>
        </button>

        {selectedItem.mapsUrl && (
          <a
            href={selectedItem.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-white hover:bg-[#FFF9F4] text-[#183153] border border-[#FFC5AD] font-bold py-3 px-5 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
          >
            <ExternalLink className="w-4 h-4 text-[#3975EA]" />
            <span>Lihat lokasi</span>
          </a>
        )}

        <button
          onClick={() => onEditItem(selectedItem)}
          className="flex items-center justify-center gap-2 bg-[#FFF9F4] hover:bg-white text-[#183153] font-semibold py-3 px-4 rounded-2xl border border-[#FFC5AD] shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
          title="Edit kuliner ini"
          aria-label="Edit kuliner ini"
        >
          <Edit3 className="w-4 h-4 text-[#3975EA]" />
          <span className="hidden sm:inline">Edit pilihan</span>
        </button>
      </div>
    </section>
  );
};
