import React, { useState, useMemo } from 'react';
import { FoodItem } from '../types/food';
import { FilterBar } from './FilterBar';
import { CardDeck } from './CardDeck';
import { ResultPanel } from './ResultPanel';
import { EmptyState } from './EmptyState';
import { PlusCircle, Heart } from 'lucide-react';
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
  }, [items, selectedCategory, selectedFavoriteOf, maxPrice]);

  const handleResetRound = () => {
    setSelectedResult(null);
  };

  // If item is chosen, show DEDICATED RESULT PAGE (not a bottom scroll!)
  if (selectedResult) {
    return (
      <div className="w-full min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-4">
        <ResultPanel
          selectedItem={selectedResult}
          onResetRound={handleResetRound}
          onEditItem={onOpenEditModal}
        />
      </div>
    );
  }

  // If 0 items overall, show EmptyState
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

  // Otherwise, render the Deck View (No long scroll!)
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto mb-6 relative">
        <div className="hidden sm:block absolute -top-2 left-4 pointer-events-none opacity-50">
          <StarDoodle className="w-5 h-5 text-[#3975EA]" />
        </div>
        <div className="hidden sm:block absolute top-6 right-6 pointer-events-none opacity-50">
          <StarDoodle className="w-6 h-6 text-[#FFC5AD]" />
        </div>

        {/* Couple Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFE8DD] text-[#E05A47] text-xs font-bold tracking-wide uppercase mb-2.5 shadow-xs border border-[#FFC5AD]/80">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Spesial Untuk Heru & Nadine</span>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#183153] tracking-tight leading-tight mb-2">
          Hari ini kita makan apa, sayang?
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#183153]/80 font-medium leading-relaxed mb-4">
          Biar nggak ada drama saling bilang <span className="font-handwriting text-lg text-[#E05A47] font-bold">"terserah kamu"</span> lagi. Tinggal pilih kartu terus berangkat!
        </p>

        {/* Secondary shortcut button */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#3975EA] hover:text-[#285ec4] bg-white hover:bg-[#E8F0FF] px-3.5 py-2 rounded-full border border-[#FFE8DD] shadow-xs transition-colors min-h-[40px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah tempat kencan</span>
          </button>
        </div>

        {/* Squiggle Accent */}
        <div className="flex justify-center mt-2.5 opacity-60">
          <SquiggleDoodle className="w-16 h-2.5 text-[#FFC5AD]" />
        </div>
      </div>

      {/* Filter Bar with Couple Preferences */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedFavoriteOf={selectedFavoriteOf}
        onSelectFavoriteOf={setSelectedFavoriteOf}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        filteredCount={filteredItems.length}
        totalCount={items.length}
      />

      {/* Card Deck with Snappy Flip */}
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
