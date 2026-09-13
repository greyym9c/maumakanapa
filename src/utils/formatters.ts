/**
 * Formats a number to Indonesian Rupiah (e.g. 25000 -> "Rp 25.000")
 */
export function formatRupiah(amount?: number | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Harga belum ada';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Validates that a string is a valid HTTP or HTTPS URL
 */
export function isValidHttpUrl(stringUrl?: string): boolean {
  if (!stringUrl || !stringUrl.trim()) return false;
  try {
    const url = new URL(stringUrl.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
