import React from 'react';
import { FoodItem, CATEGORY_LABELS } from '../types/food';
import { BowlIcon, SparkleDoodle, StarDoodle } from './DoodleDecorations';
import { formatRupiah } from '../utils/formatters';
import { MapPin } from 'lucide-react';

interface FlippableCardProps {
  item: FoodItem;
  index: number;
  isFlipped: boolean;
  isAnyFlipped: boolean;
  isShuffling: boolean;
  onSelect: (item: FoodItem) => void;
  rotationDeg?: number; // For desktop fan effect
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

  const handleClick = () => {
    if (isShuffling || isAnyFlipped) return;
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
      className="perspective-1000 w-full max-w-[280px] h-[340px] sm:h-[370px] select-none cursor-pointer transition-transform duration-300"
      style={{
        transform: !isFlipped && !isShuffling && rotationDeg ? `rotate(${rotationDeg}deg)` : 'none',
      }}
    >
      <div
        role="button"
        tabIndex={isAnyFlipped ? -1 : 0}
        aria-label={`Kartu nomor ${index + 1}: ${isFlipped ? item.menuName : 'Pilih kartu ini'}`}
        aria-pressed={isFlipped}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`w-full h-full relative transform-style-3d transition-transform duration-700 ease-out rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-[#3975EA] focus-visible:ring-offset-2 ${
          isFlipped ? 'rotate-y-180' : ''
        } ${isShuffling ? 'animate-pulse scale-95' : 'hover:-translate-y-2 hover:shadow-card-hover'}`}
      >
        {/* ================= BACK OF CARD (Closed State: Blue with doodle) ================= */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl card-back-pattern border-4 border-white shadow-soft-lg flex flex-col items-center justify-between p-6 text-white overflow-hidden"
        >
          {/* Top corner doodles */}
          <div className="w-full flex items-center justify-between">
            <SparkleDoodle className="w-5 h-5 text-[#FFC5AD]" />
            <span className="text-[11px] font-fredoka font-semibold tracking-wider text-white/80 uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
              #{index + 1}
            </span>
            <StarDoodle className="w-4 h-4 text-[#FFE8DD]" />
          </div>

          {/* Center visual: Bowl and "Pilih aku?" */}
          <div className="flex flex-col items-center text-center my-auto">
            <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border-2 border-[#FFC5AD]/60 flex items-center justify-center text-white mb-3 shadow-inner group-hover:scale-110 transition-transform">
              <BowlIcon className="w-11 h-11 text-[#FFE8DD]" />
            </div>

            <h3 className="font-fredoka text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-sm">
              Pilih aku?
            </h3>
            <p className="text-xs text-[#FFE8DD] font-medium mt-1 opacity-90">
              Biar nggak overthinking ✨
            </p>
          </div>

          {/* Bottom decorative bar */}
          <div className="w-full flex items-center justify-center gap-1.5 opacity-80">
            <span className="h-1.5 w-6 rounded-full bg-[#FFC5AD]"></span>
            <span className="h-1.5 w-2 rounded-full bg-[#FFE8DD]"></span>
            <span className="h-1.5 w-2 rounded-full bg-[#FFE8DD]"></span>
          </div>
        </div>

        {/* ================= FRONT OF CARD (Revealed State: White & Peach) ================= */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-white border-3 border-[#3975EA] shadow-xl flex flex-col justify-between p-5 text-[#183153] overflow-hidden"
        >
          {/* Header pill */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E8F0FF] text-[#3975EA] flex items-center gap-1">
              <span>{categoryInfo.emoji}</span>
              <span>{categoryInfo.label}</span>
            </span>
            <span className="text-xs font-semibold text-[#183153]/50">Terbuka 🎉</span>
          </div>

          {/* Core Info */}
          <div className="my-auto py-2">
            <p className="text-xs font-bold text-[#3975EA] uppercase tracking-wider mb-1">
              Menu Rekomendasi
            </p>
            <h4 className="font-fredoka text-xl font-bold text-[#183153] leading-snug line-clamp-3 mb-2">
              {item.menuName}
            </h4>
            <p className="text-sm font-semibold text-[#183153]/80 flex items-center gap-1.5 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-[#3975EA] shrink-0" />
              <span>{item.placeName}</span>
            </p>
          </div>

          {/* Price & Badge */}
          <div className="pt-3 border-t border-[#FFE8DD] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#183153]/60 font-semibold block uppercase">
                Perkiraan Harga
              </span>
              <span className="text-sm font-extrabold text-[#3975EA]">
                {item.price ? formatRupiah(item.price) : 'Belum diisi'}
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#FFE8DD] text-[#183153] flex items-center justify-center font-bold text-xs">
              ✓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
