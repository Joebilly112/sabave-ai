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
      <p>Dengan mengisi cek, kamu menyatakan isian itu menggambarkan perjalanan yang kamu jalani, bukan rute orang lain.</p>
      <p>Pembayaran {formatRupiah(UNLOCK_PRICE_IDR)} membuka satu hasil pada tautan itu: skor, tiga beban, dan rencana 14 hari. Ini bukan langganan dan bukan pembelian jasa medis.</p>
      <p>Angka jam setahun memakai lima hari kerja dan lima puluh dua minggu. Kalau pola kerjamu berbeda, perlakukan angka itu sebagai perkiraan.</p>
      <p>Kamu tidak boleh memakai hasil ini sebagai surat keterangan sakit, alat seleksi karyawan, atau dasar menagih gaji.</p>
      <p>Layanan dapat berubah atau berhenti. Tautan yang sudah lunas tetap diupayakan dapat dibaca selama basis data hasil masih ada.</p>
    </LegalPage>
  );
}
