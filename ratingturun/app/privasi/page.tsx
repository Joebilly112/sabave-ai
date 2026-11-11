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
        RatingTurun menyimpan platform, rating, pola batal, keluhan yang kamu centang, jumlah order tujuh hari, dan
        status pembayaran supaya halaman hasil bisa dibuka lagi. Kami tidak meminta nama penumpang, plat nomor, atau
        kata sandi aplikasi ojek.
      </p>
      <p>
        Jika Firebase Admin dikonfigurasi, data itu berada di database Firestore bernama ratingturun pada proyek
        skoolnow-ea6ff. Tanpa kunci admin, salinan lokal hanya ada di mesin yang menjalankan aplikasi.
      </p>
      <p>
        Pembayaran diproses oleh Midtrans. Kami menyimpan status transaksi dan tautan pembayaran, bukan PIN atau
        detail dompet. Analitik hanya mencatat nama peristiwa (halaman dibuka, formulir dikirim, pembayaran lunas)
        dan jalur halaman.
      </p>
      <p>
        Naskah penumpang boleh dipoles oleh model bahasa jika kunci DeepSeek diisi. Yang dikirim adalah draf naskah
        beserta platform, rating, dan jenis keluhan, bukan identitas penumpang.
      </p>
    </LegalPage>
  );
}
