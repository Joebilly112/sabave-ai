# SipbHabis

Satu pertanyaan: kapan SIPB dan STRB saya habis, dan apa yang harus disiapkan supaya praktik tidak putus?

Aplikasi Next.js ini menyusun sisa hari, daftar berkas perpanjangan, dan rencana minggu demi minggu dari tanggal STRB, jumlah SIPB, jenis tempat praktik, dan kredit yang sudah terkumpul. Sekali bayar Rp19.900. Bukan keputusan izin dan bukan alat gaji.

## Lokal

```bash
npm install
npm run build
```

Salin `.env.example` menjadi `.env.local` sebelum pembayaran sungguhan. Tanpa kunci Firebase, hasil tersimpan di `.data/` pada mesin ini. Tanpa kunci Midtrans, tombol bayar menjawab bahwa pembayaran belum dikonfigurasi.

## Deploy

Hanya situs ini, di proyek `skoolnow-ea6ff`, Hosting site `sipbhabis`, Firestore database `sipbhabis` (asia-southeast1). Batas biaya: minInstances 0, maxInstances 3, cpu 1, memory 512MiB.

```bash
bash scripts/deploy.sh
```

Folder kerja di mesin Windows: `C:\sipbhabis`.
