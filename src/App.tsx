import React, { useState, useEffect, useCallback } from 'react';
import { FoodItem, ToastInfo } from './types/food';
import { loadFoodItems, saveFoodItems } from './utils/storage';
import { SAMPLE_FOOD_ITEMS } from './data/sampleData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { RandomizerPage } from './components/RandomizerPage';
import { CollectionPage } from './components/CollectionPage';
import { FoodModal } from './components/FoodModal';
import { ConfirmModal } from './components/ConfirmModal';
import { ToastContainer } from './components/Toast';

import { InstallPwaBanner } from './components/InstallPwaBanner';
import { PinLockScreen } from './components/PinLockScreen';

export const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('love_food_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [activeTab, setActiveTab] = useState<'random' | 'collection'>('random');
  const [items, setItems] = useState<FoodItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<FoodItem | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Show toast notification
  const addToast = useCallback((message: string, type: ToastInfo['type'] = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initial load from localStorage
  useEffect(() => {
    const isFirstTime = localStorage.getItem('love_food_initialized') === null;
    const { items: loaded, isCorrupted } = loadFoodItems();

    if (isFirstTime) {
      // First time user opens the app: populate initial sample data
      setItems(SAMPLE_FOOD_ITEMS);
      saveFoodItems(SAMPLE_FOOD_ITEMS);
      localStorage.setItem('love_food_initialized', 'true');
    } else {
      // User has used the app before: ALWAYS respect their deletions and additions!
      // Only clean legacy text if any item contains old patterns, without restoring deleted items:
      const hasLegacyData = loaded.some(
        (item) =>
          (item.placeName && /kudus/i.test(item.placeName)) ||
          (item.address && /kudus/i.test(item.address)) ||
          (item.notes && /kudus/i.test(item.notes))
      );

      if (hasLegacyData) {
        const cleaned = loaded.map((item) => ({
          ...item,
          placeName: item.placeName?.replace(/kudus/gi, '').trim(),
          address: item.address?.replace(/kudus/gi, '').trim(),
          notes: item.notes?.replace(/kudus/gi, '').trim(),
        }));
        setItems(cleaned);
        saveFoodItems(cleaned);
      } else {
        setItems(loaded);
      }
    }

    if (isCorrupted) {
      addToast(
        'Ada data penyimpanan sebelumnya yang tidak terbaca dan telah dibersihkan secara aman.',
        'warning'
      );
    }
  }, [addToast]);

  // Persist items whenever items change
  const updateItems = (newItems: FoodItem[]) => {
    setItems(newItems);
    localStorage.setItem('love_food_initialized', 'true');
    const success = saveFoodItems(newItems);
    if (!success) {
      addToast('Gagal menyimpan data ke browser (kuota penyimpanan penuh).', 'error');
    }
  };

  // Load sample data manually
  const handleLoadSampleData = () => {
    updateItems(SAMPLE_FOOD_ITEMS);
    addToast('Menu rekomendasi kuliner pilihan berhasil dimuat!');
  };

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (item: FoodItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Save food item (create or update)
  const handleSaveFood = (
    foodData: Omit<FoodItem, 'id' | 'createdAt'>,
    id?: string
  ) => {
    if (id) {
      // Edit existing
      const updated = items.map((item) =>
        item.id === id
          ? {
              ...item,
              ...foodData,
            }
          : item
      );
      updateItems(updated);
      addToast(`"${foodData.menuName}" berhasil diperbarui!`);
    } else {
      // Create new
      const newItem: FoodItem = {
        ...foodData,
        id: `food-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: Date.now(),
      };
      updateItems([newItem, ...items]);
      addToast(`"${foodData.menuName}" berhasil ditambahkan ke daftar!`);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Delete food item confirmation
  const handleRequestDelete = (item: FoodItem) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = () => {
    if (!deletingItem) return;
    const remaining = items.filter((i) => i.id !== deletingItem.id);
    updateItems(remaining);
    addToast(`"${deletingItem.menuName}" telah dihapus dari koleksi.`);
    setDeletingItem(null);
  };

  // Lock / Unlock handlers
  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem('love_food_unlocked', 'true');
    } catch {}
    addToast('Selamat datang Heru & Nadine! 💕 Akses kuliner terbuka.');
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem('love_food_unlocked');
    } catch {}
    addToast('Aplikasi terkunci kembali. 🔐');
  };

  // If not unlocked, display PIN Lock screen
  if (!isUnlocked) {
    return <PinLockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4] text-[#183153] pb-24 md:pb-12">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalItems={items.length}
        onLock={handleLock}
      />

      {/* PWA Install Banner */}
      <div className="max-w-xl mx-auto pt-2 w-full">
        <InstallPwaBanner />
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'random' ? (
          <RandomizerPage
            items={items}
            onOpenAddModal={handleOpenAddModal}
            onOpenEditModal={handleOpenEditModal}
            onLoadSampleData={handleLoadSampleData}
          />
        ) : (
          <CollectionPage
            items={items}
            onAddFood={handleOpenAddModal}
            onEditFood={handleOpenEditModal}
            onDeleteFood={handleRequestDelete}
            onLoadSampleData={handleLoadSampleData}
          />
        )}
      </main>

      {/* Floating Bottom Navigation for Mobile */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalItems={items.length}
      />

      {/* Food Add / Edit Modal */}
      <FoodModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveFood}
        initialItem={editingItem}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deletingItem !== null}
        item={deletingItem}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingItem(null)}
      />

      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default App;
