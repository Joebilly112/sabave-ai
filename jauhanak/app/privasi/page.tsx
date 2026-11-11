import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privasi",
  robots: { index: false, follow: false },
};

export default function PrivasiPage() {
  return (
    <LegalPage title="Kebijakan privasi" updated="11 November 2026">
      <p>
        JauhAnak diselenggarakan oleh PT. Think Era Labs. Kami menyimpan usia anak, lama terpisah, peran pengasuh,
        irama dan lama panggilan, jenis isi obrolan, tanda yang kamu centang, sisa kontrak, serta pita, kebiasaan,
        rencana, naskah, dan status pembayaran, supaya halaman hasil bisa dibuka lagi.
      </p>
      <p>
        Jangan menuliskan nama anak, nama pengasuh, nomor telepon, atau alamat. Pembayaran diproses oleh Midtrans; kami
        menyimpan status transaksi, bukan data kartu atau saldo dompet.
      </p>
      <p>
        Jika layanan bahasa opsional aktif, naskah untuk pengasuh dikirim untuk dirapikan. Tanpa kunci layanan itu,
        naskah tetap dibuat di server kami. Layanan itu tidak boleh menambah tuduhan atau diagnosis.
      </p>
      <p>
        Data disimpan di Firestore bernama jauhanak pada proyek Firebase skoolnow-ea6ff, atau di berkas lokal saat kunci
        admin belum terpasang.
      </p>
    </LegalPage>
  );
}
