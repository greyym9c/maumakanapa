import React, { useState, useMemo } from 'react';
import { FoodItem, CATEGORY_LABELS, MealTime, MEAL_TIME_LABELS } from '../types/food';
import { FoodCard } from './FoodCard';
import { EmptyState } from './EmptyState';
import { PlusCircle, Search, Heart, HardDrive, X, MapPin, Clock } from 'lucide-react';

interface CollectionPageProps {
  items: FoodItem[];
  onAddFood: () => void;
  onEditFood: (item: FoodItem) => void;
  onDeleteFood: (item: FoodItem) => void;
  onLoadSampleData: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  items,
  onAddFood,
  onEditFood,
  onDeleteFood,
  onLoadSampleData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFavoriteOf, setSelectedFavoriteOf] = useState('all');
  const [selectedMealTime, setSelectedMealTime] = useState<MealTime>('semua');

  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchFav = selectedFavoriteOf === 'all' || item.favoriteOf === selectedFavoriteOf;
      const matchTime =
        selectedMealTime === 'semua' ||
        item.bestTime === 'semua' ||
        item.bestTime === selectedMealTime;
      const matchSearch =
        !q ||
        item.menuName.toLowerCase().includes(q) ||
        item.placeName.toLowerCase().includes(q) ||
        (item.address && item.address.toLowerCase().includes(q)) ||
        (item.notes && item.notes.toLowerCase().includes(q));
      return matchCat && matchFav && matchTime && matchSearch;
    });
  }, [items, searchQuery, selectedCategory, selectedFavoriteOf, selectedMealTime]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FF] text-[#3975EA] text-xs font-bold uppercase tracking-wider mb-2 border border-[#D0E0FF]">
            <MapPin className="w-3.5 h-3.5 text-[#E05A47]" />
            <span>Koleksi Kuliner Rekomendasi ⭐ 4.5+</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#183153] tracking-tight">
            Kuliner Kita Heru & Nadine 💕
          </h1>
          <p className="text-xs sm:text-sm text-[#183153]/75 font-medium mt-1">
            Spot makan legendaris dan kafe kencan terbaik untuk berdua.
          </p>
          <p className="text-xs text-[#183153]/60 flex items-center gap-1 mt-1 font-medium">
            <HardDrive className="w-3 h-3 text-[#3975EA]" />
            <span>Data tersimpan otomatis di browser ini.</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onAddFood}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#3975EA] hover:bg-[#285ec4] text-white font-bold px-5 py-3 rounded-2xl shadow-soft btn-press min-h-[46px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Kuliner Baru</span>
          </button>
        </div>
      </div>

      {/* If collection is empty, show EmptyState */}
      {items.length === 0 ? (
        <EmptyState
          onAddFood={onAddFood}
          onLoadSampleData={onLoadSampleData}
        />
      ) : (
        <>
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#FFE8DD] shadow-soft mb-6 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#183153]/40" />
              <input
                type="text"
                placeholder="Cari soto, sate, lentog, garang asem, kopi, kafe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 bg-[#FFF9F4] border border-[#FFE8DD] rounded-2xl text-sm font-medium text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[46px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/5 text-[#183153]/50"
                  aria-label="Hapus pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Meal time filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-[11px] font-bold text-[#183153]/70 shrink-0 flex items-center gap-1 mr-1">
                <Clock className="w-3.5 h-3.5 text-[#3975EA]" />
                Waktu:
              </span>
              {(['semua', 'pagi', 'siang', 'sore', 'malam'] as MealTime[]).map((t) => {
                const info = MEAL_TIME_LABELS[t];
                const isActive = selectedMealTime === t;
                return (
                  <button
                    key={t}
                    onClick={() => setSelectedMealTime(t)}
                    className={`shrink-0 inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all min-h-[34px] border ${
                      isActive
                        ? 'bg-[#3975EA] text-white border-[#3975EA]'
                        : 'bg-[#FFF9F4] text-[#183153] border-[#FFE8DD] hover:bg-[#E8F0FF]'
                    }`}
                  >
                    <span>{info.emoji}</span>
                    <span>{info.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Couple Filter & Category Chips */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#FFE8DD]/60">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'Semua', emoji: '🍽️' },
                  { id: 'heru', label: 'Favorit Heru', emoji: '👦' },
                  { id: 'nadine', label: 'Favorit Nadine', emoji: '👧' },
                  { id: 'berdua', label: 'Favorit Berdua', emoji: '💑' },
                ].map((item) => {
                  const isActive = selectedFavoriteOf === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedFavoriteOf(item.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all min-h-[34px] border ${
                        isActive
                          ? 'bg-[#183153] text-white border-[#183153]'
                          : 'bg-[#FFF9F4] text-[#183153] border-[#FFE8DD] hover:bg-[#FFE8DD]'
                      }`}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-1">
                {Object.entries(CATEGORY_LABELS).map(([key, item]) => {
                  const isActive = selectedCategory === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-bold transition-all min-h-[34px] ${
                        isActive
                          ? 'bg-[#3975EA] text-white'
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
          </div>

          {/* Counter */}
          <div className="flex items-center justify-between mb-3 px-1 text-xs font-bold text-[#183153]/70">
            <span>
              Menampilkan {filteredList.length} dari {items.length} kuliner pilihan
            </span>
            {filteredList.length === 0 && (
              <span className="text-red-500">Tidak ada kuliner yang cocok</span>
            )}
          </div>

          {/* Cards Grid */}
          {filteredList.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-[#FFE8DD] shadow-soft my-4">
              <p className="text-sm font-bold text-[#183153] mb-2">
                Belum ada menu yang cocok dengan filter pencarian ini.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedFavoriteOf('all');
                  setSelectedMealTime('semua');
                }}
                className="text-xs font-bold text-[#3975EA] hover:underline"
              >
                Reset pencarian & filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredList.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onEdit={onEditFood}
                  onDelete={onDeleteFood}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
