import React from 'react';
import { Dices, UtensilsCrossed } from 'lucide-react';
import { BowlIcon, SparkleDoodle } from './DoodleDecorations';

interface NavbarProps {
  activeTab: 'random' | 'collection';
  onTabChange: (tab: 'random' | 'collection') => void;
  totalItems: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, totalItems }) => {
  return (
    <header className="w-full bg-[#FFF9F4]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#FFE8DD] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onTabChange('random')}
          className="flex items-center gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] rounded-2xl p-1"
          aria-label="Kembali ke beranda Makan Mana?"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#3975EA] text-white flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
            <BowlIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-fredoka text-2xl font-bold text-[#183153] tracking-tight">
                Makan Mana?
              </span>
              <SparkleDoodle className="w-4 h-4 text-[#FFC5AD] animate-pulse" />
            </div>
            <span className="text-xs font-semibold text-[#3975EA] tracking-wide block -mt-1">
              Pemberi Solusi Anti Laper
            </span>
          </div>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-2 bg-[#E8F0FF]/70 p-1.5 rounded-full border border-[#D0E0FF]">
          <button
            onClick={() => onTabChange('random')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
              activeTab === 'random'
                ? 'bg-[#3975EA] text-white shadow-md'
                : 'text-[#183153] hover:text-[#3975EA] hover:bg-white/60'
            }`}
          >
            <Dices className="w-4 h-4" />
            <span>Acak Kartu</span>
          </button>

          <button
            onClick={() => onTabChange('collection')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
              activeTab === 'collection'
                ? 'bg-[#3975EA] text-white shadow-md'
                : 'text-[#183153] hover:text-[#3975EA] hover:bg-white/60'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Koleksi Kuliner</span>
            {totalItems > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                  activeTab === 'collection'
                    ? 'bg-white text-[#3975EA]'
                    : 'bg-[#3975EA] text-white'
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
