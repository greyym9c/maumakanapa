import React from 'react';
import { FoodItem, CATEGORY_LABELS } from '../types/food';
import { formatRupiah } from '../utils/formatters';
import { Edit2, Trash2, MapPin, ExternalLink, Sparkles } from 'lucide-react';

interface FoodCardProps {
  item: FoodItem;
  onEdit: (item: FoodItem) => void;
  onDelete: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onEdit, onDelete }) => {
  const category = CATEGORY_LABELS[item.category] || CATEGORY_LABELS['lainnya'];

  return (
    <article
      aria-label={`${item.menuName} di ${item.placeName}`}
      className="bg-white rounded-3xl p-5 border border-[#FFE8DD] shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Sample Badge if applicable */}
      {item.isSample && (
        <div className="absolute top-0 right-0 bg-[#FFE8DD] text-[#183153] text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-[#FFC5AD] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#3975EA]" />
          <span>Contoh</span>
        </div>
      )}

      <div>
        {/* Category Pill */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F0FF] text-[#3975EA]">
            <span>{category.emoji}</span>
            <span>{category.label}</span>
          </span>

          {item.price !== undefined && item.price !== null && (
            <span className="text-xs font-bold text-[#183153]/80 bg-[#FFF9F4] px-2.5 py-0.5 rounded-full border border-[#FFE8DD]">
              {formatRupiah(item.price)}
            </span>
          )}
        </div>

        {/* Menu & Place */}
        <h3 className="font-fredoka text-lg font-bold text-[#183153] leading-snug break-words mb-1">
          {item.menuName}
        </h3>

        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#3975EA] mb-2 break-words">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{item.placeName}</span>
        </div>

        {/* Short address or notes */}
        {item.address && (
          <p className="text-xs text-[#183153]/70 line-clamp-1 mb-1 break-words">
            📍 {item.address}
          </p>
        )}

        {item.notes && (
          <p className="text-xs text-[#183153]/60 italic line-clamp-2 mt-1 bg-[#FFF9F4] p-2 rounded-xl border border-[#FFE8DD]/60">
            "{item.notes}"
          </p>
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
              <span>Maps</span>
            </a>
          ) : (
            <span className="text-[11px] text-[#183153]/40">Tanpa Maps</span>
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
