# Magangworth

Lampu nilai karier untuk satu tawaran magang. Pengguna mengisi jenis kantor, peran, status bayar, durasi, tugas harian, dan akses pembimbing. Sekali bayar Rp14.900 membuka lampu merah / kuning / hijau, empat permintaan minggu pertama, dan skrip renegosiasi yang sopan.

Bukan pembanding gaji. Bahasa antarmuka: Indonesia.

- Domain: magangworth.id
- URL publik: https://magangworth.web.app
- Firebase project: `skoolnow-ea6ff`
- Hosting site: `magangworth`
- Firestore database: `magangworth` (asia-southeast1)
- Batas biaya: minInstances 0, maxInstances 3, cpu 1, memory 512MiB

## Lokal

```bash
npm install
npm run dev
```

Salin `.env.example` ke `.env.local` sebelum pembayaran sungguhan. Tanpa `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY`, hasil tersimpan di `.data/` pada mesin ini. Tanpa `MIDTRANS_SERVER_KEY`, lampu tetap terhitung tetapi tombol bayar menjawab bahwa pembayaran belum dikonfigurasi. `DEEPSEEK_API_KEY` opsional; tanpa kunci, kalimat hasil tetap dari pembacaan di server.

## Deploy

`scripts/deploy.sh` hanya men-deploy hosting target `magangworth`. Buat site Hosting dan database Firestore lebih dulu. Jangan menjalankan skrip ini untuk produk lain.
