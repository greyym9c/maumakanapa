import React from 'react';
import { Dices, BookHeart, Sparkles } from 'lucide-react';
import { BowlIcon } from './DoodleDecorations';

interface NavbarProps {
  activeTab: 'random' | 'collection';
  onTabChange: (tab: 'random' | 'collection') => void;
  totalItems: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, totalItems }) => {
  return (
    <header className="w-full bg-[#FFF9F4]/80 backdrop-blur-xl sticky top-0 z-40 border-b border-[#FFE8DD]/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo: Heru & Nadine */}
        <button
          onClick={() => onTabChange('random')}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] rounded-2xl p-1"
          aria-label="Kembali ke beranda Love Food"
        >
          {/* Glowing icon badge */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3975EA] to-[#2558be] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(57,117,234,0.28)] group-hover:scale-105 transition-transform relative">
            <BowlIcon className="w-6 h-6 text-[#FFE8DD]" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-tr from-[#FF8B66] to-[#FFC5AD] border-2 border-white rounded-full flex items-center justify-center text-[10px] shadow-sm animate-pulse">
              ❤️
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-black text-[#14253D] tracking-tight group-hover:text-[#3975EA] transition-colors">
                Heru & Nadine
              </span>
              <span className="text-[11px] font-bold bg-gradient-to-r from-[#FFE8DD] to-[#FFD8C9] text-[#D44835] px-2.5 py-0.5 rounded-full border border-[#FFC5AD]/60 shadow-xs hidden sm:inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Love Food</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3975EA] bg-[#E8F0FF] px-1.5 py-0.2 rounded-md sm:hidden">
                Kudus
              </span>
              <span className="font-handwriting text-base font-bold text-[#D44835] tracking-wide block -mt-0.5">
                "Pemberi solusi anti terserah di Kudus" ✨
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/90 p-1.5 rounded-full border border-[#FFE8DD] shadow-[0_4px_20px_rgba(20,37,61,0.04)]">
          <button
            onClick={() => onTabChange('random')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-display font-bold transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
              activeTab === 'random'
                ? 'bg-gradient-to-r from-[#3975EA] to-[#2b65d6] text-white shadow-[0_4px_14px_rgba(57,117,234,0.35)] scale-102'
                : 'text-[#14253D] hover:text-[#3975EA] hover:bg-[#E8F0FF]/60'
            }`}
          >
            <Dices className="w-4 h-4" />
            <span>Acak Kartu</span>
          </button>

          <button
            onClick={() => onTabChange('collection')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-display font-bold transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
              activeTab === 'collection'
                ? 'bg-gradient-to-r from-[#3975EA] to-[#2b65d6] text-white shadow-[0_4px_14px_rgba(57,117,234,0.35)] scale-102'
                : 'text-[#14253D] hover:text-[#3975EA] hover:bg-[#E8F0FF]/60'
            }`}
          >
            <BookHeart className="w-4 h-4 text-[#D44835]" />
            <span>30 Kuliner Kudus</span>
            {totalItems > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                  activeTab === 'collection'
                    ? 'bg-white text-[#3975EA]'
                    : 'bg-[#FFE8DD] text-[#14253D]'
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
