import { FoodItem } from '../types/food';

/**
 * Fisher–Yates Shuffle Algorithm (Knuth Shuffle)
 * Generates an unbiased, uniformly distributed permutation of the input array.
 */
export function fisherYatesShuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Sample up to maxCount items randomly without replacement using Fisher-Yates.
 * If list is smaller than maxCount, returns all items shuffled.
 */
export function sampleRandomItems(items: FoodItem[], maxCount = 6): FoodItem[] {
  if (items.length <= maxCount) {
    return fisherYatesShuffle(items);
  }
  const shuffled = fisherYatesShuffle(items);
  return shuffled.slice(0, maxCount);
}
