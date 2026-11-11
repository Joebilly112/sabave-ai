# PPG Siap

Cek kesiapan slot Pendidikan Profesi Guru tahun ini. Satu emosi: harap-harap cemas bahwa slot akan terbuang karena berkas, uji, atau jam mengajar belum beres.

Bukan portal resmi, bukan bimbel, dan bukan alat gaji. Sekali bayar Rp19.900 membuka skor, daftar berkas yang bolong, dan rencana 30 hari.

## Lokal

Folder kerja di mesin Windows: `C:\ppgsiap`. Jangan menaruhnya di dalam clone `sabave-ai`.

```bash
npm install
npm run build
```

## Firebase (belum dijalankan dari cloud)

- Proyek: `skoolnow-ea6ff`
- Hosting site: `ppgsiap`
- Firestore database: `ppgsiap` di `asia-southeast1`
- URL: `https://ppgsiap.web.app`
- Batas biaya: `minInstances 0`, `maxInstances 3`, `cpu 1`, `memory 512MiB`

`npm run deploy` hanya untuk mesin yang sudah login Firebase CLI.

Salin `.env.example` menjadi `.env.local` dan isi kunci Midtrans, Firebase Admin, serta DeepSeek bila dipakai. Tanpa kunci itu, formulir menolak menyimpan pesanan.
