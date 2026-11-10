import type { Metadata } from "next";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Tentang",
  description: "ShiftRusak membaca 14 hari dinas perawat dan menyusun permintaan roster, bukan diagnosis.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-night">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ward">Untuk perawat yang flip malam ke pagi</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          ShiftRusak menjawab satu pertanyaan: apakah pola dinas 14 hari terakhir menggeser tidurmu. Kamu mengisi
          pagi, siang, malam, atau libur, lalu commute, jam tidur, kafein, dan gejala yang benar-benar terasa.
        </p>
        <p>
          Sekali bayar {formatRupiah(UNLOCK_PRICE_IDR)} membuka skor gangguan ritme, usulan tujuh hari dengan malam
          yang perlu dilindungi, dan naskah ke kepala ruangan. Tidak ada langganan dan tidak ada pembahasan gaji.
        </p>
        <p>
          Hasilnya adalah bahan bicara, bukan jadwal resmi dan bukan nasihat medis. Kalau tubuhmu tidak aman untuk
          berdinas, minta bantuan di ruangan dan ke layanan kesehatan, terpisah dari alat ini.
        </p>
      </div>
    </article>
  );
}
