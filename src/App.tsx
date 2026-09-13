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

export const App: React.FC = () => {
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
    const { items: loaded, isCorrupted } = loadFoodItems();
    
    // Auto-update to Kudus recommended spots if empty or previous non-Kudus sample
    const hasOldNonKudusSample = loaded.some(
      (item) => item.isSample && (!item.address || !item.address.toLowerCase().includes('kudus'))
    );

    // Auto-update to full 26 Kudus spots if empty, non-Kudus, or previous 8-item sample
    const isOldSmallSampleSet = loaded.length < SAMPLE_FOOD_ITEMS.length && loaded.every((item) => item.isSample);

    if (loaded.length === 0 || hasOldNonKudusSample || isOldSmallSampleSet) {
      setItems(SAMPLE_FOOD_ITEMS);
      saveFoodItems(SAMPLE_FOOD_ITEMS);
      addToast('30 kuliner Kudus bintang 4.5+ termasuk Nasi Padang berhasil dimuat! ⭐');
    } else {
      setItems(loaded);
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
    const success = saveFoodItems(newItems);
    if (!success) {
      addToast('Gagal menyimpan data ke browser (kuota penyimpanan penuh).', 'error');
    }
  };

  // Load sample data
  const handleLoadSampleData = () => {
    updateItems(SAMPLE_FOOD_ITEMS);
    addToast('30 menu rekomendasi kuliner Kudus bintang 4.5+ berhasil dimuat!');
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4] text-[#183153] pb-24 md:pb-12">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalItems={items.length}
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
