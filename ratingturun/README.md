# RatingTurun

Satu pertanyaan untuk mitra ojek: rating saya turun, seberapa bahaya buat prioritas order. Bahasa antarmuka Indonesia.

Sekali bayar Rp14.900 membuka pita risiko (aman, waspada, atau kritis), rencana 20 order berikutnya, dan naskah singkat untuk penumpang. Bukan jaminan platform dan bukan alat tarif.

## Lokal

```bash
cd C:\ratingturun
npm install
npm run build
```

Salin `.env.example` menjadi `.env.local` sebelum pembayaran sungguhan. Tanpa kunci Firebase Admin, hasil tersimpan di `.data/` pada mesin yang menjalankan server.

## Deploy

Firebase project `skoolnow-ea6ff`, Hosting site `ratingturun`, Firestore database `ratingturun` di `asia-southeast1`. URL publik `https://ratingturun.web.app`.

`scripts/deploy.sh` hanya men-deploy hosting target ini. Batas biaya di `apphosting.yaml` dan `firebase.json`: minInstances 0, maxInstances 3, cpu 1, memory 512MiB.

Kunci yang masih diisi di lingkungan deploy: `MIDTRANS_SERVER_KEY`, `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, dan opsional `DEEPSEEK_API_KEY`.
