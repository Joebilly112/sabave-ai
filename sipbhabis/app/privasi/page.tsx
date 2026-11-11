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
        SipbHabis menyimpan tanggal terbit dan habis STRB, jumlah SIPB, jenis tempat praktik, dan jumlah kredit yang
        kamu ketik, beserta status pembayaran supaya halaman hasil bisa dibuka lagi. Kami tidak meminta nama pasien,
        rekam medis, nomor STR, atau alamat rumah.
      </p>
      <p>
        Jika Firebase Admin dikonfigurasi, data itu berada di database Firestore bernama sipbhabis pada proyek
        skoolnow-ea6ff. Tanpa kunci admin, salinan lokal hanya ada di mesin yang menjalankan aplikasi dan tidak
        diunggah.
      </p>
      <p>
        Pembayaran diproses oleh Midtrans. Kami menyimpan status transaksi dan tautan pembayaran, bukan PIN atau detail
        rekening. Analitik hanya mencatat nama peristiwa (halaman dibuka, formulir dikirim, pembayaran lunas) dan jalur
        halaman.
      </p>
      <p>
        Pesan untuk HRD atau loket boleh dipoles oleh model bahasa jika kunci DeepSeek diisi. Yang dikirim adalah draf
        pesan, sisa hari, jenis tempat, jumlah SIPB, dan angka kredit, bukan identitas pasien.
      </p>
    </LegalPage>
  );
}
