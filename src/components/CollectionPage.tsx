import React, { useState, useMemo } from 'react';
import { FoodItem, CATEGORY_LABELS } from '../types/food';
import { FoodCard } from './FoodCard';
import { EmptyState } from './EmptyState';
import { PlusCircle, Search, Sparkles, HardDrive, X } from 'lucide-react';

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

  // Filter items based on search query and category
  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        !q ||
        item.menuName.toLowerCase().includes(q) ||
        item.placeName.toLowerCase().includes(q) ||
        (item.address && item.address.toLowerCase().includes(q)) ||
        (item.notes && item.notes.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [items, searchQuery, selectedCategory]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FF] text-[#3975EA] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Koleksi Kuliner Favorit</span>
          </div>
          <h1 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-[#183153] tracking-tight">
            Daftar penyelamat pas laper.
          </h1>
          <p className="text-sm sm:text-base text-[#183153]/70 font-medium mt-1">
            Masukkan tempat dan menu favoritmu di sini.
          </p>
          <p className="text-xs text-[#183153]/60 flex items-center gap-1.5 mt-1.5">
            <HardDrive className="w-3.5 h-3.5 text-[#3975EA]" />
            <span>Data tersimpan otomatis di browser ini (localStorage).</span>
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onAddFood}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#3975EA] hover:bg-[#2c65cf] text-white font-bold px-6 py-3.5 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#183153]"
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
          {/* Search & Category Filter Bar */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#FFE8DD] shadow-soft mb-6 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#183153]/40" />
              <input
                type="text"
                placeholder="Cari nama menu, tempat makan, atau catatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-[#FFF9F4] border border-[#FFE8DD] rounded-2xl text-sm text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[48px]"
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

            {/* Quick Category Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {Object.entries(CATEGORY_LABELS).map(([key, item]) => {
                const isActive = selectedCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all min-h-[38px] ${
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

          {/* Items Counter Info */}
          <div className="flex items-center justify-between mb-4 px-1 text-xs font-bold text-[#183153]/70">
            <span>
              Menampilkan {filteredList.length} dari {items.length} kuliner
            </span>
            {filteredList.length === 0 && (
              <span className="text-red-500">Pencarian tidak menemukan hasil</span>
            )}
          </div>

          {/* Cards Grid */}
          {filteredList.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-[#FFE8DD] shadow-soft my-4">
              <p className="text-sm font-semibold text-[#183153] mb-2">
                Tidak ada menu yang sesuai dengan "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
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
