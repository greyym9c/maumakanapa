import React, { useState, useMemo } from 'react';
import { FoodItem, MealTime, MEAL_TIME_LABELS } from '../types/food';
import { FilterBar } from './FilterBar';
import { CardStagePage } from './CardStagePage';
import { ResultPanel } from './ResultPanel';
import { EmptyState } from './EmptyState';
import { Dices, PlusCircle, MapPin, Sparkles, Heart } from 'lucide-react';
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
  // Navigation inside Randomizer: 'setup' -> 'card-stage' -> 'result'
  const [viewMode, setViewMode] = useState<'setup' | 'card-stage' | 'result'>('setup');
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
      // Meal time filter (Pagi, Siang, Sore, Malam)
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

  // Handle reveal from card-stage
  const handleItemRevealed = (item: FoodItem) => {
    setSelectedResult(item);
    setViewMode('result');
  };

  // Reset to pick cards again
  const handleResetToCards = () => {
    setSelectedResult(null);
    setViewMode('card-stage');
  };

  // Reset to filter setup
  const handleResetToSetup = () => {
    setSelectedResult(null);
    setViewMode('setup');
  };

  // 1. DEDICATED FULL-SCREEN RESULT VIEW
  if (viewMode === 'result' && selectedResult) {
    return (
      <div className="w-full min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-3">
        <ResultPanel
          selectedItem={selectedResult}
          onResetRound={handleResetToCards}
          onEditItem={onOpenEditModal}
        />
      </div>
    );
  }

  // 2. DEDICATED FULL-SCREEN CARD PICKING STAGE
  if (viewMode === 'card-stage') {
    return (
      <CardStagePage
        filteredItems={filteredItems}
        onBackToSetup={() => setViewMode('setup')}
        onItemRevealed={handleItemRevealed}
        selectedMealTimeLabel={
          selectedMealTime !== 'semua' ? MEAL_TIME_LABELS[selectedMealTime]?.label : undefined
        }
      />
    );
  }

  // 3. EMPTY STATE
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

  // 4. CLEAN SETUP & FILTER VIEW
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-4 relative">
        <div className="hidden sm:block absolute -top-2 left-4 pointer-events-none opacity-50">
          <StarDoodle className="w-5 h-5 text-[#3975EA]" />
        </div>
        <div className="hidden sm:block absolute top-6 right-6 pointer-events-none opacity-50">
          <StarDoodle className="w-6 h-6 text-[#FFC5AD]" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F0FF] text-[#3975EA] text-xs font-bold tracking-wide uppercase mb-2 shadow-xs border border-[#D0E0FF]">
          <MapPin className="w-3.5 h-3.5 text-[#E05A47]" />
          <span>Kuliner Kudus Rekomendasi ⭐ 4.5+</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#183153] tracking-tight leading-tight mb-1.5">
          Lagi di Kudus, mau makan apa hari ini?
        </h1>

        <p className="text-xs sm:text-sm text-[#183153]/80 font-medium leading-relaxed mb-3">
          Tentukan jam makan & selera kencan, lalu buka halaman acak kartu khusus! 💕
        </p>

        <div className="flex justify-center mt-1 opacity-60">
          <SquiggleDoodle className="w-16 h-2 text-[#FFC5AD]" />
        </div>
      </div>

      {/* Filter Bar with Kudus MealTime, Couple, Category & Budget */}
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

      {/* BIG PROMINENT ACTION BUTTON: Go to Fullscreen Card Stage */}
      <div className="sticky bottom-20 md:bottom-6 z-30 pt-2 pb-1">
        <button
          onClick={() => setViewMode('card-stage')}
          disabled={filteredItems.length === 0}
          className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-3xl font-display font-extrabold text-base sm:text-lg shadow-soft-lg transition-all min-h-[56px] btn-press ${
            filteredItems.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#3975EA] hover:bg-[#285ec4] text-white ring-4 ring-[#E8F0FF]'
          }`}
        >
          <Dices className="w-6 h-6 animate-bounce" />
          <span>Mulai Acak Kartu Kencan! 🎲</span>
          <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-sans font-bold">
            {filteredItems.length} Tempat
          </span>
        </button>
      </div>

      {/* Quick Link to Add Custom Spot */}
      <div className="text-center pt-3">
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3975EA] hover:text-[#285ec4] p-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Tempat Makan Kudus Baru</span>
        </button>
      </div>
    </div>
  );
};
