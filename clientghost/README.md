# ClientGhost

Satu pertanyaan untuk freelancer: apakah klien ini akan menghilang sebelum bayar?

Isian: sumber klien, persen DP, kontrak, aturan revisi, jadwal bayar, dan tanda bahaya. Setelah Rp19.900 lewat Midtrans, halaman hasil membuka skor risiko hantu, checklist kontrak minimum, dan pesan minta DP sebelum kickoff.

Bukan alat pembanding penghasilan. Antarmuka berbahasa Indonesia.

## Lokal

```bash
cd clientghost
cp .env.example .env.local
npm install
npm run build
npm run dev
```

Node.js 22. Tanpa `FIREBASE_CLIENT_EMAIL` dan `FIREBASE_PRIVATE_KEY`, brief tersimpan di `.data/` (diabaikan git). Tanpa `MIDTRANS_SERVER_KEY`, tombol bayar menjawab bahwa pembayaran belum dikonfigurasi. `DEEPSEEK_API_KEY` opsional; pesan DP tetap ada dari template server.

## Deploy

Konfigurasi sudah mengarah ke Firebase `skoolnow-ea6ff`, situs Hosting `clientghost`, Firestore `clientghost`, wilayah `asia-southeast1`, dan batas instance `minInstances: 0`, `maxInstances: 3`, `cpu: 1`, `memoryMiB: 512`. Jalankan `npm run deploy` hanya dari mesin yang sudah login Firebase CLI, setelah situs Hosting dan database dibuat. Jangan menyalin folder produk lain.
