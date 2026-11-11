import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Syarat",
  robots: { index: false, follow: false },
};

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat penggunaan" updated="11 November 2026">
      <p>
        SipbHabis adalah alat sekali bayar sebesar {formatRupiah(UNLOCK_PRICE_IDR)} untuk menyusun sisa hari, daftar
        berkas, dan rencana minggu dari isianmu. Dengan membayar, kamu membuka hasil untuk isian itu, bukan
        berlangganan dan bukan membeli pengurusan izin.
      </p>
      <p>
        Kamu bertanggung jawab atas kebenaran tanggal yang diketik. Hasil tidak boleh diajukan ke dinas sebagai surat
        resmi, rekomendasi organisasi profesi, atau bukti berkas sudah diperiksa.
      </p>
      <p>
        Layanan dapat berhenti sementara bila penyedia pembayaran atau penyimpanan tidak tersedia. Pengembalian dana
        mengikuti kebijakan merchant Midtrans untuk transaksi yang gagal terproses, bukan karena sisa harinya pendek.
      </p>
    </LegalPage>
  );
}
