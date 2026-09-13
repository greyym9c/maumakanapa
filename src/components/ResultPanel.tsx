import React, { useEffect } from 'react';
import { FoodItem, CATEGORY_LABELS, COUPLE_TAGS, MEAL_TIME_LABELS } from '../types/food';
import { formatRupiah } from '../utils/formatters';
import { RotateCcw, MapPin, ExternalLink, Edit3, Heart, Share2, ArrowLeft, Star, Clock } from 'lucide-react';
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
  const timeInfo = selectedItem.bestTime ? MEAL_TIME_LABELS[selectedItem.bestTime] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
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
    `Sayang, hasil acak Love Food di Kudus hari ini kita fix ke "${selectedItem.placeName}" makan "${selectedItem.menuName}"! Siap-siap yaa ❤️`
  );
  const waUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  return (
    <div
      aria-label="Halaman Hasil Pilihan Menu Kencan Kudus"
      className="w-full max-w-xl mx-auto px-4 py-4 sm:py-6 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Back to Deck Button */}
      <div className="mb-4">
        <button
          onClick={onResetRound}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#183153] hover:text-[#3975EA] bg-white hover:bg-[#FFE8DD]/50 px-4 py-2 rounded-full border border-[#FFE8DD] shadow-xs transition-all min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dek Kartu</span>
        </button>
      </div>

      {/* Hero Result Card */}
      <div className="bg-[#FFE8DD] border-3 border-[#FFC5AD] rounded-3xl p-5 sm:p-7 shadow-soft-lg relative overflow-hidden">
        <div className="absolute -top-3 -right-3 w-16 h-16 opacity-30 pointer-events-none">
          <SparkleDoodle className="w-full h-full text-[#3975EA]" />
        </div>

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#FFC5AD] text-[#183153] text-xs font-bold shadow-xs">
            <Heart className="w-3.5 h-3.5 text-[#E05A47] fill-current" />
            <span className="font-handwriting text-base text-[#E05A47]">Rekomendasi Kuliner Kudus!</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Rating Bintang */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
              <Star className="w-3.5 h-3.5 fill-current text-[#F59E0B]" />
              <span>{selectedItem.rating ? selectedItem.rating.toFixed(1) : '4.6'}</span>
            </span>

            {coupleTag && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${coupleTag.badgeColor}`}>
                <span>{coupleTag.emoji}</span>
                <span>{coupleTag.label}</span>
              </span>
            )}
          </div>
        </div>

        {/* Menu & Place info */}
        <div className="space-y-2.5 mb-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#183153] tracking-tight leading-snug">
              {selectedItem.menuName}
            </h2>
            <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#3975EA] mt-1">
              <div className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center shrink-0">
                <BowlIcon className="w-4 h-4 text-[#3975EA]" />
              </div>
              <span className="break-words">{selectedItem.placeName}</span>
            </div>
          </div>

          {/* Time & Opening hours Recommendation Pill */}
          <div className="bg-[#FFF9F4] rounded-2xl p-3 border border-[#FFC5AD]/70 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FFE8DD] text-[#E05A47] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#183153]/60 block">
                  Waktu Paling Pas
                </span>
                <p className="text-xs sm:text-sm font-extrabold text-[#183153]">
                  {timeInfo ? `${timeInfo.emoji} ${timeInfo.label}` : 'Kapan saja'}
                </p>
              </div>
            </div>

            {selectedItem.openingHours && (
              <span className="text-xs font-bold text-[#3975EA] bg-[#E8F0FF] px-2.5 py-1 rounded-xl">
                Buka: {selectedItem.openingHours}
              </span>
            )}
          </div>

          {/* Price & Address */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="bg-white/85 rounded-2xl p-3 border border-[#FFC5AD]/60">
              <span className="text-[10px] font-bold text-[#183153]/60 uppercase tracking-wider block">
                Perkiraan Harga
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#183153]">
                {selectedItem.price ? formatRupiah(selectedItem.price) : 'Belum diisi'}
              </span>
            </div>

            <div className="bg-white/85 rounded-2xl p-3 border border-[#FFC5AD]/60">
              <span className="text-[10px] font-bold text-[#183153]/60 uppercase tracking-wider block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#3975EA]" />
                Lokasi di Kudus
              </span>
              <p className="text-xs font-semibold text-[#183153] line-clamp-2">
                {selectedItem.address || 'Kudus, Jawa Tengah'}
              </p>
            </div>
          </div>

          {selectedItem.notes && (
            <div className="bg-white/95 rounded-2xl p-3 border border-[#FFC5AD]/70">
              <span className="font-handwriting text-sm font-bold text-[#E05A47] block mb-0.5">
                Catatan Kencan Kudus:
              </span>
              <p className="text-xs sm:text-sm text-[#183153] font-medium leading-relaxed">
                "{selectedItem.notes}"
              </p>
            </div>
          )}
        </div>

        {/* Primary Action: Share to WhatsApp */}
        <div className="space-y-2 pt-2 border-t border-[#FFC5AD]">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-bold py-3.5 px-4 rounded-2xl shadow-soft btn-press min-h-[48px] text-sm sm:text-base"
          >
            <Share2 className="w-5 h-5" />
            <span>Kirim Kabar ke WA Pasangan</span>
          </a>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onResetRound}
              className="flex items-center justify-center gap-2 bg-[#3975EA] hover:bg-[#285ec4] text-white font-bold py-3 px-3 rounded-2xl shadow-soft btn-press min-h-[46px] text-xs sm:text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Acak Lagi 🎲</span>
            </button>

            {selectedItem.mapsUrl ? (
              <a
                href={selectedItem.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-[#FFF9F4] text-[#183153] border border-[#FFC5AD] font-bold py-3 px-3 rounded-2xl shadow-soft btn-press min-h-[46px] text-xs sm:text-sm"
              >
                <ExternalLink className="w-4 h-4 text-[#3975EA]" />
                <span>Buka Google Maps</span>
              </a>
            ) : (
              <button
                onClick={() => onEditItem(selectedItem)}
                className="flex items-center justify-center gap-2 bg-white hover:bg-[#FFF9F4] text-[#183153] border border-[#FFC5AD] font-bold py-3 px-3 rounded-2xl shadow-soft btn-press min-h-[46px] text-xs sm:text-sm"
              >
                <Edit3 className="w-4 h-4 text-[#3975EA]" />
                <span>Edit Info</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
