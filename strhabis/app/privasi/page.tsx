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
        STRHabis menyimpan tanggal STR, status SIP, jenis tempat praktik, jumlah kredit SKP yang kamu ketik, dan
        status pembayaran supaya halaman hasil bisa dibuka lagi. Kami tidak meminta nama pasien, nomor rekam medis,
        atau NIK.
      </p>
      <p>
        Jika Firebase Admin dikonfigurasi, data itu berada di database Firestore bernama strhabis pada proyek
        skoolnow-ea6ff. Tanpa kunci admin, salinan lokal hanya ada di mesin yang menjalankan aplikasi.
      </p>
      <p>
        Pembayaran diproses oleh Midtrans. Kami menyimpan status transaksi dan tautan pembayaran, bukan PIN atau
        detail rekening. Analitik hanya mencatat nama peristiwa dan jalur halaman.
      </p>
      <p>
        Catatan pembuka rencana boleh dipoles oleh model bahasa jika kunci DeepSeek diisi. Yang dikirim adalah draf
        catatan, tanggal habis, sisa hari, status SIP, dan jumlah kredit, bukan identitas pasien.
      </p>
    </LegalPage>
  );
}
