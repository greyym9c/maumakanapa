import { FoodItem } from '../types/food';

const STORAGE_KEY = 'makan_mana_items_v1';

export function loadFoodItems(): { items: FoodItem[]; isCorrupted: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { items: [], isCorrupted: false };
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Validate items have minimal required fields
      const validItems = parsed.filter(
        (item) =>
          item &&
          typeof item === 'object' &&
          typeof item.id === 'string' &&
          typeof item.placeName === 'string' &&
          typeof item.menuName === 'string'
      );
      return { items: validItems, isCorrupted: validItems.length !== parsed.length };
    }
    return { items: [], isCorrupted: true };
  } catch (error) {
    console.error('Error parsing food items from localStorage:', error);
    return { items: [], isCorrupted: true };
  }
}

export function saveFoodItems(items: FoodItem[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch (error) {
    console.error('Failed to save food items to localStorage:', error);
    return false;
  }
}

export function clearFoodItems(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear food items:', error);
  }
}
