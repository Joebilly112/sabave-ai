# ShiftRusak

Satu pertanyaan untuk perawat: apakah pola dinas 14 hari terakhir merusak tidur. Bahasa antarmuka Indonesia.

Sekali bayar Rp14.900 membuka skor gangguan ritme (0–100), malam yang perlu dilindungi pada usulan roster tujuh hari, dan naskah ke kepala ruangan. Bukan nasihat medis dan bukan alat gaji.

## Lokal

```bash
cd C:\shiftrusak
npm install
npm run build
```

Salin `.env.example` menjadi `.env.local` sebelum pembayaran sungguhan. Tanpa kunci Firebase Admin, hasil tersimpan di `.data/` pada mesin yang menjalankan server.

## Deploy

Firebase project `skoolnow-ea6ff`, Hosting site `shiftrusak`, Firestore database `shiftrusak` di `asia-southeast1`. URL publik `https://shiftrusak.web.app`.

`scripts/deploy.sh` hanya men-deploy hosting target ini. Batas biaya di `apphosting.yaml` dan `firebase.json`: minInstances 0, maxInstances 3, cpu 1, memory 512MiB.

Kunci yang masih diisi di lingkungan deploy: `MIDTRANS_SERVER_KEY`, `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, dan opsional `DEEPSEEK_API_KEY`.
