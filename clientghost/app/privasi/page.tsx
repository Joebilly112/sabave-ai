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
        ClientGhost diselenggarakan oleh PT. Think Era Labs. Kami menyimpan isian brief (sumber klien, persen DP, status
        kontrak, aturan revisi, jadwal bayar, dan tanda yang kamu centang) beserta status pembayaran, agar halaman hasil
        bisa dibuka lagi.
      </p>
      <p>
        Jangan memasukkan nama lengkap, nomor telepon, atau alamat klien. Kami tidak meminta akun media sosial. Pembayaran
        diproses oleh Midtrans; kami menyimpan status transaksi, bukan data kartu.
      </p>
      <p>
        Jika layanan bahasa opsional aktif, pola brief yang sudah terstruktur dikirim untuk memoles kalimat pesan DP.
        Tanpa kunci layanan itu, pesan tetap dibuat di server kami.
      </p>
      <p>Data disimpan di Firestore bernama clientghost pada proyek Firebase skoolnow-ea6ff, atau di berkas lokal saat kunci admin belum terpasang.</p>
    </LegalPage>
  );
}
