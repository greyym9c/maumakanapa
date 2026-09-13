import React from 'react';
import { Dices, Heart, BookHeart } from 'lucide-react';
import { BowlIcon } from './DoodleDecorations';

interface NavbarProps {
  activeTab: 'random' | 'collection';
  onTabChange: (tab: 'random' | 'collection') => void;
  totalItems: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, totalItems }) => {
  return (
    <header className="w-full bg-[#FFF9F4]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#FFE8DD] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 py-3 flex items-center justify-between">
        {/* Brand / Logo: Heru & Nadine */}
        <button
          onClick={() => onTabChange('random')}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] rounded-2xl p-1"
          aria-label="Kembali ke beranda Heru & Nadine Makan Mana?"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#3975EA] text-white flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform relative">
            <BowlIcon className="w-6 h-6" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FFE8DD] border border-[#FFC5AD] rounded-full flex items-center justify-center text-xs">
              ❤️
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-2xl font-extrabold text-[#183153] tracking-tight">
                Heru & Nadine
              </span>
              <span className="text-xs bg-[#FFE8DD] text-[#E05A47] font-bold px-2 py-0.5 rounded-full border border-[#FFC5AD]/70 hidden sm:inline-block">
                Makan Mana? 🥣
              </span>
            </div>
            <span className="font-handwriting text-base font-bold text-[#E05A47] tracking-wide block -mt-1">
              "Anti drama terserah mau makan apa" ✨
            </span>
          </div>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-2 bg-white/80 p-1.5 rounded-full border border-[#FFE8DD] shadow-xs">
          <button
            onClick={() => onTabChange('random')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
              activeTab === 'random'
                ? 'bg-[#3975EA] text-white shadow-md'
                : 'text-[#183153] hover:text-[#3975EA] hover:bg-[#E8F0FF]/50'
            }`}
          >
            <Dices className="w-4 h-4" />
            <span>Acak Kartu</span>
          </button>

          <button
            onClick={() => onTabChange('collection')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
              activeTab === 'collection'
                ? 'bg-[#3975EA] text-white shadow-md'
                : 'text-[#183153] hover:text-[#3975EA] hover:bg-[#E8F0FF]/50'
            }`}
          >
            <BookHeart className="w-4 h-4 text-[#E05A47]" />
            <span>Daftar Kuliner Kita</span>
            {totalItems > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                  activeTab === 'collection'
                    ? 'bg-white text-[#3975EA]'
                    : 'bg-[#FFE8DD] text-[#183153]'
                }`}
              >
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
