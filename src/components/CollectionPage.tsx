import React, { useState, useMemo } from 'react';
import { FoodItem, CATEGORY_LABELS } from '../types/food';
import { FoodCard } from './FoodCard';
import { EmptyState } from './EmptyState';
import { PlusCircle, Search, Heart, HardDrive, X } from 'lucide-react';

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

  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchFav = selectedFavoriteOf === 'all' || item.favoriteOf === selectedFavoriteOf;
      const matchSearch =
        !q ||
        item.menuName.toLowerCase().includes(q) ||
        item.placeName.toLowerCase().includes(q) ||
        (item.address && item.address.toLowerCase().includes(q)) ||
        (item.notes && item.notes.toLowerCase().includes(q));
      return matchCat && matchFav && matchSearch;
    });
  }, [items, searchQuery, selectedCategory, selectedFavoriteOf]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE8DD] text-[#E05A47] text-xs font-bold uppercase tracking-wider mb-2 border border-[#FFC5AD]/80">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Koleksi Kuliner Heru & Nadine</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#183153] tracking-tight">
            Daftar Kuliner Kencan Kita 💕
          </h1>
          <p className="text-sm sm:text-base text-[#183153]/75 font-medium mt-1">
            Catatan tempat makan favorit Heru, Nadine, dan rekomendasi kencan berdua.
          </p>
          <p className="text-xs text-[#183153]/60 flex items-center gap-1.5 mt-1.5 font-medium">
            <HardDrive className="w-3.5 h-3.5 text-[#3975EA]" />
            <span>Data tersimpan otomatis di browser HP/laptop ini.</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onAddFood}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#3975EA] hover:bg-[#285ec4] text-white font-bold px-6 py-3.5 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#183153]"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Tambah kuliner</span>
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
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#FFE8DD] shadow-soft mb-6 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#183153]/40" />
              <input
                type="text"
                placeholder="Cari tempat makan, menu, atau catatan kencan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-[#FFF9F4] border border-[#FFE8DD] rounded-2xl text-sm font-medium text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[48px]"
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

            {/* Couple Filter & Category Chips */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {/* Couple Filter Chips */}
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
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[38px] border ${
                        isActive
                          ? 'bg-[#183153] text-white border-[#183153] shadow-xs'
                          : 'bg-[#FFF9F4] text-[#183153] border-[#FFE8DD] hover:bg-[#FFE8DD]'
                      }`}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Category selector */}
              <div className="flex flex-wrap items-center gap-1.5">
                {Object.entries(CATEGORY_LABELS).map(([key, item]) => {
                  const isActive = selectedCategory === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[38px] ${
                        isActive
                          ? 'bg-[#3975EA] text-white shadow-xs'
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

          {/* Counter info */}
          <div className="flex items-center justify-between mb-4 px-1 text-xs font-bold text-[#183153]/70">
            <span>
              Menampilkan {filteredList.length} dari {items.length} kuliner
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
                }}
                className="text-xs font-bold text-[#3975EA] hover:underline"
              >
                Reset pencarian & filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
