export type FoodCategory =
  | 'nasi'
  | 'mi'
  | 'bakso'
  | 'camilan'
  | 'minuman'
  | 'lainnya';

export interface FoodItem {
  id: string;
  placeName: string;
  menuName: string;
  category: FoodCategory | string;
  price?: number;
  address?: string;
  mapsUrl?: string;
  notes?: string;
  isSample?: boolean;
  createdAt: number;
}

export interface FoodFilter {
  category: string; // 'all' or specific category
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
  minuman: { label: 'Minuman', emoji: '🧋', color: '#06B6D4' },
  lainnya: { label: 'Lainnya', emoji: '✨', color: '#10B981' },
};
