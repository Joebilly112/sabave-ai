import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tentang Pelatihan Mana",
  description: "Kenapa produk ini hanya menjawab satu pertanyaan: pelatihan kompetensi perawat yang mana berikutnya.",
  path: "/tentang",
});

export default function TentangPage() {
  return (
    <Container className="py-16">
      <article className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">Tentang</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-paper">Satu rasa takut ketinggalan sertifikat.</h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-mist">
          <p>
            Pelatihan Mana dibuat untuk perawat yang melihat ICU, BTCLS, dan perawatan luka lewat bergiliran di grup, lalu tidak tahu mana yang benar-benar mengubah karier dengan waktu dan uang yang terbatas.
          </p>
          <p>
            Kamu memasukkan unit sekarang, lama kerja, sertifikat yang sudah dipegang, dan tujuan setahun ke depan: bangsal, ICU, komunitas, atau jalur luar negeri. Setelah pembayaran sekali, kamu mendapat tiga pelatihan terurut, alasan masing-masing, perkiraan biaya waktu, dan yang sebaiknya ditunda.
          </p>
          <p>
            Urutan disusun dari aturan yang bisa dijelaskan, bukan dari iklan lembaga. Kalau kunci model bahasa tersedia di server, kalimat alasannya bisa dipoles — nama dan urutannya tetap. Tidak ada unggah ijazah, tidak ada hitung gaji, dan tidak ada janji mutasi atau keberangkatan.
          </p>
          <p>Harga buka hasil: Rp19.900, sekali.</p>
        </div>
      </article>
    </Container>
  );
}
