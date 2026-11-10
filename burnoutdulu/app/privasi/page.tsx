import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privasi",
  robots: { index: false, follow: false },
};

export default function PrivasiPage() {
  return (
    <LegalPage title="Kebijakan privasi" updated="10 November 2026">
      <p>
        BurnoutDulu diselenggarakan oleh PT. Think Era Labs. Kami menyimpan jam kerja, jumlah klien, jam tidur, hari
        tanpa kerja, gejala yang kamu centang, serta pita, rencana, naskah, dan status pembayaran, supaya halaman hasil
        bisa dibuka lagi.
      </p>
      <p>
        Jangan menuliskan nama klien, nomor telepon, atau isi chat orang lain. Pembayaran diproses oleh Midtrans; kami
        menyimpan status transaksi, bukan data kartu atau saldo dompet.
      </p>
      <p>
        Jika layanan bahasa opsional aktif, naskah jeda atau selesai dikirim untuk dirapikan. Tanpa kunci layanan itu,
        naskah tetap dibuat di server kami. Layanan itu tidak boleh menambah tarif atau diagnosis.
      </p>
      <p>
        Data disimpan di Firestore bernama burnoutdulu pada proyek Firebase skoolnow-ea6ff, atau di berkas lokal saat
        kunci admin belum terpasang.
      </p>
    </LegalPage>
  );
}
