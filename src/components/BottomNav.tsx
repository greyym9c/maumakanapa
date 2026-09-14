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
      className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-sm z-40 bg-white/95 backdrop-blur-2xl border border-[#FFE8DD] rounded-3xl shadow-[0_12px_36px_rgba(20,37,61,0.12)] p-1.5 safe-area-bottom"
    >
      <div className="flex items-center justify-around gap-1.5">
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && 'vibrate' in navigator) {
              try { navigator.vibrate(10); } catch {}
            }
            onTabChange('random');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl min-h-[48px] font-display font-extrabold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] ${
            activeTab === 'random'
              ? 'bg-gradient-to-r from-[#3975EA] to-[#2558be] text-white shadow-[0_6px_16px_rgba(57,117,234,0.35)] scale-102'
              : 'text-[#14253D] hover:bg-[#E8F0FF]/50 active:scale-98'
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
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl min-h-[48px] font-display font-extrabold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA] relative ${
            activeTab === 'collection'
              ? 'bg-gradient-to-r from-[#3975EA] to-[#2558be] text-white shadow-[0_6px_16px_rgba(57,117,234,0.35)] scale-102'
              : 'text-[#14253D] hover:bg-[#E8F0FF]/50 active:scale-98'
          }`}
        >
          <BookHeart className="w-5 h-5 text-[#E05A47]" />
          <span>Kuliner Kita</span>
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
      </div>
    </nav>
  );
};
