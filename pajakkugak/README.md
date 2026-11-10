# PajakKuGak

Slip musim lapor untuk freelancer: wajib lapor, mungkin, atau belum tentu. Sekali bayar Rp24.900. Bukan nasihat pajak dan bukan layanan DJP.

Domain: pajakkugak.id  
URL publik: https://pajakkugak.web.app  
Firebase project: skoolnow-ea6ff  
Hosting site: pajakkugak  
Firestore database: pajakkugak (asia-southeast1)

Folder lokal deploy: `C:\pajakkugak`

## Skrip

```bash
npm install
npm run build
```

`npm run deploy` hanya men-deploy hosting target `pajakkugak` di proyek `skoolnow-ea6ff`. Situs Hosting dan database Firestore harus sudah ada.

Batas biaya di `apphosting.yaml` dan `firebase.json`: minInstances 0, maxInstances 3, cpu 1, memory 512MiB, region asia-southeast1.
