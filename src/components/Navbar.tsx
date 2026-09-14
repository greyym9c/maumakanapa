import React from 'react';
import { Dices, BookHeart, Sparkles, Lock } from 'lucide-react';
import { BowlIcon } from './DoodleDecorations';

interface NavbarProps {
  activeTab: 'random' | 'collection';
  onTabChange: (tab: 'random' | 'collection') => void;
  totalItems: number;
  onLock?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, totalItems, onLock }) => {
  return (
    <header className="w-full bg-[#FFF9F4]/90 backdrop-blur-xl sticky top-0 z-40 border-b border-[#FFE8DD]/80 shadow-[0_4px_20px_rgba(20,37,61,0.03)] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo: Heru & Nadine */}
        <button
          onClick={() => onTabChange('random')}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] rounded-2xl p-1 -ml-1 transition-transform active:scale-98"
          aria-label="Kembali ke beranda Love Food"
        >
          {/* Glowing icon badge */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#3975EA] to-[#2558be] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(57,117,234,0.28)] group-hover:scale-105 transition-transform relative shrink-0">
            <BowlIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFE8DD]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-tr from-[#FF8B66] to-[#FFC5AD] border-2 border-white rounded-full flex items-center justify-center text-[9px] sm:text-[10px] shadow-sm animate-pulse">
              ❤️
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl sm:text-2xl font-black text-[#14253D] tracking-tight group-hover:text-[#3975EA] transition-colors leading-none">
                Heru & Nadine
              </span>
              <span className="text-[10px] sm:text-[11px] font-extrabold bg-gradient-to-r from-[#FFE8DD] to-[#FFD8C9] text-[#D44835] px-2.5 py-0.5 rounded-full border border-[#FFC5AD]/60 shadow-xs hidden sm:inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Love Food</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3975EA] bg-[#E8F0FF] px-1.5 py-0.5 rounded-md sm:hidden shrink-0">
                Couple
              </span>
              <span className="font-handwriting text-sm sm:text-base font-bold text-[#D44835] tracking-wide block line-clamp-1">
                "Pemberi solusi anti terserah kita berdua" ✨
              </span>
            </div>
          </div>
        </button>

        {/* Actions & Navigation Tabs */}
        <div className="flex items-center gap-2">
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
              <span>30 Kuliner Pilihan</span>
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

          {/* Quick Lock Button */}
          {onLock && (
            <button
              onClick={onLock}
              title="Kunci Aplikasi"
              aria-label="Kunci Aplikasi"
              className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/90 border border-[#FFE8DD] text-[#14253D]/70 hover:text-[#D44835] hover:bg-[#FFE8DD]/60 shadow-xs transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
