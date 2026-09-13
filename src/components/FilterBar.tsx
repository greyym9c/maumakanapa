import React from 'react';
import { CATEGORY_LABELS } from '../types/food';
import { Filter, DollarSign, X } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  maxPrice: number | null;
  onMaxPriceChange: (price: number | null) => void;
  filteredCount: number;
  totalCount: number;
}

const PRICE_PRESETS = [
  { label: 'Bebas', value: null },
  { label: '≤ 20 rb', value: 20000 },
  { label: '≤ 35 rb', value: 35000 },
  { label: '≤ 50 rb', value: 50000 },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onMaxPriceChange,
  filteredCount,
  totalCount,
}) => {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#FFE8DD] shadow-soft mb-6 transition-all">
      {/* Top row: Counter & Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#FFE8DD]/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E8F0FF] text-[#3975EA] flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-[#3975EA] block">
              Filter Pilihan
            </span>
            <p className="text-sm font-bold text-[#183153]">
              Tersedia <span className="text-[#3975EA] font-extrabold text-base">{filteredCount}</span> dari {totalCount} kuliner
            </p>
          </div>
        </div>

        {/* Reset button if filter is active */}
        {(selectedCategory !== 'all' || maxPrice !== null) && (
          <button
            onClick={() => {
              onSelectCategory('all');
              onMaxPriceChange(null);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#183153] hover:text-[#3975EA] bg-[#FFE8DD]/60 hover:bg-[#FFE8DD] px-3 py-1.5 rounded-full transition-colors min-h-[36px]"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filter</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Category Pills */}
        <div>
          <label className="text-xs font-semibold text-[#183153]/70 mb-2 block">
            Pilih Kategori:
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_LABELS).map(([key, item]) => {
              const isActive = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => onSelectCategory(key)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
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
            <label className="text-xs font-semibold text-[#183153]/70 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-[#3975EA]" />
              Batas Harga Maksimal:
            </label>
            {maxPrice !== null && (
              <span className="text-xs font-bold text-[#3975EA] bg-[#E8F0FF] px-2 py-0.5 rounded-full">
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
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
                    isSelected
                      ? 'bg-[#183153] text-white shadow-sm'
                      : 'bg-[#FFF9F4] text-[#183153] hover:bg-[#FFE8DD] border border-[#FFE8DD]'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}

            {/* Custom price input */}
            <div className="relative inline-flex items-center">
              <span className="absolute left-3 text-xs font-semibold text-[#183153]/50">Rp</span>
              <input
                type="number"
                min="0"
                step="5000"
                placeholder="Lainnya..."
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
                className="w-32 pl-9 pr-3 py-2 bg-[#FFF9F4] border border-[#FFE8DD] rounded-xl text-xs sm:text-sm text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[44px]"
              />
            </div>
          </div>

          {maxPrice !== null && (
            <p className="text-[11px] text-[#183153]/60 mt-1.5 flex items-center gap-1">
              * Item tanpa informasi harga dilewati otomatis saat filter harga aktif.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
