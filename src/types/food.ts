export type FoodCategory =
  | 'nasi'
  | 'mi'
  | 'bakso'
  | 'camilan'
  | 'minuman'
  | 'lainnya';

export type CoupleFavorite = 'heru' | 'nadine' | 'berdua';

export interface FoodItem {
  id: string;
  placeName: string;
  menuName: string;
  category: FoodCategory | string;
  price?: number;
  address?: string;
  mapsUrl?: string;
  notes?: string;
  favoriteOf?: CoupleFavorite;
  isSample?: boolean;
  createdAt: number;
}

export interface FoodFilter {
  category: string; // 'all' or specific category
  favoriteOf?: string; // 'all' | 'heru' | 'nadine' | 'berdua'
  maxPrice: number | null; // null means no limit
  searchQuery: string;
}

export interface ToastInfo {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export const CATEGORY_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  all: { label: 'Semua', emoji: '🍽️', color: '#3975EA' },
  nasi: { label: 'Nasi', emoji: '🍚', color: '#F59E0B' },
  mi: { label: 'Mi & Pasta', emoji: '🍜', color: '#EF4444' },
  bakso: { label: 'Bakso & Soto', emoji: '🥣', color: '#EC4899' },
  camilan: { label: 'Camilan', emoji: '🥟', color: '#8B5CF6' },
  minuman: { label: 'Minuman & Cafe', emoji: '🧋', color: '#06B6D4' },
  lainnya: { label: 'Lainnya', emoji: '✨', color: '#10B981' },
};

export const COUPLE_TAGS: Record<CoupleFavorite, { label: string; emoji: string; badgeColor: string }> = {
  heru: { label: 'Favorit Heru', emoji: '👦', badgeColor: 'bg-[#E8F0FF] text-[#3975EA] border-[#3975EA]/30' },
  nadine: { label: 'Favorit Nadine', emoji: '👧', badgeColor: 'bg-[#FFE8DD] text-[#E05A47] border-[#FFC5AD]' },
  berdua: { label: 'Favorit Berdua', emoji: '💑', badgeColor: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]' },
};
