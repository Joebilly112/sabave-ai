import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privasi",
  robots: { index: false, follow: false },
};

export default function PrivasiPage() {
  return (
    <LegalPage title="Privasi" updated="11 November 2026">
      <p>
        OnCallBidan menyimpan jumlah malam on-call, jumlah persalinan lewat tengah malam, jam tidur, status cadangan,
        gejala yang kamu centang, dan status pembayaran supaya halaman hasil bisa dibuka lagi. Kami tidak meminta nama
        pasien, nomor rekam medis, atau identitas bidan.
      </p>
      <p>
        Jika Firebase Admin dikonfigurasi, data itu berada di database Firestore bernama oncallbidan pada proyek
        skoolnow-ea6ff. Tanpa kunci admin, salinan lokal hanya ada di mesin yang menjalankan aplikasi.
      </p>
      <p>
        Pembayaran diproses oleh Midtrans. Kami menyimpan status transaksi dan tautan pembayaran, bukan PIN atau detail
        rekening. Analitik hanya mencatat nama peristiwa dan jalur halaman.
      </p>
      <p>Naskah batas tidak dikirim ke siapa pun. Kamu yang menyalinnya jika ingin dipakai.</p>
    </LegalPage>
  );
}
