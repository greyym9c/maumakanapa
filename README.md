# maumakanapa

> **Makan Mana? (Mau Makan Apa)** — Website interaktif untuk membantu kamu menentukan mau makan apa dan di mana lewat permainan kartu acak 3D yang seru dan anti-overthinking!

Dibuat dengan gaya lifestyle Gen Z: ceria, ekspresif, mobile-first, palet warna cream-biru-peach, serta animasi interaktif yang mulus.

---

## ✨ Fitur Utama

- 🎴 **Acak Kartu 3D**:
  - Algoritma pengacakan **Fisher–Yates** murni (maksimal 6 pilihan unik tanpa duplikasi).
  - Tampilan kartu tertutup berwarna biru dengan ornamen doodle ceria dan ikon piring/mangkuk (*"Pilih aku?"*).
  - Animasi putaran kartu 3D (*card flip*) 180° dengan efek perayaan confetti halus.
  - Panel hasil rekomendasi menu, tempat makan, kategori, harga rupiah, tombol *"Acak lagi"*, tautan *"Lihat lokasi"* (Google Maps), dan *"Edit pilihan"*.
- 🎯 **Filter Fleksibel**:
  - Filter kategori makanan (Nasi, Mi, Bakso, Camilan, Minuman, Lainnya).
  - Batas harga maksimal dengan penanganan otomatis untuk mengabaikan item tanpa harga saat filter aktif.
- 📋 **Koleksi Kuliner (CRUD)**:
  - Kelola daftar makanan dan tempat makan favoritmu sendiri.
  - Pencarian real-time berdasarkan menu, tempat, alamat, atau catatan pribadi.
  - Modal form di desktop dan bottom sheet scrollable di HP (ramah keyboard virtual).
  - Validasi ketat (wajib isi trim, harga non-negatif, tautan HTTP/HTTPS).
  - Konfirmasi sebelum hapus dan notifikasi toast yang responsif.
- 💾 **Tanpa Database (Zero Backend / Serverless)**:
  - Data tersimpan otomatis di penyimpanan lokal peramban (`localStorage`) dengan penanganan data korup yang aman.
  - Kondisi awal bersih dengan opsi tombol *"Coba data contoh"* yang opsional.

---

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) + Framer Motion / CSS 3D Transforms
- **Fonts**: Fredoka (Headings/Brand) & Plus Jakarta Sans (Body)

---

## 🛠️ Cara Menjalankan Secara Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Build untuk produksi
npm run build
```

---

## 🌐 Cara Deploy ke Vercel (Gratis & Cepat)

Karena proyek ini sepenuhnya *client-side* berbasis `localStorage` tanpa perlu backend ataupun database, deployment ke Vercel sangat mudah:

1. Buka [Vercel](https://vercel.com/) dan login menggunakan akun GitHub kamu.
2. Klik **"Add New..."** -> **"Project"**.
3. Import repositori `greyym9c/maumakanapa`.
4. Vercel otomatis mendeteksi:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **Deploy**. Website kamu akan langsung online dan siap digunakan!
