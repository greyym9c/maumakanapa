import React, { useState, useMemo } from 'react';
import { FoodItem } from '../types/food';
import { FilterBar } from './FilterBar';
import { CardDeck } from './CardDeck';
import { ResultPanel } from './ResultPanel';
import { EmptyState } from './EmptyState';
import { PlusCircle, Sparkles } from 'lucide-react';
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
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedResult, setSelectedResult] = useState<FoodItem | null>(null);

  // Filter items according to category and maxPrice
  // "Item yang tidak memiliki harga tidak boleh masuk ketika filter batas harga sedang aktif."
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Price match
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
  }, [items, selectedCategory, maxPrice]);

  const handleResetRound = () => {
    setSelectedResult(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative">
        {/* Decorative Doodles */}
        <div className="hidden sm:block absolute -top-2 left-4 pointer-events-none opacity-50">
          <StarDoodle className="w-5 h-5 text-[#3975EA]" />
        </div>
        <div className="hidden sm:block absolute top-6 right-6 pointer-events-none opacity-50">
          <StarDoodle className="w-6 h-6 text-[#FFC5AD]" />
        </div>

        {/* Small Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E8F0FF] text-[#3975EA] text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Buat yang suka bingung makan.</span>
        </div>

        {/* Main Title */}
        <h1 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-[#183153] tracking-tight leading-tight mb-3">
          Lagi laper, tapi bingung?
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#183153]/75 font-medium leading-relaxed mb-6">
          Isi pilihan kulinermu, acak kartunya, terus biarkan satu pilihan jadi menu hari ini.
        </p>

        {/* Secondary action shortcut */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#3975EA] hover:text-[#285ec4] bg-white hover:bg-[#E8F0FF] px-4 py-2.5 rounded-full border border-[#FFE8DD] shadow-xs transition-colors min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah kuliner</span>
          </button>
        </div>

        {/* Squiggle Accent */}
        <div className="flex justify-center mt-3 opacity-60">
          <SquiggleDoodle className="w-20 h-3 text-[#FFC5AD]" />
        </div>
      </div>

      {/* If collection has 0 items overall, show EmptyState directly */}
      {items.length === 0 ? (
        <EmptyState
          onAddFood={onOpenAddModal}
          onLoadSampleData={onLoadSampleData}
        />
      ) : (
        <>
          {/* Filter Bar */}
          <FilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            filteredCount={filteredItems.length}
            totalCount={items.length}
          />

          {/* Card Deck with Fisher-Yates Shuffle & 3D Flip */}
          <CardDeck
            filteredItems={filteredItems}
            onOpenAddModal={onOpenAddModal}
            onItemRevealed={(item) => setSelectedResult(item)}
            selectedItem={selectedResult}
            onResetRound={handleResetRound}
          />

          {/* Result Panel appears when a card is selected */}
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
