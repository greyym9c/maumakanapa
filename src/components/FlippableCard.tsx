import React from 'react';
import { FoodItem, CATEGORY_LABELS, COUPLE_TAGS } from '../types/food';
import { BowlIcon, SparkleDoodle } from './DoodleDecorations';
import { formatRupiah } from '../utils/formatters';
import { MapPin, Heart } from 'lucide-react';

interface FlippableCardProps {
  item: FoodItem;
  index: number;
  isFlipped: boolean;
  isAnyFlipped: boolean;
  isShuffling: boolean;
  onSelect: (item: FoodItem) => void;
  rotationDeg?: number;
}

export const FlippableCard: React.FC<FlippableCardProps> = ({
  item,
  index,
  isFlipped,
  isAnyFlipped,
  isShuffling,
  onSelect,
  rotationDeg = 0,
}) => {
  const categoryInfo = CATEGORY_LABELS[item.category] || CATEGORY_LABELS['lainnya'];
  const coupleTag = item.favoriteOf ? COUPLE_TAGS[item.favoriteOf] : null;

  const handleClick = () => {
    if (isShuffling || isAnyFlipped) return;
    // Haptic vibration on mobile phones
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(20);
      } catch {}
    }
    onSelect(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="perspective-1000 w-full max-w-[280px] h-[295px] sm:h-[370px] select-none cursor-pointer transition-transform duration-300"
      style={{
        transform: !isFlipped && !isShuffling && rotationDeg ? `rotate(${rotationDeg}deg)` : 'none',
      }}
    >
      <div
        role="button"
        tabIndex={isAnyFlipped ? -1 : 0}
        aria-label={`Kartu nomor ${index + 1}: ${isFlipped ? item.menuName : 'Pilih kartu date ini'}`}
        aria-pressed={isFlipped}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`w-full h-full relative transform-style-3d transition-transform duration-250 ease-out rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-[#3975EA] focus-visible:ring-offset-2 ${
          isFlipped ? 'rotate-y-180' : ''
        } ${isShuffling ? 'animate-pulse scale-95' : 'hover:-translate-y-2 hover:shadow-card-hover'}`}
      >
        {/* ================= BACK OF CARD (Closed State: Blue with doodle & heart) ================= */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl card-back-pattern border-3 sm:border-4 border-white shadow-soft-lg flex flex-col items-center justify-between p-3.5 sm:p-6 text-white overflow-hidden"
        >
          {/* Top corner */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC5AD] fill-current" />
              <span className="font-handwriting text-sm sm:text-base text-[#FFE8DD]">Love Food</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-white/90 uppercase bg-white/20 px-2 py-0.5 rounded-full">
              #{index + 1}
            </span>
          </div>

          {/* Center visual: Bowl and "Pilih aku?" */}
          <div className="flex flex-col items-center text-center my-auto">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/15 backdrop-blur-sm border-2 border-[#FFC5AD]/60 flex items-center justify-center text-white mb-2 sm:mb-3 shadow-inner group-hover:scale-110 transition-transform">
              <BowlIcon className="w-8 h-8 sm:w-11 sm:h-11 text-[#FFE8DD]" />
            </div>

            <h3 className="font-display text-xl sm:text-3xl font-extrabold tracking-wide text-white drop-shadow-sm">
              Pilih aku?
            </h3>
            <p className="font-handwriting text-base sm:text-lg text-[#FFE8DD] font-semibold mt-0.5">
              Menu spesial kita 💕
            </p>
          </div>

          {/* Bottom couple watermark */}
          <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] text-white/80 font-semibold border-t border-white/20 pt-1.5 sm:pt-2">
            <span>Heru</span>
            <span className="text-[#FFC5AD]">❤️</span>
            <span>Nadine</span>
          </div>
        </div>

        {/* ================= FRONT OF CARD (Revealed State: White with tags) ================= */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-white border-3 border-[#3975EA] shadow-xl flex flex-col justify-between p-3.5 sm:p-5 text-[#183153] overflow-hidden"
        >
          {/* Header pill & Couple Badge */}
          <div className="flex items-center justify-between gap-1 flex-wrap">
            <span className="text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#E8F0FF] text-[#3975EA] flex items-center gap-1">
              <span>{categoryInfo.emoji}</span>
              <span>{categoryInfo.label}</span>
            </span>

            {coupleTag && (
              <span className={`text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full border ${coupleTag.badgeColor}`}>
                {coupleTag.emoji} {coupleTag.label}
              </span>
            )}
          </div>

          {/* Core Info */}
          <div className="my-auto py-1 sm:py-2">
            <span className="font-handwriting text-sm sm:text-base font-bold text-[#E05A47] block">
              Menu Terpilih ✨
            </span>
            <h4 className="font-display text-base sm:text-xl font-bold text-[#183153] leading-snug line-clamp-3 mb-1 sm:mb-2">
              {item.menuName}
            </h4>
            <p className="text-xs sm:text-sm font-bold text-[#3975EA] flex items-center gap-1 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{item.placeName}</span>
            </p>
          </div>

          {/* Price & Checked */}
          <div className="pt-2 sm:pt-3 border-t border-[#FFE8DD] flex items-center justify-between">
            <div>
              <span className="text-[9px] sm:text-[10px] text-[#183153]/60 font-bold block uppercase">
                Harga
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#3975EA]">
                {item.price ? formatRupiah(item.price) : 'Belum diisi'}
              </span>
            </div>

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFE8DD] text-[#E05A47] flex items-center justify-center font-bold text-xs shrink-0">
              ❤️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
