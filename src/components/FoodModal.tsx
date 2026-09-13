import React, { useState, useEffect, useRef } from 'react';
import { FoodItem, FoodCategory, CATEGORY_LABELS } from '../types/food';
import { isValidHttpUrl } from '../utils/formatters';
import { X, Save, AlertCircle } from 'lucide-react';
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
  const [price, setPrice] = useState<string>('');
  const [address, setAddress] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<{
    placeName?: string;
    menuName?: string;
    price?: string;
    mapsUrl?: string;
  }>({});

  const firstInputRef = useRef<HTMLInputElement>(null);

  // Sync state with initialItem whenever opened
  useEffect(() => {
    if (isOpen) {
      if (initialItem) {
        setPlaceName(initialItem.placeName);
        setMenuName(initialItem.menuName);
        setCategory((initialItem.category as FoodCategory) || 'nasi');
        setPrice(initialItem.price !== undefined ? String(initialItem.price) : '');
        setAddress(initialItem.address || '');
        setMapsUrl(initialItem.mapsUrl || '');
        setNotes(initialItem.notes || '');
      } else {
        setPlaceName('');
        setMenuName('');
        setCategory('nasi');
        setPrice('');
        setAddress('');
        setMapsUrl('');
        setNotes('');
      }
      setErrors({});
      // Focus on first input
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialItem]);

  // Handle escape key
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
      newErrors.placeName = 'Nama tempat makan wajib diisi!';
    }

    if (!menuName.trim()) {
      newErrors.menuName = 'Nama menu makanan wajib diisi!';
    }

    if (price.trim() !== '') {
      const numPrice = Number(price);
      if (isNaN(numPrice) || numPrice < 0) {
        newErrors.price = 'Harga harus berupa angka dan tidak boleh negatif.';
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
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal / Bottom-Sheet Container */}
      <div className="relative w-full md:max-w-xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl border border-[#FFE8DD] flex flex-col max-h-[92vh] z-10 animate-in slide-in-from-bottom md:zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#FFE8DD] bg-[#FFF9F4] rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#3975EA] text-white flex items-center justify-center">
              <BowlIcon className="w-5 h-5 text-[#FFE8DD]" />
            </div>
            <div>
              <h2 id="modal-title" className="font-fredoka text-xl font-bold text-[#183153]">
                {initialItem ? 'Edit Kuliner' : 'Tambah Kuliner Baru'}
              </h2>
              <p className="text-xs text-[#183153]/70">
                Lengkapi nama tempat dan menu favoritmu.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center text-[#183153] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
            aria-label="Tutup form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4">
          {/* Tempat Makan (Wajib) */}
          <div>
            <label
              htmlFor="placeName"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1.5"
            >
              Nama Tempat Makan <span className="text-red-500">*</span>
            </label>
            <input
              ref={firstInputRef}
              id="placeName"
              type="text"
              required
              placeholder="Contoh: Mie Gacoan, Warteg Bahari, RM Padang..."
              value={placeName}
              onChange={(e) => {
                setPlaceName(e.target.value);
                if (errors.placeName) setErrors({ ...errors, placeName: undefined });
              }}
              className={`w-full px-4 py-3 rounded-2xl bg-[#FFF9F4] border text-sm text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[48px] ${
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
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1.5"
            >
              Nama Menu Makanan <span className="text-red-500">*</span>
            </label>
            <input
              id="menuName"
              type="text"
              required
              placeholder="Contoh: Mie Hompimpa Lv 2, Nasi Rendang, Es Cendol..."
              value={menuName}
              onChange={(e) => {
                setMenuName(e.target.value);
                if (errors.menuName) setErrors({ ...errors, menuName: undefined });
              }}
              className={`w-full px-4 py-3 rounded-2xl bg-[#FFF9F4] border text-sm text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[48px] ${
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

          {/* Kategori */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1.5">
              Kategori Kuliner
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(['nasi', 'mi', 'bakso', 'camilan', 'minuman', 'lainnya'] as FoodCategory[]).map(
                (cat) => {
                  const info = CATEGORY_LABELS[cat];
                  const isSelected = category === cat;
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`flex items-center gap-2 p-2.5 rounded-2xl text-xs font-bold transition-all min-h-[44px] border ${
                        isSelected
                          ? 'bg-[#3975EA] text-white border-[#3975EA] shadow-xs'
                          : 'bg-[#FFF9F4] text-[#183153] border-[#FFE8DD] hover:bg-[#E8F0FF]'
                      }`}
                    >
                      <span>{info.emoji}</span>
                      <span>{info.label}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Perkiraan Harga (Opsional) */}
          <div>
            <label
              htmlFor="price"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1.5"
            >
              Perkiraan Harga (Rp) <span className="text-[#183153]/50 font-normal">(Opsional)</span>
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
                className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FFF9F4] border text-sm text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[48px] ${
                  errors.price ? 'border-red-400 bg-red-50/50' : 'border-[#FFE8DD]'
                }`}
              />
            </div>
            {errors.price && (
              <p className="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.price}</span>
              </p>
            )}
          </div>

          {/* Alamat Singkat (Opsional) */}
          <div>
            <label
              htmlFor="address"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1.5"
            >
              Alamat Singkat / Lokasi <span className="text-[#183153]/50 font-normal">(Opsional)</span>
            </label>
            <input
              id="address"
              type="text"
              placeholder="Contoh: Seberang mall, Dekat kampus B, Jl. Sudirman No. 5"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F4] border border-[#FFE8DD] text-sm text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[48px]"
            />
          </div>

          {/* Tautan Google Maps (Opsional) */}
          <div>
            <label
              htmlFor="mapsUrl"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1.5"
            >
              Tautan Google Maps <span className="text-[#183153]/50 font-normal">(Opsional)</span>
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
              className={`w-full px-4 py-3 rounded-2xl bg-[#FFF9F4] border text-sm text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA] min-h-[48px] ${
                errors.mapsUrl ? 'border-red-400 bg-red-50/50' : 'border-[#FFE8DD]'
              }`}
            />
            {errors.mapsUrl && (
              <p className="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.mapsUrl}</span>
              </p>
            )}
          </div>

          {/* Catatan Pribadi (Opsional) */}
          <div>
            <label
              htmlFor="notes"
              className="block text-xs font-bold uppercase tracking-wider text-[#183153] mb-1.5"
            >
              Catatan Pribadi <span className="text-[#183153]/50 font-normal">(Opsional)</span>
            </label>
            <textarea
              id="notes"
              rows={2}
              placeholder="Contoh: Enak dimakan waktu hujan, jangan lupa minta kuah pisah..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F4] border border-[#FFE8DD] text-sm text-[#183153] placeholder:text-[#183153]/40 focus:outline-none focus:ring-2 focus:ring-[#3975EA]"
            />
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-3 border-t border-[#FFE8DD] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl font-bold text-sm text-[#183153] hover:bg-[#FFE8DD]/60 transition-colors min-h-[48px]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#3975EA] hover:bg-[#2c65cf] text-white font-bold px-6 py-3 rounded-2xl shadow-soft btn-press min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#183153]"
            >
              <Save className="w-4 h-4" />
              <span>{initialItem ? 'Simpan Perubahan' : 'Tambah Kuliner'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
