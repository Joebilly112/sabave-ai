# CVtolak

Audit sekali bayar untuk CV yang dikirim berkali-kali tanpa balasan. Bahasa antarmuka: Indonesia.

Peran yang dilamar + teks CV + lama pengalaman. Setelah Rp19.900 lewat Midtrans, halaman `/hasil/[id]` membuka celah kata kunci, tanda format, ringkasan yang ditulis ulang, dan daftar simpan / potong / tambah.

## Lokal

```bash
npm install
npm run dev
```

Salin `.env.example` menjadi `.env.local` sebelum pembayaran sungguhan. Tanpa `MIDTRANS_SERVER_KEY` dan tanpa kunci Firebase, audit tetap tersimpan di `.data/` dan hasil tetap terkunci.

## Deploy

Firebase project `skoolnow-ea6ff`. Hosting site dan Firestore database: `cvtolak`, region `asia-southeast1`. Batas biaya: `minInstances` 0, `maxInstances` 3, `cpu` 1, `memoryMiB` 512.

`scripts/deploy.sh` hanya men-deploy target hosting `cvtolak`. Situs Hosting dan database Firestore harus sudah ada. Jangan menjalankan deploy dari folder produk lain.

URL publik: https://cvtolak.web.app

Domain `cvtolak.id` dan host `cvtolak.firebaseapp.com` diarahkan ke URL itu lewat `middleware.ts`.
