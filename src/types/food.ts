export type FoodCategory =
  | 'nasi'
  | 'mi'
  | 'bakso'
  | 'camilan'
  | 'minuman'
  | 'lainnya';

export type CoupleFavorite = 'heru' | 'nadine' | 'berdua';

export type MealTime = 'pagi' | 'siang' | 'sore' | 'malam' | 'semua';

export interface FoodItem {
  id: string;
  placeName: string;
  menuName: string;
  category: FoodCategory | string;
  price?: number;
  rating?: number; // Bintang 4.0 - 5.0
  bestTime?: MealTime; // Waktu makan yang cocok
  openingHours?: string; // Jam operasional (misal: "06.00 - 11.00 WIB")
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
  mealTime?: MealTime; // 'semua' | 'pagi' | 'siang' | 'sore' | 'malam'
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
  nasi: { label: 'Nasi & Soto', emoji: '🍚', color: '#F59E0B' },
  mi: { label: 'Mi & Bakso', emoji: '🍜', color: '#EF4444' },
  bakso: { label: 'Sate & Daging', emoji: '🍢', color: '#EC4899' },
  camilan: { label: 'Camilan & Roti', emoji: '🥟', color: '#8B5CF6' },
  minuman: { label: 'Kafe & Kopi', emoji: '☕', color: '#06B6D4' },
  lainnya: { label: 'Lainnya', emoji: '✨', color: '#10B981' },
};

export const COUPLE_TAGS: Record<CoupleFavorite, { label: string; emoji: string; badgeColor: string }> = {
  heru: { label: 'Favorit Heru', emoji: '👦', badgeColor: 'bg-[#E8F0FF] text-[#3975EA] border-[#3975EA]/30' },
  nadine: { label: 'Favorit Nadine', emoji: '👧', badgeColor: 'bg-[#FFE8DD] text-[#E05A47] border-[#FFC5AD]' },
  berdua: { label: 'Favorit Berdua', emoji: '💑', badgeColor: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]' },
};

export const MEAL_TIME_LABELS: Record<MealTime, { label: string; emoji: string; timeRange: string }> = {
  semua: { label: 'Semua Waktu', emoji: '🕒', timeRange: 'Kapan saja' },
  pagi: { label: 'Sarapan Pagi', emoji: '🌅', timeRange: '06.00 - 10.00 WIB' },
  siang: { label: 'Makan Siang', emoji: '☀️', timeRange: '11.00 - 15.00 WIB' },
  sore: { label: 'Sore / Ngopi', emoji: '☕', timeRange: '15.00 - 18.30 WIB' },
  malam: { label: 'Makan Malam / Date', emoji: '🌙', timeRange: '18.30 - 23.00 WIB' },
};
