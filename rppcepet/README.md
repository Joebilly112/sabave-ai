# RPP Cepet

Kerangka satu pertemuan untuk guru yang besok sudah mengajar dan malam ini kehabisan waktu. Satu pertanyaan, satu kali buka seharga Rp14.900.

Isian: jenjang (SD–SMK), mata pelajaran, kurikulum (Merdeka atau lainnya), topik, jumlah siswa, dan menit yang masih tersisa. Setelah pembayaran, halaman hasil menampilkan tujuan, langkah, asesmen, checklist sesuai menit itu, dan lampu merah yang biasa ditanya pengawas.

Bukan jasa penulis RPP dan bukan perbandingan gaji.

## Perintah

```bash
npm install
npm run build
npm run dev
```

Node.js 22. Salin `.env.example` menjadi `.env.local` sebelum mencoba pembayaran.

## Lingkungan

- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` untuk Admin SDK
- `FIRESTORE_DATABASE_ID=rppcepet`
- `MIDTRANS_SERVER_KEY`, `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`, `MIDTRANS_IS_PRODUCTION`, `NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION`
- `DEEPSEEK_API_KEY` opsional, hanya merapikan dua kalimat tujuan
- URL notifikasi Midtrans: `https://rppcepet.web.app/api/midtrans/notification`

Batas biaya backend: `minInstances` 0, `maxInstances` 3, 1 CPU, 512MiB, wilayah `asia-southeast1`.

`scripts/deploy.sh` mendeploy hosting target `rppcepet` dan Firestore `rppcepet` di proyek `skoolnow-ea6ff` saja. Jangan jalankan dari mesin yang belum login Firebase CLI.
