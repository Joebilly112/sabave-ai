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
        PraktikSiap menyimpan isian kesiapan map — lama praktik, tempat kerja, status STRB dan SIPB, tempat, alat,
        limbah, rekomendasi IBI — beserta status pembayaran supaya halaman hasil bisa dibuka lagi. Kami tidak meminta
        nama pasien, rekam medis, atau alamat lengkap rumah.
      </p>
      <p>
        Jika Firebase Admin dikonfigurasi, data itu berada di database Firestore bernama praktiksiap pada proyek
        skoolnow-ea6ff. Tanpa kunci admin, salinan lokal hanya ada di mesin yang menjalankan aplikasi dan tidak
        diunggah.
      </p>
      <p>
        Pembayaran diproses oleh Midtrans. Kami menyimpan status transaksi dan tautan pembayaran, bukan PIN atau
        detail rekening. Analitik hanya mencatat nama peristiwa (halaman dibuka, formulir dikirim, pembayaran lunas)
        dan jalur halaman.
      </p>
      <p>
        Catatan untuk loket boleh dipoles oleh model bahasa jika kunci DeepSeek diisi. Yang dikirim adalah draf
        catatan, lama praktik, tempat kerja, dan lampu kesiapan, bukan identitas pasien.
      </p>
    </LegalPage>
  );
}
