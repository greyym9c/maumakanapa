import React, { useState, useEffect } from 'react';
import { Download, X, Heart, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPwaBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (already installed as PWA)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed in this session
    if (sessionStorage.getItem('pwa_banner_dismissed') === 'true') {
      setIsDismissed(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Listen for install prompt on Android/Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  if (isInstalled || isDismissed) return null;
  // If neither deferredPrompt is available nor iOS, don't show to desktop users who aren't eligible
  if (!deferredPrompt && !isIos) return null;

  return (
    <aside
      aria-label="Pasang Aplikasi Love Food"
      className="bg-white/95 backdrop-blur-md border border-[#FFC5AD] shadow-soft-lg rounded-3xl p-3.5 sm:p-4 mx-4 mb-4 relative animate-in slide-in-from-top-3 duration-300"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#FFE8DD] text-[#E05A47] flex items-center justify-center shrink-0 shadow-xs">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm text-[#183153]">
                Pasang Love Food di HP
              </span>
              <span className="text-[10px] bg-[#E8F0FF] text-[#3975EA] font-bold px-1.5 py-0.5 rounded-full">
                PWA
              </span>
            </div>
            <p className="text-xs text-[#183153]/70 font-medium leading-tight">
              {isIos
                ? "Tap icon Bagikan 📤 lalu pilih 'Add to Home Screen' 💕"
                : "Biar gampang dibuka dari layar utama pas kencan bareng!"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {!isIos && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 bg-[#3975EA] hover:bg-[#285ec4] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs btn-press min-h-[38px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#183153]/50 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Tutup banner install"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
