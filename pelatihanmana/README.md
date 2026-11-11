# Pelatihan Mana

Satu pertanyaan: pelatihan kompetensi perawat mana yang berikutnya kalau waktu dan uang terbatas.

Unlock sekali **Rp19.900** menampilkan tiga pelatihan terurut, alasan, biaya waktu, dan yang ditunda. UI bahasa Indonesia. Bukan alat gaji dan bukan katalog lembaga.

## Lokal

```bash
cd C:\pelatihanmana
npm install
npm run build
npm start
```

Salin `.env.example` ke `.env.local` sebelum pembayaran sungguhan.

## Firebase

- Project: `skoolnow-ea6ff`
- Hosting site: `pelatihanmana`
- URL: https://pelatihanmana.web.app
- Firestore database: `pelatihanmana` di `asia-southeast1`
- Batas biaya: `minInstances 0`, `maxInstances 3`, `cpu 1`, `memory 512MiB`

`scripts/deploy.sh` membangun lalu men-deploy hosting target ini dan rules Firestore database `pelatihanmana` saja.

## Env

`FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `MIDTRANS_SERVER_KEY`, `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`. `DEEPSEEK_API_KEY` opsional untuk memoles kalimat alasan tanpa mengubah urutan.
