# Capek di Jalan

Cek sekali bayar untuk komuter: apakah perjalanan pintu-ke-pintu ini masuk pita **ringan**, **berat**, atau **bahaya**. Hasil yang terbuka setelah pembayaran berisi jam setahun di jalan, tiga beban terbesar, dan rencana 14 hari.

Ini informasi kesejahteraan. Bukan diagnosis, bukan surat sakit, dan bukan alat gaji.

- Domain: capekdijalan.id
- Harga: Rp12.900
- URL publik: https://capekdijalan.web.app
- Firebase project: skoolnow-ea6ff
- Hosting site: capekdijalan
- Firestore database: capekdijalan
- Lokal deploy: `C:\capekdijalan`

## Menjalankan

```bash
npm install
npm run dev
```

Salin `.env.example` ke `.env.local` sebelum pembayaran Midtrans atau Firestore dipakai. Tanpa kunci itu, cek tetap tersimpan di `.data/` dan tombol bayar menjawab bahwa pembayaran belum dikonfigurasi.

## Deploy

`scripts/deploy.sh` hanya membangun dan men-deploy hosting target `capekdijalan`. Situs Hosting dan basis data Firestore dibuat terpisah, di region `asia-southeast1`, dengan batas `minInstances` 0, `maxInstances` 3, cpu 1, memori 512MiB.
