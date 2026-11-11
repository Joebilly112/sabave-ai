# NaikPangkat

Daftar berkas kenaikan pangkat untuk PNS dan pengingat kelengkapan untuk PPPK. Bahasa Indonesia. Sekali bayar Rp19.900 lewat QRIS atau dompet digital. Bukan keputusan BKD dan bukan perbandingan gaji.

Folder aplikasi ini berdiri sendiri. Lokal Windows: `C:\naikpangkat`. Jangan menaruhnya di dalam clone sabave-ai.

## Perintah

```bash
npm install
npm run build
npm run dev
```

## Firebase

- Proyek: `skoolnow-ea6ff`
- Hosting site: `naikpangkat`
- URL: `https://naikpangkat.web.app`
- Firestore database: `naikpangkat` di `asia-southeast1`
- Batas biaya: minInstances 0, maxInstances 3, cpu 1, memory 512MiB

`scripts/deploy.sh` untuk mesin yang sudah login Firebase CLI. Jangan menjalankan skrip itu dari build cloud.

Isi `.env.example` menjadi `.env.local` sebelum pembayaran diuji. `FIREBASE_SERVICE_ACCOUNT_JSON` boleh JSON satu baris atau base64. `DEEPSEEK_API_KEY` boleh kosong; catatan hasil tetap tersusun tanpa itu.

## Yang disimpan

Jawaban formulir (tanpa nama dan NIP), daftar hasil, status bayar, dan peristiwa halaman. Aturan Firestore menolak akses klien. Server memakai Admin SDK.
