import React from 'react';
import { Dices, BookHeart } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'random' | 'collection';
  onTabChange: (tab: 'random' | 'collection') => void;
  totalItems: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, totalItems }) => {
  return (
    <nav
      aria-label="Navigasi Bawah Love Food"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/95 backdrop-blur-xl border border-[#FFE8DD] rounded-3xl shadow-soft-lg px-2.5 py-2 safe-area-bottom"
    >
      <div className="flex items-center justify-around gap-2">
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && 'vibrate' in navigator) {
              try { navigator.vibrate(10); } catch {}
            }
            onTabChange('random');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl min-h-[48px] font-display font-bold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
            activeTab === 'random'
              ? 'bg-[#3975EA] text-white shadow-sm scale-101'
              : 'text-[#183153] hover:bg-[#E8F0FF]/60'
          }`}
        >
          <Dices className="w-5 h-5" />
          <span>Acak Kartu</span>
        </button>

        <button
          onClick={() => {
            if (typeof window !== 'undefined' && 'vibrate' in navigator) {
              try { navigator.vibrate(10); } catch {}
            }
            onTabChange('collection');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl min-h-[48px] font-display font-bold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] relative ${
            activeTab === 'collection'
              ? 'bg-[#3975EA] text-white shadow-sm scale-101'
              : 'text-[#183153] hover:bg-[#E8F0FF]/60'
          }`}
        >
          <BookHeart className="w-5 h-5 text-[#E05A47]" />
          <span>Kuliner Kita</span>
          {totalItems > 0 && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                activeTab === 'collection'
                  ? 'bg-[#FFE8DD] text-[#183153]'
                  : 'bg-[#3975EA] text-white'
              }`}
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
