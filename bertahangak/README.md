# BertahanGak

Pita situasi untuk pekerja migran Indonesia: bertahan dengan rencana, cari bantuan sekarang, atau darurat. Kontak resmi KP2MI dan perwakilan RI selalu gratis. Pita darurat tidak dikunci.

Bukan nasihat hukum. Bukan alat pembanding gaji.

- Domain: bertahangak.id
- URL publik: https://bertahangak.web.app
- Firebase project: skoolnow-ea6ff
- Hosting site: bertahangak
- Firestore database: bertahangak (asia-southeast1)
- Harga buka laporan non-darurat: Rp9.900

Jalankan lokal dari `C:\bertahangak` (bukan di dalam clone sabave-ai).

```bash
npm install
npm run build
npm run dev
```

Salin `.env.example` menjadi `.env.local` sebelum pembayaran atau Firestore dipakai. Tanpa kunci Firebase, cek tersimpan di `.data/` pada mesin itu. Tanpa `DEEPSEEK_API_KEY`, ringkasan rencana bertahan memakai naskah bawaan.

`scripts/deploy.sh` hanya men-deploy hosting target `bertahangak`. Site Hosting dan basis data Firestore perlu ada lebih dulu. Jangan menjalankan deploy dari build cloud ini.
