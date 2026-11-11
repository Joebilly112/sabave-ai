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
        NgekosGak menyimpan isian perjalanan yang kamu kirim: daerah rumah, daerah kantor, moda, menit, ongkos, hari
        kerja, gaji bersih, anggaran kos, dan centang tentang rumah. Gaji dipakai hanya untuk patokan ongkos jalan di
        laporan itu.
      </p>
      <p>
        Data disimpan di Firestore nama basis data ngekosgak pada proyek Firebase skoolnow-ea6ff, atau di berkas lokal
        server jika kredensial admin belum diisi. Pembayaran diproses Midtrans. Kami tidak menerima nomor kartu di
        server aplikasi ini.
      </p>
      <p>
        Peristiwa analitik yang disimpan terbatas pada tampilan halaman, pengiriman isian, dan pembayaran yang lunas,
        beserta jalur halaman. Tidak ada iklan dan tidak ada penjualan data.
      </p>
      <p>Untuk meminta penghapusan satu laporan, sertakan tautan /hasil yang kamu terima saat menghubungi operator.</p>
    </LegalPage>
  );
}
