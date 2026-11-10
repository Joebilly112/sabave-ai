import type { Metadata } from "next";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Tentang",
  description: "BurnoutDulu membaca beban freelancer, bukan tarif dan bukan diagnosis.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-dusk">Satu pertanyaan: masih kuat, atau sudah menguras?</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          BurnoutDulu untuk freelancer yang bekerja setiap weekend, mengiyakan setiap revisi, dan tetap merasa kosong
          saat dana masuk. Pertanyaannya satu: apakah pola minggu ini sudah mengarah ke burnout.
        </p>
        <p>
          Kamu mengisi jam, jumlah klien aktif, tidur, hari tanpa kerja, dan sinyal tubuh. Server menghitung pita hijau,
          amber, atau merah. Setelah {formatRupiah(UNLOCK_PRICE_IDR)} kamu mendapat rencana potong beban 14 hari dan
          naskah untuk menjeda atau mengakhiri satu klien.
        </p>
        <p>
          Ini bukan alat tarif, bukan pembanding penghasilan, dan bukan pemeriksaan klinis. Kalau gejala terasa berat
          atau kamu tidak merasa aman, berbicara dengan tenaga kesehatan lebih penting daripada membuka pita.
        </p>
        <p>Diselenggarakan oleh PT. Think Era Labs. Domain burnoutdulu.id. Tampilan publik di https://burnoutdulu.web.app.</p>
      </div>
    </article>
  );
}
