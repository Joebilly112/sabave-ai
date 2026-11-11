# JauhAnak

Pita kedekatan untuk orang tua yang kerja jauh dari anak: dekat, renggang, atau perlu perhatian. Sekali bayar Rp14.900. Bukan diagnosis dan bukan alat gaji.

Domain: jauhanak.id  
URL publik: https://jauhanak.web.app  
Firebase project: skoolnow-ea6ff  
Hosting site: jauhanak  
Firestore database: jauhanak (asia-southeast1)

Folder lokal deploy: `C:\jauhanak`

Tampilan: malam jendela dan lampu hangat. Ungu senja, kertas krem, kuning lampu.

## Skrip

```bash
npm install
npm run build
```

`npm run deploy` hanya men-deploy hosting target `jauhanak` di proyek `skoolnow-ea6ff`. Situs Hosting dan database Firestore harus sudah ada.

Batas biaya di `apphosting.yaml` dan `firebase.json`: minInstances 0, maxInstances 3, cpu 1, memory 512MiB, region asia-southeast1.

## Isi produk

Isian: usia anak, lama terpisah, pengasuh (pasangan, nenek, saudara), frekuensi dan lama panggilan, isi obrolan, tanda (menolak telepon, nilai turun, marah, menarik diri), sisa kontrak. Hasil terbuka setelah bayar: pita, tiga kebiasaan, rencana mingguan sesuai usia, dan naskah untuk pengasuh. DeepSeek opsional hanya merapikan naskah itu.
