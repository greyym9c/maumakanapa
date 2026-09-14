import React, { useState, useEffect } from 'react';
import { Lock, Heart, Delete, Sparkles, AlertCircle } from 'lucide-react';
import { BowlIcon } from './DoodleDecorations';

interface PinLockScreenProps {
  onUnlock: () => void;
}

const CORRECT_PIN = '250426';
const PIN_LENGTH = 6;

export const PinLockScreen: React.FC<PinLockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDigit = (digit: string) => {
    if (pin.length >= PIN_LENGTH || isSuccess) return;
    const newPin = pin + digit;
    setPin(newPin);
    setIsError(false);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {}
    }

    if (newPin.length === PIN_LENGTH) {
      validatePin(newPin);
    }
  };

  const handleDelete = () => {
    if (pin.length === 0 || isSuccess) return;
    setPin(pin.slice(0, -1));
    setIsError(false);
  };

  const handleClear = () => {
    if (isSuccess) return;
    setPin('');
    setIsError(false);
  };

  const validatePin = (inputPin: string) => {
    if (inputPin === CORRECT_PIN) {
      setIsSuccess(true);
      setIsError(false);
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([30, 50, 30]);
        } catch {}
      }
      setTimeout(() => {
        onUnlock();
      }, 400);
    } else {
      setIsError(true);
      setErrorMessage('PIN salah, coba ingat tanggal spesial kita berdua yaa sayang ❤️');
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(100);
        } catch {}
      }
      setTimeout(() => {
        setPin('');
      }, 650);
    }
  };

  // Listen to physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#FFF9F4] text-[#14253D] px-4 py-8 select-none overflow-y-auto">
      {/* Ambient background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-72 bg-gradient-to-b from-[#FFE8DD]/50 via-[#E8F0FF]/30 to-transparent pointer-events-none rounded-full blur-3xl" />

      {/* Top Header Section */}
      <div className="flex flex-col items-center text-center mt-2 relative z-10 animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Animated Icon Avatar */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#3975EA] to-[#2558be] text-white flex items-center justify-center shadow-[0_12px_28px_rgba(57,117,234,0.35)] relative mb-3">
          <BowlIcon className="w-8 h-8 text-[#FFE8DD]" />
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-tr from-[#FF8B66] to-[#FFC5AD] border-2 border-white rounded-full flex items-center justify-center text-xs shadow-sm animate-pulse">
            ❤️
          </span>
        </div>

        {/* Badge & Brand */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE8DD] border border-[#FFC5AD]/60 text-xs font-bold text-[#D44835] mb-2 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
          <span>Rahasia Heru & Nadine</span>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-black text-[#14253D] tracking-tight">
          Love Food Private
        </h1>
        <p className="text-xs sm:text-sm text-[#14253D]/70 font-medium mt-1">
          Masukkan PIN untuk membuka kuliner kencan kita 🔐
        </p>
      </div>

      {/* PIN Dots Indicator */}
      <div className="my-auto py-6 flex flex-col items-center relative z-10">
        <div
          className={`flex items-center gap-3.5 sm:gap-4 p-3 rounded-2xl transition-transform ${
            isError ? 'animate-shake' : ''
          }`}
        >
          {Array.from({ length: PIN_LENGTH }).map((_, idx) => {
            const isFilled = idx < pin.length;
            return (
              <div
                key={idx}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-200 border-2 ${
                  isSuccess
                    ? 'bg-[#10B981] border-[#10B981] scale-110 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                    : isError
                    ? 'bg-[#EF4444] border-[#EF4444] scale-110 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                    : isFilled
                    ? 'bg-[#3975EA] border-[#3975EA] scale-110 shadow-[0_0_10px_rgba(57,117,234,0.4)]'
                    : 'bg-white border-[#FFC5AD]'
                }`}
              />
            );
          })}
        </div>

        {/* Error Feedback Message */}
        <div className="h-6 mt-2 flex items-center justify-center">
          {isError && (
            <p className="text-xs font-bold text-[#EF4444] flex items-center gap-1 animate-in fade-in">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </p>
          )}
          {isSuccess && (
            <p className="text-xs font-bold text-[#10B981] flex items-center gap-1 animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PIN Benar! Membuka data kuliner...</span>
            </p>
          )}
        </div>
      </div>

      {/* Touch Keypad */}
      <div className="w-full max-w-xs mx-auto pb-4 relative z-10">
        <div className="grid grid-cols-3 gap-3 sm:gap-3.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="w-full h-16 sm:h-18 rounded-3xl bg-white/90 border border-[#FFE8DD] text-[#14253D] font-display text-2xl font-black shadow-[0_4px_16px_rgba(20,37,61,0.04)] hover:bg-[#FFE8DD]/50 hover:border-[#FFC5AD] active:scale-92 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
            >
              {digit}
            </button>
          ))}

          {/* Clear Button */}
          <button
            type="button"
            onClick={handleClear}
            className="w-full h-16 sm:h-18 rounded-3xl bg-white/60 border border-[#FFE8DD] text-[#14253D]/70 font-display text-sm font-bold shadow-xs hover:bg-[#FFE8DD]/50 active:scale-92 transition-all flex items-center justify-center focus:outline-none"
            aria-label="Bersihkan PIN"
          >
            Hapus
          </button>

          {/* Zero Digit */}
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="w-full h-16 sm:h-18 rounded-3xl bg-white/90 border border-[#FFE8DD] text-[#14253D] font-display text-2xl font-black shadow-[0_4px_16px_rgba(20,37,61,0.04)] hover:bg-[#FFE8DD]/50 hover:border-[#FFC5AD] active:scale-92 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3975EA]"
          >
            0
          </button>

          {/* Backspace Button */}
          <button
            type="button"
            onClick={handleDelete}
            className="w-full h-16 sm:h-18 rounded-3xl bg-white/60 border border-[#FFE8DD] text-[#14253D]/70 font-display text-base font-bold shadow-xs hover:bg-[#FFE8DD]/50 active:scale-92 transition-all flex items-center justify-center focus:outline-none"
            aria-label="Hapus satu angka"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>

        {/* Romantic Bottom Hint */}
        <p className="text-center text-[11px] text-[#14253D]/50 font-medium mt-4">
          🔐 Khusus Heru & Nadine • Data tersimpan aman
        </p>
      </div>
    </div>
  );
};
