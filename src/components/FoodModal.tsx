import React, { useState, useEffect, useRef } from 'react';
import { FoodItem, FoodCategory, CoupleFavorite, MealTime, CATEGORY_LABELS, COUPLE_TAGS, MEAL_TIME_LABELS } from '../types/food';
import { isValidHttpUrl } from '../utils/formatters';
import { X, Save, AlertCircle, Heart, Star, Clock } from 'lucide-react';
import { BowlIcon } from './DoodleDecorations';

interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (food: Omit<FoodItem, 'id' | 'createdAt'>, id?: string) => void;
  initialItem?: FoodItem | null;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem,
}) => {
  const [placeName, setPlaceName] = useState('');
  const [menuName, setMenuName] = useState('');
  const [category, setCategory] = useState<FoodCategory>('nasi');
  const [favoriteOf, setFavoriteOf] = useState<CoupleFavorite>('berdua');
  const [bestTime, setBestTime] = useState<MealTime>('siang');
  const [rating, setRating] = useState<string>('4.7');
  const [openingHours, setOpeningHours] = useState('');
  const [price, setPrice] = useState<string>('');
  const [address, setAddress] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<{
    placeName?: string;
    menuName?: string;
    price?: string;
    rating?: string;
    mapsUrl?: string;
  }>({});

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialItem) {
        setPlaceName(initialItem.placeName);
        setMenuName(initialItem.menuName);
        setCategory((initialItem.category as FoodCategory) || 'nasi');
        setFavoriteOf(initialItem.favoriteOf || 'berdua');
        setBestTime(initialItem.bestTime || 'siang');
        setRating(initialItem.rating !== undefined ? String(initialItem.rating) : '4.7');
        setOpeningHours(initialItem.openingHours || '');
        setPrice(initialItem.price !== undefined ? String(initialItem.price) : '');
        setAddress(initialItem.address || '');
        setMapsUrl(initialItem.mapsUrl || '');
        setNotes(initialItem.notes || '');
      } else {
        setPlaceName('');
        setMenuName('');
        setCategory('nasi');
        setFavoriteOf('berdua');
        setBestTime('siang');
        setRating('4.7');
        setOpeningHours('');
        setPrice('');
        setAddress('');
        setMapsUrl('');
        setNotes('');
      }
      setErrors({});
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!placeName.trim()) {
      newErrors.placeName = 'Nama tempat makan wajib diisi ya!';
    }

    if (!menuName.trim()) {
      newErrors.menuName = 'Nama menu makanan wajib diisi ya!';
    }

    if (price.trim() !== '') {
      const numPrice = Number(price);
      if (isNaN(numPrice) || numPrice < 0) {
        newErrors.price = 'Harga harus berupa angka dan tidak boleh negatif.';
      }
    }

    if (rating.trim() !== '') {
      const numRating = Number(rating);
      if (isNaN(numRating) || numRating < 1 || numRating > 5) {
        newErrors.rating = 'Rating harus antara 1.0 sampai 5.0 bintang.';
      }
    }

    if (mapsUrl.trim() !== '') {
      if (!isValidHttpUrl(mapsUrl)) {
        newErrors.mapsUrl = 'Tautan Google Maps harus diawali dengan http:// atau https://';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave(
      {
        placeName: placeName.trim(),
        menuName: menuName.trim(),
        category,
        favoriteOf,
        bestTime,
        rating: rating.trim() !== '' ? Number(Number(rating).toFixed(1)) : 4.6,
        openingHours: openingHours.trim() || undefined,
        price: price.trim() !== '' ? Math.round(Number(price)) : undefined,
        address: address.trim() || undefined,
        mapsUrl: mapsUrl.trim() || undefined,
        notes: notes.trim() || undefined,
        isSample: initialItem?.isSample,
      },
      initialItem?.id
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-xs p-0 md:p-4"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full md:max-w-xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl border border-[#FFE8DD] flex flex-col max-h-[92vh] z-10 animate-in slide-in-from-bottom md:zoom-in-95 duration-200">
        {/* Mobile drag handle */}
        <div className="w-12 h-1.5 bg-gray-300/80 rounded-full mx-auto mt-2.5 -mb-1 md:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#FFE8DD] bg-[#FFF9F4] rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3975EA] to-[#2558be] text-white flex items-center justify-center shadow-xs shrink-0">
              <BowlIcon className="w-5 h-5 text-[#FFE8DD]" />
            </div>
            <div>
              <h2 id="modal-title" className="font-display text-lg sm:text-xl font-black text-[#183153]">
                {initialItem ? 'Edit Kuliner' : 'Tambah Kuliner Baru'}
              </h2>
              <p className="text-xs text-[#183153]/70 font-medium">
                Daftar kencan kuliner Heru & Nadine 💕
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-black/5 flex items-center justify-center text-[#183153] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
            aria-label="Tutup form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {/* Seleranya Siapa & Waktu Cocok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1.5 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#E05A47] fill-current" />
                Seleranya Siapa:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['heru', 'nadine', 'berdua'] as CoupleFavorite[]).map((fav) => {
                  const info = COUPLE_TAGS[fav];
                  const isSelected = favoriteOf === fav;
                  return (
                    <button
                      type="button"
                      key={fav}
                      onClick={() => setFavoriteOf(fav)}
                      className={`flex items-center justify-center gap-1 p-2 rounded-xl text-xs font-bold transition-all min-h-[40px] border ${
                        isSelected
                          ? 'bg-[#183153] text-white border-[#183153]'
                          : 'bg-[#FFF9F4] text-[#183153] border-[#FFE8DD]'
                      }`}
                    >
                      <span>{info.emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#3975EA]" />
                Waktu Kencan Cocok:
              </label>
              <select
                value={bestTime}
                onChange={(e) => setBestTime(e.target.value as MealTime)}
                className="w-full px-3 py-2 bg-[#FFF9F4] border border-[#FFE8DD] rounded-xl text-xs font-bold text-[#183153] min-h-[40px] focus:outline-none focus:ring-2 focus:ring-[#3975EA]"
              >
                <option value="pagi">🌅 Sarapan Pagi (06.00 - 10.00)</option>
                <option value="siang">☀️ Makan Siang (11.00 - 15.00)</option>
                <option value="sore">☕ Sore / Ngopi (15.00 - 18.30)</option>
                <option value="malam">🌙 Makan Malam / Date (18.30 - 23.00)</option>
                <option value="semua">🕒 Bebas Kapan Saja</option>
              </select>
            </div>
          </div>

          {/* Tempat Makan (Wajib) */}
          <div>
            <label
              htmlFor="placeName"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1"
            >
              Nama Tempat / Warung Makan <span className="text-red-500">*</span>
            </label>
            <input
              ref={firstInputRef}
              id="placeName"
              type="text"
              required
              placeholder="Contoh: Soto Pak Denuh, Garang Asem Sari Rasa..."
              value={placeName}
              onChange={(e) => {
                setPlaceName(e.target.value);
                if (errors.placeName) setErrors({ ...errors, placeName: undefined });
              }}
              className={`w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F4] border text-sm text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[44px] ${
                errors.placeName ? 'border-red-400 bg-red-50/50' : 'border-[#FFE8DD]'
              }`}
            />
            {errors.placeName && (
              <p className="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.placeName}</span>
              </p>
            )}
          </div>

          {/* Nama Menu (Wajib) */}
          <div>
            <label
              htmlFor="menuName"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1"
            >
              Nama Menu Spesial <span className="text-red-500">*</span>
            </label>
            <input
              id="menuName"
              type="text"
              required
              placeholder="Contoh: Lentog Tanjung Komplit, Sate Kerbau Serundeng..."
              value={menuName}
              onChange={(e) => {
                setMenuName(e.target.value);
                if (errors.menuName) setErrors({ ...errors, menuName: undefined });
              }}
              className={`w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F4] border text-sm text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[44px] ${
                errors.menuName ? 'border-red-400 bg-red-50/50' : 'border-[#FFE8DD]'
              }`}
            />
            {errors.menuName && (
              <p className="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.menuName}</span>
              </p>
            )}
          </div>

          {/* Rating Bintang & Jam Buka */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="rating"
                className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1 flex items-center gap-1"
              >
                <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
                Rating (1.0 - 5.0)
              </label>
              <input
                id="rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                placeholder="4.7"
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                  if (errors.rating) setErrors({ ...errors, rating: undefined });
                }}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F4] border border-[#FFE8DD] text-sm font-bold text-[#183153] focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[44px]"
              />
            </div>

            <div>
              <label
                htmlFor="openingHours"
                className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1 flex items-center gap-1"
              >
                <Clock className="w-3.5 h-3.5 text-[#3975EA]" />
                Jam Operasional
              </label>
              <input
                id="openingHours"
                type="text"
                placeholder="07.00 - 21.00 WIB"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F4] border border-[#FFE8DD] text-sm text-[#183153] focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[44px]"
              />
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1">
              Kategori Kuliner
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['nasi', 'mi', 'bakso', 'camilan', 'minuman', 'lainnya'] as FoodCategory[]).map(
                (cat) => {
                  const info = CATEGORY_LABELS[cat];
                  const isSelected = category === cat;
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold transition-all min-h-[38px] border ${
                        isSelected
                          ? 'bg-[#3975EA] text-white border-[#3975EA] shadow-xs'
                          : 'bg-[#FFF9F4] text-[#183153] border-[#FFE8DD]'
                      }`}
                    >
                      <span>{info.emoji}</span>
                      <span className="truncate">{info.label}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Perkiraan Harga */}
          <div>
            <label
              htmlFor="price"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1"
            >
              Perkiraan Harga (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#183153]/50">
                Rp
              </span>
              <input
                id="price"
                type="number"
                min="0"
                step="1000"
                placeholder="25000"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errors.price) setErrors({ ...errors, price: undefined });
                }}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#FFF9F4] border border-[#FFE8DD] text-sm text-[#183153] focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[44px]"
              />
            </div>
          </div>

          {/* Alamat Lengkap */}
          <div>
            <label
              htmlFor="address"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1"
            >
              Alamat Lengkap / Patokan
            </label>
            <input
              id="address"
              type="text"
              placeholder="Contoh: Jl. Agil Kusumadya, Tanjung Karang, Simpang Tujuh..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F4] border border-[#FFE8DD] text-sm text-[#183153] focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[44px]"
            />
          </div>

          {/* Tautan Google Maps */}
          <div>
            <label
              htmlFor="mapsUrl"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1"
            >
              Tautan Google Maps
            </label>
            <input
              id="mapsUrl"
              type="url"
              placeholder="https://maps.google.com/?q=..."
              value={mapsUrl}
              onChange={(e) => {
                setMapsUrl(e.target.value);
                if (errors.mapsUrl) setErrors({ ...errors, mapsUrl: undefined });
              }}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F4] border border-[#FFE8DD] text-sm text-[#183153] focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[44px]"
            />
          </div>

          {/* Catatan Kencan */}
          <div>
            <label
              htmlFor="notes"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1"
            >
              Catatan Kencan Kita
            </label>
            <textarea
              id="notes"
              rows={2}
              placeholder="Contoh: Sambalnya pedas gurih, suasana adem pas sore..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F4] border border-[#FFE8DD] text-sm text-[#183153] focus:outline-none focus:ring-2 focus:ring-[#3975EA]"
            />
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-2 border-t border-[#FFE8DD] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl font-bold text-sm text-[#183153] hover:bg-[#FFE8DD]/60 transition-colors min-h-[44px]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#3975EA] hover:bg-[#285ec4] text-white font-bold px-6 py-2.5 rounded-2xl shadow-soft btn-press min-h-[44px]"
            >
              <Save className="w-4 h-4" />
              <span>{initialItem ? 'Simpan Perubahan' : 'Simpan Kuliner'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
