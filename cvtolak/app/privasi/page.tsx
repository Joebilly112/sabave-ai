import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privasi",
  description: "Cara CVtolak menyimpan teks CV dan status pembayaran.",
  path: "/privasi",
  noindex: true,
});

export default function PrivasiPage() {
  return (
    <LegalPage title="Kebijakan privasi" updated="10 November 2026">
      <p>
        CVtolak dioperasikan PT. Think Era Labs. Halaman ini menjelaskan data yang diproses saat kamu meminta audit CV
        di cvtolak.id dan di https://cvtolak.web.app.
      </p>
      <p>
        Yang kamu kirim: teks CV, nama peran, dan lama pengalaman. Teks itu disimpan supaya halaman hasil bisa
        dibuka lagi setelah pembayaran. Jangan tempel nomor identitas, rekening, atau rahasia perusahaan.
      </p>
      <p>
        Pembayaran diproses Midtrans. Kami menyimpan status transaksi dan nomor pesanan, bukan PIN atau detail kartu.
        Jika kunci model bahasa dipasang di server, cuplikan CV dapat dikirim ke penyedia itu hanya untuk merapikan
        kalimat hasil. Tanpa kunci tersebut, pembacaan tetap berjalan di server kami.
      </p>
      <p>
        Kami tidak menjual teks CV. Akses basis data ditutup untuk klien publik. Log kunjungan yang kami simpan hanya
        nama peristiwa dan jalur halaman, tanpa isi CV.
      </p>
      <p>
        Untuk permintaan hapus atas satu hasil, simpan tautan /hasil/ tersebut sebagai bukti kepemilikan. Kami dapat
        menolak permintaan yang tidak bisa dihubungkan ke audit itu.
      </p>
    </LegalPage>
  );
}
