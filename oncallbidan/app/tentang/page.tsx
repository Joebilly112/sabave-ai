import type { Metadata } from "next";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export const metadata: Metadata = {
  title: "Tentang",
  description: "OnCallBidan membantu bidan melihat beban jaga malam dan menulis batas, tanpa mengaku sebagai nasihat medis.",
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">Satu pertanyaan: apakah malam ini sudah terlalu rapat?</h1>
      <div className="mt-8 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          OnCallBidan untuk bidan yang selesai persalinan malam atau siaga tanpa jam tutup. Yang diukur hanya pola 14
          hari yang kamu isi: malam on-call, persalinan lewat tengah malam, jam tidur, cadangan, dan gejala yang kamu
          rasakan.
        </p>
        <p>
          Buka hasil sekali bayar {formatRupiah(UNLOCK_PRICE_IDR)}. Kamu mendapat pita aman, waspada, atau kritis, jumlah
          malam yang dilindungi dua minggu ke depan, dan dua naskah: satu ke pasien, satu ke rekan cadangan.
        </p>
        <p>
          Skala pita dibuat situs ini supaya jeda punya angka, bukan standar organisasi profesi dan bukan diagnosis.
          Persalinan yang sudah berjalan tidak diminta untuk ditolak. Kalau kamu tidak aman menolong, berhenti dan
          hubungi rekan atau faskes.
        </p>
        <p>Situs ini berdiri sendiri. Tidak menaut ke produk lain, dan tidak menghitung gaji atau tarif praktik.</p>
      </div>
    </article>
  );
}
