import React from 'react';
import { CATEGORY_LABELS } from '../types/food';
import { Filter, DollarSign, X, Heart } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedFavoriteOf: string;
  onSelectFavoriteOf: (fav: string) => void;
  maxPrice: number | null;
  onMaxPriceChange: (price: number | null) => void;
  filteredCount: number;
  totalCount: number;
}

const PRICE_PRESETS = [
  { label: 'Bebas', value: null },
  { label: '≤ 25 rb', value: 25000 },
  { label: '≤ 40 rb', value: 40000 },
  { label: '≤ 70 rb', value: 70000 },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedFavoriteOf,
  onSelectFavoriteOf,
  maxPrice,
  onMaxPriceChange,
  filteredCount,
  totalCount,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#FFE8DD] shadow-soft mb-6 transition-all relative">
      {/* Top row: Counter & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#FFE8DD]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#FFE8DD] text-[#E05A47] flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-handwriting text-lg font-bold text-[#E05A47] leading-none block">
              Pilihan menu date kita
            </span>
            <p className="text-sm font-bold text-[#183153]">
              Tersedia <span className="text-[#3975EA] font-extrabold text-base">{filteredCount}</span> dari {totalCount} kuliner
            </p>
          </div>
        </div>

        {/* Reset button if filter is active */}
        {(selectedCategory !== 'all' || selectedFavoriteOf !== 'all' || maxPrice !== null) && (
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectFavoriteOf('all');
              onMaxPriceChange(null);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#183153] hover:text-[#3975EA] bg-[#FFE8DD] hover:bg-[#ffdacf] px-3.5 py-1.5 rounded-full transition-colors min-h-[36px]"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filter</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Couple Selector: Kesukaan Siapa? */}
        <div>
          <label className="text-xs font-bold text-[#183153]/75 mb-2 block uppercase tracking-wider">
            Lagi Pengen Ngikutin Seleranya Siapa?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'all', label: 'Semua Menu', emoji: '🍽️' },
              { id: 'heru', label: 'Favorit Heru', emoji: '👦' },
              { id: 'nadine', label: 'Favorit Nadine', emoji: '👧' },
              { id: 'berdua', label: 'Favorit Berdua', emoji: '💑' },
            ].map((opt) => {
              const isActive = selectedFavoriteOf === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelectFavoriteOf(opt.id)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all min-h-[44px] border ${
                    isActive
                      ? 'bg-[#183153] text-white border-[#183153] shadow-sm'
                      : 'bg-[#FFF9F4] text-[#183153] border-[#FFE8DD] hover:bg-[#FFE8DD]'
                  }`}
                >
                  <span>{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills */}
        <div>
          <label className="text-xs font-bold text-[#183153]/75 mb-2 block uppercase tracking-wider">
            Jenis Makanan:
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_LABELS).map(([key, item]) => {
              const isActive = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => onSelectCategory(key)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
                    isActive
                      ? 'bg-[#3975EA] text-white shadow-sm scale-102'
                      : 'bg-[#FFF9F4] text-[#183153] hover:bg-[#E8F0FF] border border-[#FFE8DD]'
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Max Price filter */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[#183153]/75 flex items-center gap-1 uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5 text-[#3975EA]" />
              Budget Maksimal Kencan:
            </label>
            {maxPrice !== null && (
              <span className="text-xs font-bold text-[#3975EA] bg-[#E8F0FF] px-2.5 py-0.5 rounded-full">
                Maks. Rp {maxPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {PRICE_PRESETS.map((preset, idx) => {
              const isSelected = maxPrice === preset.value;
              return (
                <button
                  key={idx}
                  onClick={() => onMaxPriceChange(preset.value)}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
                    isSelected
                      ? 'bg-[#3975EA] text-white shadow-sm'
                      : 'bg-[#FFF9F4] text-[#183153] hover:bg-[#FFE8DD] border border-[#FFE8DD]'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}

            {/* Custom price input */}
            <div className="relative inline-flex items-center">
              <span className="absolute left-3 text-xs font-bold text-[#183153]/50">Rp</span>
              <input
                type="number"
                min="0"
                step="5000"
                placeholder="Budget lain..."
                value={maxPrice === null ? '' : maxPrice}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  if (val === '') {
                    onMaxPriceChange(null);
                  } else {
                    const num = parseInt(val, 10);
                    onMaxPriceChange(isNaN(num) || num < 0 ? null : num);
                  }
                }}
                className="w-32 pl-9 pr-3 py-2 bg-[#FFF9F4] border border-[#FFE8DD] rounded-xl text-xs sm:text-sm font-semibold text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[44px]"
              />
            </div>
          </div>

          {maxPrice !== null && (
            <p className="text-[11px] text-[#183153]/60 mt-1.5 flex items-center gap-1 font-medium">
              * Menu tanpa catatan harga otomatis dilewati pas filter budget aktif.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
