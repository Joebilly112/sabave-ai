# InterviewDebrief

Debrief sekali bayar setelah wawancara. Satu rasa: spiral “tadi saya hancur”. Bukan alat gaji dan bukan latihan sebelum interview.

- Domain: `interviewdebrief.id`
- URL publik: https://interviewdebrief.web.app
- Harga buka: Rp19.900
- Firebase project: `skoolnow-ea6ff`
- Hosting site: `interviewdebrief`
- Firestore database: `interviewdebrief` (`asia-southeast1`)
- UI: Bahasa Indonesia

## Lokal

```bash
npm install
npm run build
npm start
```

Salin `.env.example` ke `.env.local` sebelum mencoba pembayaran. Tanpa `MIDTRANS_SERVER_KEY` dan kredensial Firebase Admin, formulir tetap menyusun debrief ke berkas lokal `.data/` dan halaman hasil tetap terkunci.

## Deploy (mesin yang sudah login Firebase CLI)

Jangan menyalin folder produk lain. Dari folder ini:

1. `firebase use skoolnow-ea6ff`
2. Buat Hosting site `interviewdebrief` bila belum ada, lalu targetkan hanya aplikasi ini.
3. Buat Firestore database `interviewdebrief` di `asia-southeast1` bila belum ada.
4. Jaga batas biaya: `minInstances 0`, `maxInstances 3`, `cpu 1`, `memory 512MiB`.
5. `bash scripts/deploy.sh` men-deploy hosting target ini saja.

Batas yang sama tertulis di `apphosting.yaml` dan `firebase.json`.

## Yang masih dipasang manual

- `MIDTRANS_SERVER_KEY`, `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`, dan bendera produksi
- `FIREBASE_CLIENT_EMAIL` dan `FIREBASE_PRIVATE_KEY` untuk database bernama
- `DEEPSEEK_API_KEY` opsional — tanpa kunci, debrief memakai heuristik di server
- DNS `interviewdebrief.id` bila domain kustom dipakai
