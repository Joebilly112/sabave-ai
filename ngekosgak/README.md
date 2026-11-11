# NgekosGak

Putusan sekali bayar untuk komuter: tetap pulang-pergi, ngekos dekat kantor, atau kos di hari kerja dan rumah di akhir pekan.

- Domain: ngekosgak.id
- URL publik: https://ngekosgak.web.app
- Harga buka: Rp14.900
- Firebase project: skoolnow-ea6ff
- Hosting site dan Firestore database: ngekosgak
- Wilayah: asia-southeast1
- Batas instance: min 0, max 3, 1 CPU, 512 MiB

Bahasa antarmuka Indonesia. Gaji bersih hanya pembanding patokan 20% ongkos jalan, bukan alat pembanding gaji.

```bash
npm install
npm run build
npm run dev
```

Salin `.env.example` menjadi `.env.local` untuk kunci server. Tanpa Firebase Admin, isian tersimpan di `.data/cek.json`. Tanpa `DEEPSEEK_API_KEY`, paragraf putusan tetap dari templat lokal.

Deploy situs ini saja, setelah Hosting site dan database Firestore `ngekosgak` ada:

```bash
npm run deploy
```
