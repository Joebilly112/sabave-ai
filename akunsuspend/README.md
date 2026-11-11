# AkunSuspend

Langkah banding untuk mitra ojek yang akunnya kena suspend. Sekali bayar Rp19.900. Bukan keputusan platform dan bukan alat tarif.

Domain: akunsuspend.id  
URL publik: https://akunsuspend.web.app  
Firebase project: skoolnow-ea6ff  
Hosting site: akunsuspend  
Firestore database: akunsuspend (asia-southeast1)

Folder lokal deploy: `C:\akunsuspend`

## Skrip

```bash
npm install
npm run build
```

`npm run deploy` hanya men-deploy hosting target `akunsuspend` di proyek `skoolnow-ea6ff`. Situs Hosting dan database Firestore harus sudah ada.

Batas biaya di `apphosting.yaml` dan `firebase.json`: minInstances 0, maxInstances 3, cpu 1, memory 512MiB, region asia-southeast1.
