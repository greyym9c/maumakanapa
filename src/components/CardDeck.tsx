import React, { useState, useEffect } from 'react';
import { FoodItem } from '../types/food';
import { FlippableCard } from './FlippableCard';
import { sampleRandomItems } from '../utils/shuffle';
import { Dices, PlusCircle, AlertCircle, Heart } from 'lucide-react';

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

    setTimeout(() => {
      const newlyShuffled = sampleRandomItems(filteredItems, 6);
      setCurrentDeck(newlyShuffled);
      setIsShuffling(false);
      setHasShuffledOnce(true);
    }, 650);
  };

  const handleSelectCard = (item: FoodItem) => {
    if (flippedCardId || isShuffling) return;
    setFlippedCardId(item.id);
    onItemRevealed(item);
  };

  if (filteredItems.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border-2 border-dashed border-[#FFC5AD] shadow-soft my-6 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#FFE8DD] text-[#E05A47] flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="font-display text-xl font-bold text-[#183153] mb-1">
          Belum ada kuliner yang pas nih
        </h3>
        <p className="text-sm text-[#183153]/70 mb-5 font-medium">
          Coba ganti filter kesukaan Heru/Nadine atau tambahkan tempat makan baru ke daftar kalian.
        </p>
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-2 bg-[#3975EA] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-soft btn-press min-h-[44px]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Tempat Makan Baru</span>
        </button>
      </div>
    );
  }

  const getFanRotation = (index: number, total: number) => {
    if (total <= 1) return 0;
    const center = (total - 1) / 2;
    const maxSpreadDeg = total > 4 ? 12 : 8;
    return (index - center) * (maxSpreadDeg / (total - 1 || 1));
  };

  return (
    <section aria-label="Dek Kartu Acak Kencan" className="w-full">
      {/* Top Action & Instructions */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-3">
          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-display font-bold text-base shadow-soft transition-all min-h-[50px] btn-press ${
              isShuffling
                ? 'bg-[#E8F0FF] text-[#3975EA] cursor-wait'
                : 'bg-[#3975EA] hover:bg-[#285ec4] text-white'
            }`}
          >
            <Dices className={`w-5 h-5 ${isShuffling ? 'animate-spin' : ''}`} />
            <span>{isShuffling ? 'Lagi diacak acak...' : 'Acak Menu Kencan! 🎲'}</span>
          </button>
        </div>

        {/* Prompt message */}
        <div className="min-h-[32px] flex items-center justify-center">
          {isShuffling ? (
            <p className="font-handwriting text-xl font-bold text-[#3975EA] animate-pulse">
              Bentar ya, lagi dikocok biar adil tanpa berantem...
            </p>
          ) : flippedCardId ? (
            <p className="font-handwriting text-xl font-bold text-[#E05A47] flex items-center justify-center gap-1.5">
              <Heart className="w-4 h-4 fill-current" />
              Yess! Kartu udah kebuka. Hari ini kita makan ini ya!
            </p>
          ) : hasShuffledOnce || currentDeck.length > 0 ? (
            <p className="font-handwriting text-xl font-bold text-[#183153] bg-[#FFE8DD] px-5 py-1.5 rounded-full inline-block border border-[#FFC5AD]/80 shadow-xs">
              {currentDeck.length === 1
                ? '⭐ Menu andalan satu-satunya! Langsung ketuk kartunya ya.'
                : 'Pilih satu kartu! Dilarang jawab "terserah" lagi ya ❤️'}
            </p>
          ) : null}
        </div>
      </div>

      {/* Cards Area: Desktop Fan vs Mobile 2-col Grid */}
      <div className="w-full">
        {/* Desktop Fan */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-5 sm:gap-6 py-6 px-2 min-h-[410px]">
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

        {/* Mobile 2-col Grid */}
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
