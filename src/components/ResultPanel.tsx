import React, { useEffect } from 'react';
import { FoodItem, CATEGORY_LABELS, COUPLE_TAGS } from '../types/food';
import { formatRupiah } from '../utils/formatters';
import { RotateCcw, MapPin, ExternalLink, Edit3, Heart, Share2 } from 'lucide-react';
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
  const coupleTag = selectedItem.favoriteOf ? COUPLE_TAGS[selectedItem.favoriteOf] : null;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#3975EA', '#FFC5AD', '#FFE8DD', '#E05A47', '#183153'],
          ticks: 200,
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  }, [selectedItem.id]);

  // Share text for WhatsApp
  const shareText = encodeURIComponent(
    `Sayang, hasil acak kartu hari ini kita fix makan "${selectedItem.menuName}" di ${selectedItem.placeName}! Siap-siap yaa ❤️`
  );
  const waUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  return (
    <section
      aria-label="Hasil Pilihan Makanan Hari Ini"
      className="w-full max-w-2xl mx-auto bg-[#FFE8DD] border-2 border-[#FFC5AD] rounded-3xl p-6 sm:p-8 shadow-soft-lg transition-all animate-in fade-in zoom-in-95 duration-300 mt-8 relative overflow-hidden"
    >
      {/* Decorative Sparkle */}
      <div className="absolute -top-4 -right-4 w-20 h-20 opacity-30 pointer-events-none">
        <SparkleDoodle className="w-full h-full text-[#3975EA]" />
      </div>

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-[#FFC5AD] text-[#183153] text-xs font-bold shadow-xs">
          <Heart className="w-3.5 h-3.5 text-[#E05A47] fill-current" />
          <span className="font-handwriting text-base text-[#E05A47]">Fix makan ini hari ini!</span>
        </div>

        <div className="flex items-center gap-1.5">
          {coupleTag && (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${coupleTag.badgeColor}`}>
              <span>{coupleTag.emoji}</span>
              <span>{coupleTag.label}</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#3975EA] text-white text-xs font-bold">
            <span>{categoryInfo.emoji}</span>
            <span>{categoryInfo.label}</span>
          </span>
        </div>
      </div>

      {/* Core Details */}
      <div className="space-y-3">
        <div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#183153] tracking-tight leading-tight">
            {selectedItem.menuName}
          </h2>
          <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#3975EA] mt-1">
            <div className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center shrink-0">
              <BowlIcon className="w-4 h-4 text-[#3975EA]" />
            </div>
            <span>{selectedItem.placeName}</span>
          </div>
        </div>

        {/* Price & Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-white/80 rounded-2xl p-3 border border-[#FFC5AD]/60">
            <span className="text-[11px] font-bold text-[#183153]/60 uppercase tracking-wider block">
              Perkiraan Harga
            </span>
            <span className="text-base font-extrabold text-[#183153]">
              {selectedItem.price ? formatRupiah(selectedItem.price) : 'Belum diisi'}
            </span>
          </div>

          {selectedItem.address && (
            <div className="bg-white/80 rounded-2xl p-3 border border-[#FFC5AD]/60">
              <span className="text-[11px] font-bold text-[#183153]/60 uppercase tracking-wider block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#3975EA]" />
                Alamat / Patokan
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#183153] line-clamp-2">
                {selectedItem.address}
              </p>
            </div>
          )}
        </div>

        {selectedItem.notes && (
          <div className="bg-white/90 rounded-2xl p-3.5 border border-[#FFC5AD]/70 relative">
            <span className="font-handwriting text-base font-bold text-[#E05A47] block mb-0.5">
              Catatan Kencan Kita:
            </span>
            <p className="text-xs sm:text-sm text-[#183153] font-medium leading-relaxed">
              "{selectedItem.notes}"
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 pt-6 mt-6 border-t border-[#FFC5AD]">
        <button
          onClick={onResetRound}
          className="flex-1 min-w-[130px] flex items-center justify-center gap-2 bg-[#3975EA] hover:bg-[#2e62c7] text-white font-bold py-3 px-4 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#183153]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Acak lagi</span>
        </button>

        {/* Share to WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-bold py-3 px-4 rounded-2xl shadow-soft btn-press min-h-[48px]"
          title="Kirim ke WhatsApp Pasangan"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Kirim ke WA</span>
        </a>

        {selectedItem.mapsUrl && (
          <a
            href={selectedItem.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[130px] flex items-center justify-center gap-2 bg-white hover:bg-[#FFF9F4] text-[#183153] border border-[#FFC5AD] font-bold py-3 px-4 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
          >
            <ExternalLink className="w-4 h-4 text-[#3975EA]" />
            <span>Lihat lokasi</span>
          </a>
        )}

        <button
          onClick={() => onEditItem(selectedItem)}
          className="flex items-center justify-center gap-1.5 bg-[#FFF9F4] hover:bg-white text-[#183153] font-semibold py-3 px-3.5 rounded-2xl border border-[#FFC5AD] shadow-soft btn-press min-h-[48px]"
          title="Edit kuliner ini"
          aria-label="Edit kuliner ini"
        >
          <Edit3 className="w-4 h-4 text-[#3975EA]" />
          <span className="hidden sm:inline">Edit</span>
        </button>
      </div>
    </section>
  );
};
