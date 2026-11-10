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
        PajakKuGak diselenggarakan oleh PT. Think Era Labs. Kami menyimpan omzet bruto, status NPWP, status pemotongan,
        pita omzet, serta putusan dan status pembayaran, supaya halaman slip bisa dibuka lagi.
      </p>
      <p>
        Jangan memasukkan nama klien, nomor NPWP, nomor telepon, atau password DJP. Pembayaran diproses oleh Midtrans;
        kami menyimpan status transaksi, bukan data kartu atau saldo dompet.
      </p>
      <p>
        Jika layanan bahasa opsional aktif, draf pesan minta bukti potong dikirim untuk dirapikan. Tanpa kunci layanan
        itu, pesan tetap dibuat di server kami. Tarif dan angka tidak boleh ditambahkan oleh layanan itu.
      </p>
      <p>
        Data disimpan di Firestore bernama pajakkugak pada proyek Firebase skoolnow-ea6ff, atau di berkas lokal saat kunci
        admin belum terpasang.
      </p>
    </LegalPage>
  );
}
