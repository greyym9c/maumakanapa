import React from 'react';
import { FoodItem, CATEGORY_LABELS, COUPLE_TAGS, MEAL_TIME_LABELS } from '../types/food';
import { formatRupiah } from '../utils/formatters';
import { Edit2, Trash2, MapPin, ExternalLink, Sparkles, Star, Clock } from 'lucide-react';

interface FoodCardProps {
  item: FoodItem;
  onEdit: (item: FoodItem) => void;
  onDelete: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onEdit, onDelete }) => {
  const category = CATEGORY_LABELS[item.category] || CATEGORY_LABELS['lainnya'];
  const coupleTag = item.favoriteOf ? COUPLE_TAGS[item.favoriteOf] : null;
  const timeInfo = item.bestTime ? MEAL_TIME_LABELS[item.bestTime] : null;

  return (
    <article
      aria-label={`${item.menuName} di ${item.placeName}`}
      className="bg-white rounded-3xl p-5 border border-[#FFE8DD] shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Sample Badge if applicable */}
      {item.isSample && (
        <div className="absolute top-0 right-0 bg-[#FFE8DD] text-[#183153] text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-[#FFC5AD] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#3975EA]" />
          <span>Top Rekomen</span>
        </div>
      )}

      <div>
        {/* Rating, Category & Couple Tag */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          {/* Rating */}
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-extrabold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
            <Star className="w-3 h-3 fill-current text-[#F59E0B]" />
            <span>{item.rating ? item.rating.toFixed(1) : '4.6'}</span>
          </span>

          {/* Best Time Tag */}
          {timeInfo && item.bestTime !== 'semua' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FFE8DD] text-[#E05A47]">
              <span>{timeInfo.emoji}</span>
              <span>{timeInfo.label.split(' ')[0]}</span>
            </span>
          )}

          {coupleTag && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${coupleTag.badgeColor}`}>
              <span>{coupleTag.emoji}</span>
              <span>{coupleTag.label}</span>
            </span>
          )}

          {item.price !== undefined && item.price !== null && (
            <span className="text-xs font-bold text-[#183153]/80 bg-[#FFF9F4] px-2.5 py-0.5 rounded-full border border-[#FFE8DD]">
              {formatRupiah(item.price)}
            </span>
          )}
        </div>

        {/* Menu & Place */}
        <h3 className="font-display text-lg font-bold text-[#183153] leading-snug break-words mb-1">
          {item.menuName}
        </h3>

        <div className="flex items-center gap-1.5 text-sm font-bold text-[#3975EA] mb-1.5 break-words">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{item.placeName}</span>
        </div>

        {/* Opening Hours */}
        {item.openingHours && (
          <p className="text-xs text-[#183153]/70 flex items-center gap-1 mb-1.5">
            <Clock className="w-3.5 h-3.5 text-[#3975EA]" />
            <span>Jam buka: {item.openingHours}</span>
          </p>
        )}

        {/* Short address */}
        {item.address && (
          <p className="text-xs text-[#183153]/60 line-clamp-1 mb-1.5 break-words">
            📍 {item.address}
          </p>
        )}

        {/* Couple Note */}
        {item.notes && (
          <div className="mt-1 bg-[#FFF9F4] p-2.5 rounded-2xl border border-[#FFE8DD]">
            <p className="font-handwriting text-sm text-[#E05A47] font-semibold leading-snug">
              "{item.notes}"
            </p>
          </div>
        )}
      </div>

      {/* Action footer */}
      <div className="pt-4 mt-4 border-t border-[#FFE8DD] flex items-center justify-between gap-2">
        <div>
          {item.mapsUrl ? (
            <a
              href={item.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#3975EA] hover:underline p-1 min-h-[36px]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>
          ) : (
            <span className="text-[11px] text-[#183153]/40">Favorit</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onEdit(item)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#E8F0FF] text-[#3975EA] hover:bg-[#3975EA] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
            aria-label={`Edit ${item.menuName}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(item)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFF9F4] text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-colors border border-[#FFE8DD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
            aria-label={`Hapus ${item.menuName}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
