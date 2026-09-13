import React, { useState, useEffect } from 'react';
import { FoodItem } from '../types/food';
import { FlippableCard } from './FlippableCard';
import { sampleRandomItems } from '../utils/shuffle';
import { Dices, ArrowLeft, Heart, Sparkles, AlertCircle } from 'lucide-react';

interface CardStagePageProps {
  filteredItems: FoodItem[];
  onBackToSetup: () => void;
  onItemRevealed: (item: FoodItem) => void;
  selectedMealTimeLabel?: string;
}

export const CardStagePage: React.FC<CardStagePageProps> = ({
  filteredItems,
  onBackToSetup,
  onItemRevealed,
  selectedMealTimeLabel,
}) => {
  const [currentDeck, setCurrentDeck] = useState<FoodItem[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (filteredItems.length > 0) {
      const sampled = sampleRandomItems(filteredItems, 6);
      setCurrentDeck(sampled);
      setFlippedCardId(null);
    }
  }, [filteredItems]);

  const handleShuffleAgain = () => {
    if (isShuffling || filteredItems.length === 0) return;
    setIsShuffling(true);
    setFlippedCardId(null);

    setTimeout(() => {
      const newlyShuffled = sampleRandomItems(filteredItems, 6);
      setCurrentDeck(newlyShuffled);
      setIsShuffling(false);
    }, 380);
  };

  const handleSelectCard = (item: FoodItem) => {
    if (flippedCardId || isShuffling) return;
    setFlippedCardId(item.id);

    setTimeout(() => {
      onItemRevealed(item);
    }, 280);
  };

  if (filteredItems.length === 0) {
    return (
      <div className="w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#FFE8DD] text-[#E05A47] flex items-center justify-center mx-auto mb-3 shadow-xs">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="font-display text-xl font-extrabold text-[#14253D] mb-1">
          Tidak Ada Kuliner Kudus yang Cocok
        </h2>
        <p className="text-xs sm:text-sm text-[#14253D]/70 mb-5 max-w-sm font-medium">
          Filter yang kamu pilih terlalu spesifik. Coba ubah jam makan atau budget kencanmu.
        </p>
        <button
          onClick={onBackToSetup}
          className="inline-flex items-center gap-2 bg-[#3975EA] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-soft btn-press"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali Atur Filter</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex flex-col justify-between max-w-4xl mx-auto px-3 sm:px-6 py-2 sm:py-4 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2 py-2 mb-2 border-b border-[#FFE8DD]/70">
        <button
          onClick={onBackToSetup}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-bold text-[#14253D] hover:text-[#3975EA] bg-white/90 hover:bg-[#FFE8DD]/50 px-3.5 py-2 rounded-full border border-[#FFE8DD] shadow-xs transition-all min-h-[38px] active:scale-97"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Atur Filter</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE8DD]/80 border border-[#FFC5AD]/60 text-xs font-bold text-[#D44835] shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
          <span className="font-display">Heru & Nadine di Kudus</span>
        </div>

        <button
          onClick={handleShuffleAgain}
          disabled={isShuffling}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-bold text-white bg-gradient-to-r from-[#3975EA] to-[#2558be] hover:opacity-95 px-3.5 py-2 rounded-full shadow-[0_4px_12px_rgba(57,117,234,0.3)] transition-all min-h-[38px] btn-press"
        >
          <Dices className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
          <span>{isShuffling ? 'Mengacak...' : 'Acak Ulang'}</span>
        </button>
      </div>

      {/* Center Prompt */}
      <div className="text-center my-1.5">
        <p className="font-handwriting text-xl sm:text-2xl font-bold text-[#14253D] inline-flex items-center gap-1.5 bg-gradient-to-r from-[#FFE8DD] to-[#FFD8C9] px-5 py-1.5 rounded-full border border-[#FFC5AD] shadow-[0_4px_14px_rgba(255,139,102,0.15)] animate-float">
          <Sparkles className="w-4 h-4 text-[#D44835]" />
          <span>Pilih satu kartu! Jangan overthinking ya ❤️</span>
        </p>
        {selectedMealTimeLabel && (
          <p className="text-[11px] font-extrabold text-[#3975EA] mt-1.5">
            Waktu: {selectedMealTimeLabel} • Tersedia {filteredItems.length} pilihan di Kudus
          </p>
        )}
      </div>

      {/* Dedicated Card Deck Area (Clean Mobile 2-col, Desktop Fan) */}
      <div className="flex-1 flex items-center justify-center my-auto py-3">
        {/* Desktop Fan */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-5 sm:gap-6 py-4">
          {currentDeck.map((item, idx) => (
            <FlippableCard
              key={item.id}
              item={item}
              index={idx}
              isFlipped={flippedCardId === item.id}
              isAnyFlipped={flippedCardId !== null}
              isShuffling={isShuffling}
              onSelect={handleSelectCard}
              rotationDeg={(idx - (currentDeck.length - 1) / 2) * 5}
            />
          ))}
        </div>

        {/* Mobile 2-column Grid: perfectly sized, comfortable tap targets */}
        <div className="grid md:hidden grid-cols-2 gap-2.5 sm:gap-3.5 w-full max-w-sm mx-auto">
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

      {/* Bottom Hint */}
      <div className="text-center py-2">
        <p className="text-[11px] text-[#14253D]/55 font-medium">
          ✨ Ketuk kartu pilihanmu untuk langsung melihat rekomendasi menu hari ini.
        </p>
      </div>
    </div>
  );
};
