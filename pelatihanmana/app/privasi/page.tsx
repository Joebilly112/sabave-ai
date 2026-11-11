import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privasi",
  description: "Apa yang disimpan Pelatihan Mana.",
  path: "/privasi",
  noindex: true,
});

export default function PrivasiPage() {
  return (
    <LegalPage title="Privasi">
      <p>
        Formulir menyimpan nama panggilan jika kamu mengisinya, unit, lama kerja, sertifikat yang kamu centang, tujuan karier, dan urutan pelatihan yang dihasilkan. Data itu dipakai untuk menampilkan hasil setelah pembayaran.
      </p>
      <p>
        Kami tidak meminta unggahan ijazah, STR, atau identitas pasien. Pembayaran diproses oleh Midtrans; nomor kartu atau saldo e-wallet tidak melewati server aplikasi ini.
      </p>
      <p>
        Catatan kunjungan anonim (halaman yang dibuka) dapat disimpan untuk memahami halaman mana yang dipakai. Tidak ada iklan pihak ketiga di situs ini.
      </p>
    </LegalPage>
  );
}
