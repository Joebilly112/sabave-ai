# STRHabis

Aplikasi satu emosi untuk perawat: panik saat SDM atau rumah sakit menanyakan Surat Tanda Registrasi yang mau habis.

Isian: tanggal terbit, tanggal habis, status SIP, tempat praktik, dan kredit SKP yang sudah terkumpul. Setelah pembayaran Rp19.900, halaman hasil menampilkan hitungan hari, daftar dokumen, dan rencana minggu. Ini informasi persiapan, bukan keputusan Konsil atau Kemenkes.

## Menjalankan

```bash
npm install
npm run build
npm start
```

Salin `.env.example` menjadi `.env.local` sebelum memakai Midtrans, Firebase Admin, atau DeepSeek. Tanpa kunci itu, formulir tetap menyimpan hasil di berkas lokal `.data/` dan pembayaran menolak dengan pesan konfigurasi.

## Deploy

Folder ini berdiri sendiri di `C:\strhabis`. Hosting site dan database Firestore memakai nama `strhabis` pada proyek `skoolnow-ea6ff`, region `asia-southeast1`, dengan batas `minInstances` 0, `maxInstances` 3, `cpu` 1, `memoryMiB` 512. `scripts/deploy.sh` hanya men-deploy hosting target ini.
