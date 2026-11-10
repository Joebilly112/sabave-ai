import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privasi",
  robots: { index: false, follow: false },
};

export default function PrivasiPage() {
  return (
    <LegalPage title="Privasi" updated="10 November 2026">
      <p>
        ShiftRusak menyimpan isian dinas, commute, tidur, kafein, gejala yang kamu centang, dan status pembayaran
        supaya halaman hasil bisa dibuka lagi. Kami tidak meminta nama pasien, nomor rekam medis, atau identitas
        rekan kerja.
      </p>
      <p>
        Jika Firebase Admin dikonfigurasi, data itu berada di database Firestore bernama shiftrusak pada proyek
        skoolnow-ea6ff. Tanpa kunci admin, salinan lokal hanya ada di mesin yang menjalankan aplikasi dan tidak
        diunggah.
      </p>
      <p>
        Pembayaran diproses oleh Midtrans. Kami menyimpan status transaksi dan tautan pembayaran, bukan PIN atau
        detail rekening. Analitik hanya mencatat nama peristiwa (halaman dibuka, formulir dikirim, pembayaran
        lunas) dan jalur halaman.
      </p>
      <p>
        Naskah ke kepala ruangan boleh dipoles oleh model bahasa jika kunci DeepSeek diisi. Yang dikirim adalah
        draf naskah beserta jumlah malam, jam tidur, dan menit commute, bukan riwayat pasien.
      </p>
    </LegalPage>
  );
}
