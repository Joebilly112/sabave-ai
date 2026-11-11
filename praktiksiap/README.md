# PraktikSiap

Satu pertanyaan: siapkah saya buka praktik mandiri bidan, atau masih banyak yang kurang?

Aplikasi Next.js ini menyusun lampu hijau, kuning, atau merah, daftar berkas yang masih kurang, dan rencana 30 hari dari isian bidan. Sekali bayar Rp19.900. Bukan keputusan dinas dan bukan alat gaji.

## Lokal

```bash
npm install
npm run build
```

Salin `.env.example` menjadi `.env.local` sebelum pembayaran sungguhan. Tanpa kunci Firebase, hasil tersimpan di `.data/` pada mesin ini. Tanpa kunci Midtrans, tombol bayar menjawab bahwa pembayaran belum dikonfigurasi.

## Deploy

Hanya situs ini, di proyek `skoolnow-ea6ff`, Hosting site `praktiksiap`, Firestore database `praktiksiap` (asia-southeast1). Batas biaya: minInstances 0, maxInstances 3, cpu 1, memory 512MiB.

```bash
bash scripts/deploy.sh
```

Folder kerja di mesin Windows: `C:\praktiksiap`.
