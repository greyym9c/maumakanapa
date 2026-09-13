import React, { useState, useEffect } from 'react';
import { FoodItem } from '../types/food';
import { FlippableCard } from './FlippableCard';
import { sampleRandomItems } from '../utils/shuffle';
import { Sparkles, Dices, PlusCircle, AlertCircle } from 'lucide-react';

interface CardDeckProps {
  filteredItems: FoodItem[];
  onOpenAddModal: () => void;
  onItemRevealed: (item: FoodItem) => void;
  selectedItem: FoodItem | null;
  onResetRound: () => void;
}

export const CardDeck: React.FC<CardDeckProps> = ({
  filteredItems,
  onOpenAddModal,
  onItemRevealed,
  selectedItem,
  onResetRound,
}) => {
  const [currentDeck, setCurrentDeck] = useState<FoodItem[]>([]);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [hasShuffledOnce, setHasShuffledOnce] = useState<boolean>(false);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  // When filteredItems change or when initializing, prepare the initial 6 sampled items
  useEffect(() => {
    if (filteredItems.length > 0) {
      const sampled = sampleRandomItems(filteredItems, 6);
      setCurrentDeck(sampled);
      setFlippedCardId(null);
      setHasShuffledOnce(false);
    } else {
      setCurrentDeck([]);
      setFlippedCardId(null);
    }
  }, [filteredItems]);

  // Sync selectedItem if externally reset
  useEffect(() => {
    if (!selectedItem) {
      setFlippedCardId(null);
    } else {
      setFlippedCardId(selectedItem.id);
    }
  }, [selectedItem]);

  const handleShuffle = () => {
    if (isShuffling || filteredItems.length === 0) return;
    setIsShuffling(true);
    setFlippedCardId(null);
    onResetRound();

    // Sound / tactile simulation & shuffle animation duration
    setTimeout(() => {
      const newlyShuffled = sampleRandomItems(filteredItems, 6);
      setCurrentDeck(newlyShuffled);
      setIsShuffling(false);
      setHasShuffledOnce(true);
    }, 650);
  };

  const handleSelectCard = (item: FoodItem) => {
    if (flippedCardId || isShuffling) return; // Prevent multiple flips
    setFlippedCardId(item.id);
    onItemRevealed(item);
  };

  // Case 0 items matching
  if (filteredItems.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border-2 border-dashed border-[#FFC5AD] shadow-soft my-6 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#FFE8DD] text-[#3975EA] flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-8 h-8 text-[#3975EA]" />
        </div>
        <h3 className="font-fredoka text-xl font-bold text-[#183153] mb-1">
          Tidak ada kuliner yang cocok
        </h3>
        <p className="text-sm text-[#183153]/70 mb-5">
          Coba sesuaikan filter kategori atau batas harga di atas, atau tambahkan menu baru sekarang.
        </p>
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-2 bg-[#3975EA] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-soft btn-press min-h-[44px]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Kuliner Baru</span>
        </button>
      </div>
    );
  }

  // Calculate fan rotation degree for desktop
  const getFanRotation = (index: number, total: number) => {
    if (total <= 1) return 0;
    const center = (total - 1) / 2;
    const maxSpreadDeg = total > 4 ? 12 : 8;
    return (index - center) * (maxSpreadDeg / (total - 1 || 1));
  };

  return (
    <section aria-label="Dek Kartu Acak" className="w-full">
      {/* Top Action & Instructions */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-3">
          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-base shadow-soft transition-all min-h-[48px] btn-press ${
              isShuffling
                ? 'bg-[#E8F0FF] text-[#3975EA] cursor-wait'
                : 'bg-[#3975EA] hover:bg-[#2c65cf] text-white'
            }`}
          >
            <Dices className={`w-5 h-5 ${isShuffling ? 'animate-spin' : ''}`} />
            <span>{isShuffling ? 'Mengacak kartu...' : 'Acak dulu!'}</span>
          </button>
        </div>

        {/* Prompt message */}
        <div className="min-h-[28px] flex items-center justify-center">
          {isShuffling ? (
            <p className="text-sm font-semibold text-[#3975EA] animate-pulse">
              Kartu sedang diputar acak dengan Fisher–Yates...
            </p>
          ) : flippedCardId ? (
            <p className="text-sm font-bold text-[#183153] flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FFC5AD]" />
              Kartu sudah terbuka! Lihat rekomendasinya di bawah.
            </p>
          ) : hasShuffledOnce || currentDeck.length > 0 ? (
            <p className="text-sm font-semibold text-[#183153] bg-[#FFE8DD]/60 px-4 py-1.5 rounded-full inline-block border border-[#FFC5AD]/60">
              {currentDeck.length === 1
                ? '⭐ Pilihan satu-satunya yang tak tergantikan! Buka kartunya sekarang.'
                : 'Pilih satu kartu. Jangan overthinking.'}
            </p>
          ) : null}
        </div>
      </div>

      {/* Cards Area: Responsive Desktop Fan vs Mobile 2-col Grid */}
      <div className="w-full">
        {/* Desktop Fan / Grid Container */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-5 sm:gap-6 py-6 px-2 min-h-[400px]">
          {currentDeck.map((item, idx) => (
            <FlippableCard
              key={item.id}
              item={item}
              index={idx}
              isFlipped={flippedCardId === item.id}
              isAnyFlipped={flippedCardId !== null}
              isShuffling={isShuffling}
              onSelect={handleSelectCard}
              rotationDeg={getFanRotation(idx, currentDeck.length)}
            />
          ))}
        </div>

        {/* Mobile 2-column Grid (clean tap area, no horizontal overflow) */}
        <div className="grid md:hidden grid-cols-2 gap-3 sm:gap-4 py-2">
          {currentDeck.map((item, idx) => (
            <div key={item.id} className="flex justify-center w-full">
              <FlippableCard
                item={item}
                index={idx}
                isFlipped={flippedCardId === item.id}
                isAnyFlipped={flippedCardId !== null}
                isShuffling={isShuffling}
                onSelect={handleSelectCard}
                rotationDeg={0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
