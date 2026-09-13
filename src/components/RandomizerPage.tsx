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

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative">
        <div className="hidden sm:block absolute -top-2 left-4 pointer-events-none opacity-50">
          <StarDoodle className="w-5 h-5 text-[#3975EA]" />
        </div>
        <div className="hidden sm:block absolute top-6 right-6 pointer-events-none opacity-50">
          <StarDoodle className="w-6 h-6 text-[#FFC5AD]" />
        </div>

        {/* Couple Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE8DD] text-[#E05A47] text-xs font-bold tracking-wide uppercase mb-3 shadow-xs border border-[#FFC5AD]/80">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Spesial Untuk Heru & Nadine</span>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#183153] tracking-tight leading-tight mb-3">
          Hari ini kita makan apa, sayang?
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#183153]/80 font-medium leading-relaxed mb-6">
          Biar nggak ada yang pusing atau saling bilang <span className="font-handwriting text-xl text-[#E05A47] font-bold">"terserah kamu"</span> lagi. Tinggal acak kartunya, terus gas berangkat!
        </p>

        {/* Secondary action shortcut */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#3975EA] hover:text-[#285ec4] bg-white hover:bg-[#E8F0FF] px-4 py-2.5 rounded-full border border-[#FFE8DD] shadow-xs transition-colors min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah tempat kencan baru</span>
          </button>
        </div>

        {/* Squiggle Accent */}
        <div className="flex justify-center mt-3 opacity-60">
          <SquiggleDoodle className="w-20 h-3 text-[#FFC5AD]" />
        </div>
      </div>

      {/* If collection has 0 items overall, show EmptyState */}
      {items.length === 0 ? (
        <EmptyState
          onAddFood={onOpenAddModal}
          onLoadSampleData={onLoadSampleData}
        />
      ) : (
        <>
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

          {/* Card Deck */}
          <CardDeck
            filteredItems={filteredItems}
            onOpenAddModal={onOpenAddModal}
            onItemRevealed={(item) => setSelectedResult(item)}
            selectedItem={selectedResult}
            onResetRound={handleResetRound}
          />

          {/* Result Panel */}
          {selectedResult && (
            <ResultPanel
              selectedItem={selectedResult}
              onResetRound={handleResetRound}
              onEditItem={onOpenEditModal}
            />
          )}
        </>
      )}
    </div>
  );
};
