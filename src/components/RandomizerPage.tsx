import React, { useState, useMemo } from 'react';
import { FoodItem, MealTime } from '../types/food';
import { FilterBar } from './FilterBar';
import { CardDeck } from './CardDeck';
import { ResultPanel } from './ResultPanel';
import { EmptyState } from './EmptyState';
import { PlusCircle, MapPin, Sparkles } from 'lucide-react';
import { SquiggleDoodle, StarDoodle } from './DoodleDecorations';

interface RandomizerPageProps {
  items: FoodItem[];
  onOpenAddModal: () => void;
  onOpenEditModal: (item: FoodItem) => void;
  onLoadSampleData: () => void;
}

export const RandomizerPage: React.FC<RandomizerPageProps> = ({
  items,
  onOpenAddModal,
  onOpenEditModal,
  onLoadSampleData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFavoriteOf, setSelectedFavoriteOf] = useState<string>('all');
  const [selectedMealTime, setSelectedMealTime] = useState<MealTime>('semua');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedResult, setSelectedResult] = useState<FoodItem | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Couple favorite filter
      if (selectedFavoriteOf !== 'all' && item.favoriteOf !== selectedFavoriteOf) {
        return false;
      }
      // Meal time filter (Waktu makan: Pagi, Siang, Sore, Malam)
      if (selectedMealTime !== 'semua') {
        if (item.bestTime && item.bestTime !== 'semua' && item.bestTime !== selectedMealTime) {
          return false;
        }
      }
      // Max price filter
      if (maxPrice !== null) {
        if (item.price === undefined || item.price === null) {
          return false;
        }
        if (item.price > maxPrice) {
          return false;
        }
      }
      return true;
    });
  }, [items, selectedCategory, selectedFavoriteOf, selectedMealTime, maxPrice]);

  const handleResetRound = () => {
    setSelectedResult(null);
  };

  // Dedicated Result Page (No long scroll down!)
  if (selectedResult) {
    return (
      <div className="w-full min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-3">
        <ResultPanel
          selectedItem={selectedResult}
          onResetRound={handleResetRound}
          onEditItem={onOpenEditModal}
        />
      </div>
    );
  }

  // If 0 items, show EmptyState
  if (items.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <EmptyState
          onAddFood={onOpenAddModal}
          onLoadSampleData={onLoadSampleData}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Header section with Kudus vibe */}
      <div className="text-center max-w-2xl mx-auto mb-5 relative">
        <div className="hidden sm:block absolute -top-2 left-4 pointer-events-none opacity-50">
          <StarDoodle className="w-5 h-5 text-[#3975EA]" />
        </div>
        <div className="hidden sm:block absolute top-6 right-6 pointer-events-none opacity-50">
          <StarDoodle className="w-6 h-6 text-[#FFC5AD]" />
        </div>

        {/* Kudus Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F0FF] text-[#3975EA] text-xs font-bold tracking-wide uppercase mb-2 shadow-xs border border-[#D0E0FF]">
          <MapPin className="w-3.5 h-3.5 text-[#E05A47]" />
          <span>Kuliner Kudus Rekomendasi ⭐ 4.5+</span>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#183153] tracking-tight leading-tight mb-1.5">
          Lagi di Kudus, mau makan apa hari ini?
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#183153]/80 font-medium leading-relaxed mb-3">
          Soto Kudus, Lentog Tanjung, Sate Kerbau, atau Garang Asem? Pilih jam kencan, acak kartunya, terus gas berangkat bareng! 💕
        </p>

        {/* Action button */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3975EA] hover:text-[#285ec4] bg-white hover:bg-[#E8F0FF] px-3.5 py-2 rounded-full border border-[#FFE8DD] shadow-xs transition-colors min-h-[38px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Kuliner Kudus Baru</span>
          </button>
        </div>

        <div className="flex justify-center mt-2 opacity-60">
          <SquiggleDoodle className="w-16 h-2 text-[#FFC5AD]" />
        </div>
      </div>

      {/* Filter Bar with MealTime, Couple, Category & Budget */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedFavoriteOf={selectedFavoriteOf}
        onSelectFavoriteOf={setSelectedFavoriteOf}
        selectedMealTime={selectedMealTime}
        onSelectMealTime={setSelectedMealTime}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        filteredCount={filteredItems.length}
        totalCount={items.length}
      />

      {/* Card Deck */}
      <CardDeck
        filteredItems={filteredItems}
        onOpenAddModal={onOpenAddModal}
        onItemRevealed={(item) => setSelectedResult(item)}
        selectedItem={selectedResult}
        onResetRound={handleResetRound}
      />
    </div>
  );
};
