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
        PraktikSiap adalah alat sekali bayar sebesar {formatRupiah(UNLOCK_PRICE_IDR)} untuk menyusun lampu kesiapan,
        daftar kekurangan, dan rencana 30 hari dari isianmu. Dengan membayar, kamu membuka hasil untuk isian itu, bukan
        berlangganan dan bukan membeli pendampingan izin.
      </p>
      <p>
        Kamu bertanggung jawab atas kebenaran isian. Hasil tidak boleh diajukan ke dinas sebagai surat resmi, rekomendasi
        organisasi profesi, atau bukti sarana sudah diperiksa.
      </p>
      <p>
        Layanan dapat berhenti sementara bila penyedia pembayaran atau penyimpanan tidak tersedia. Pengembalian dana
        mengikuti kebijakan merchant Midtrans untuk transaksi yang gagal terproses, bukan karena lampu hasilnya merah.
      </p>
    </LegalPage>
  );
}
