import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privasi",
  robots: { index: false, follow: false },
};

export default function PrivasiPage() {
  return (
    <LegalPage title="Kebijakan privasi" updated="11 November 2026">
      <p>BertahanGak menyimpan isian cek situasi untuk menyusun pita dan, jika kamu membayar, untuk membuka laporan yang sama lagi lewat tautan hasil.</p>
      <p>Isian mencakup negara, sektor, lama kerja, sisa kontrak, status gaji, libur, paspor, kekerasan, tidur dan perasaan, serta utang agensi. Jangan menulis nama, alamat rumah, atau nomor paspor di kolom negara.</p>
      <p>Data disimpan di basis data aplikasi. Tanpa kunci server, salinan lokal hanya ada di mesin yang menjalankan aplikasi dan tidak dibuka ke publik.</p>
      <p>Pembayaran diproses oleh Midtrans. Kami menerima status transaksi, bukan kode dompetmu. Analitik hanya mencatat jenis peristiwa dan jalur halaman, tanpa isi formulir.</p>
      <p>Tautan hasil bersifat rahasia. Jangan meneruskannya ke majikan atau grup yang tidak kamu percaya.</p>
    </LegalPage>
  );
}
