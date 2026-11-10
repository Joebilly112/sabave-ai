# BurnoutDulu

Pita beban untuk freelancer: hijau, amber, atau merah. Sekali bayar Rp14.900. Bukan diagnosis medis dan bukan alat tarif.

Domain: burnoutdulu.id  
URL publik: https://burnoutdulu.web.app  
Firebase project: skoolnow-ea6ff  
Hosting site: burnoutdulu  
Firestore database: burnoutdulu (asia-southeast1)

Folder lokal deploy: `C:\burnoutdulu`

## Skrip

```bash
npm install
npm run build
```

`npm run deploy` hanya men-deploy hosting target `burnoutdulu` di proyek `skoolnow-ea6ff`. Situs Hosting dan database Firestore harus sudah ada.

Batas biaya di `apphosting.yaml` dan `firebase.json`: minInstances 0, maxInstances 3, cpu 1, memory 512MiB, region asia-southeast1.
