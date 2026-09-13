import React from 'react';
import { CATEGORY_LABELS, MealTime, MEAL_TIME_LABELS } from '../types/food';
import { DollarSign, X, Heart, Clock, Star, MapPin, Sparkles } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedFavoriteOf: string;
  onSelectFavoriteOf: (fav: string) => void;
  selectedMealTime: MealTime;
  onSelectMealTime: (time: MealTime) => void;
  maxPrice: number | null;
  onMaxPriceChange: (price: number | null) => void;
  filteredCount: number;
  totalCount: number;
}

const PRICE_PRESETS = [
  { label: 'Bebas', value: null },
  { label: '≤ 20 rb', value: 20000 },
  { label: '≤ 35 rb', value: 35000 },
  { label: '≤ 55 rb', value: 55000 },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedFavoriteOf,
  onSelectFavoriteOf,
  selectedMealTime,
  onSelectMealTime,
  maxPrice,
  onMaxPriceChange,
  filteredCount,
  totalCount,
}) => {
  return (
    <div className="glass-card rounded-3xl p-4 sm:p-6 shadow-[0_12px_32px_rgba(20,37,61,0.06)] mb-6 transition-all relative overflow-hidden">
      {/* Top row: Status Banner & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-4 border-b border-[#FFE8DD]/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FFE8DD] to-[#FFD8C9] text-[#E05A47] flex items-center justify-center shrink-0 shadow-xs">
            <MapPin className="w-5 h-5 text-[#3975EA]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-display font-extrabold text-sm sm:text-base text-[#14253D]">
                Kuliner Kudus Rekomendasi
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-[#FEF3C7] text-[#92400E] px-2.5 py-0.5 rounded-full border border-[#FDE68A] shadow-xs">
                <Star className="w-3 h-3 fill-current text-[#F59E0B]" />
                <span>Bintang 4.5+</span>
              </span>
            </div>
            <p className="text-xs font-semibold text-[#14253D]/70 mt-0.5">
              Tersedia <span className="text-[#3975EA] font-extrabold text-sm">{filteredCount}</span> dari {totalCount} kuliner date di Kudus
            </p>
          </div>
        </div>

        {/* Reset button if filter is active */}
        {(selectedCategory !== 'all' || selectedFavoriteOf !== 'all' || selectedMealTime !== 'semua' || maxPrice !== null) && (
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectFavoriteOf('all');
              onSelectMealTime('semua');
              onMaxPriceChange(null);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#14253D] hover:text-[#3975EA] bg-[#FFE8DD]/80 hover:bg-[#FFE8DD] px-3.5 py-1.5 rounded-full transition-colors min-h-[36px]"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filter</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* 1. FILTER WAKTU / JAM MAKAN YANG COCOK */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[#14253D]/80 flex items-center gap-1.5 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#3975EA]" />
              Waktu / Jam Kencan:
            </label>
            {selectedMealTime !== 'semua' && (
              <span className="text-[11px] font-bold text-[#3975EA] bg-[#E8F0FF] px-2 py-0.5 rounded-full">
                {MEAL_TIME_LABELS[selectedMealTime]?.timeRange}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(['semua', 'pagi', 'siang', 'sore', 'malam'] as MealTime[]).map((timeKey) => {
              const info = MEAL_TIME_LABELS[timeKey];
              const isActive = selectedMealTime === timeKey;
              return (
                <button
                  key={timeKey}
                  onClick={() => onSelectMealTime(timeKey)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl text-xs font-bold transition-all min-h-[50px] border ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3975EA] to-[#265ecc] text-white border-[#3975EA] shadow-[0_4px_14px_rgba(57,117,234,0.3)] scale-102'
                      : 'bg-white/80 text-[#14253D] border-[#FFE8DD] hover:bg-[#E8F0FF]/60 hover:border-[#D0E0FF]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{info.emoji}</span>
                    <span className="font-display">{info.label.split(' ')[0]}</span>
                  </div>
                  <span className={`text-[10px] font-medium mt-0.5 ${isActive ? 'text-white/80' : 'text-[#14253D]/60'}`}>
                    {timeKey === 'semua' ? 'Bebas jam' : info.timeRange.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Seleranya Siapa */}
        <div>
          <label className="text-xs font-bold text-[#14253D]/80 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#E05A47] fill-current" />
            Lagi Pengen Ngikutin Selera Siapa:
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
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-display font-bold transition-all min-h-[44px] border ${
                    isActive
                      ? 'bg-[#14253D] text-white border-[#14253D] shadow-sm scale-101'
                      : 'bg-white/80 text-[#14253D] border-[#FFE8DD] hover:bg-[#FFE8DD]/60'
                  }`}
                >
                  <span>{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Category Pills */}
        <div>
          <label className="text-xs font-bold text-[#14253D]/80 mb-2 block uppercase tracking-wider">
            Kategori Kuliner Kudus:
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {Object.entries(CATEGORY_LABELS).map(([key, item]) => {
              const isActive = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => onSelectCategory(key)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
                    isActive
                      ? 'bg-[#3975EA] text-white shadow-xs scale-102'
                      : 'bg-white/80 text-[#14253D] hover:bg-[#E8F0FF] border border-[#FFE8DD]'
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Max Price filter */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[#14253D]/80 flex items-center gap-1 uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5 text-[#3975EA]" />
              Budget Maksimal:
            </label>
            {maxPrice !== null && (
              <span className="text-xs font-extrabold text-[#3975EA] bg-[#E8F0FF] px-2.5 py-0.5 rounded-full">
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
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[42px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
                    isSelected
                      ? 'bg-[#3975EA] text-white shadow-xs'
                      : 'bg-white/80 text-[#14253D] hover:bg-[#FFE8DD] border border-[#FFE8DD]'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}

            {/* Custom price input */}
            <div className="relative inline-flex items-center">
              <span className="absolute left-3 text-xs font-bold text-[#14253D]/50">Rp</span>
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
                className="w-32 pl-9 pr-3 py-2 bg-white/90 border border-[#FFE8DD] rounded-xl text-xs sm:text-sm font-semibold text-[#14253D] placeholder:text-[#14253D]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[42px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
