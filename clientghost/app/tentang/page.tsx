import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tentang",
  description: "ClientGhost membantu freelancer membaca risiko klien menghilang sebelum membayar.",
  alternates: { canonical: absoluteUrl("/tentang") },
};

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flare">Tentang</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">Satu pertanyaan: apakah klien ini akan kabur sebelum bayar?</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          ClientGhost untuk freelancer yang memegang brief samar, belum memegang DP, dan takut mengerjakan sesuatu yang
          tidak pernah ditransfer. Produk ini tidak membandingkan tarif dan tidak menyarankan angka penghasilan.
        </p>
        <p>
          Kamu memasukkan dari mana klien datang, persen DP, ada tidaknya kontrak, aturan revisi, jadwal bayar, dan tanda
          yang sudah terasa. Setelah Rp19.900, kamu mendapat skor risiko hantu, checklist kontrak minimum, dan pesan
          sopan untuk meminta DP sebelum kickoff.
        </p>
        <p>
          Skor disusun dari pola-pola itu, bukan dari nama orang. Pesan pembuka bisa dipoles oleh model bahasa bila kunci
          layanan itu terpasang; tanpa kunci, pesan tetap memakai template di server. Ini alat kehati-hatian kerja, bukan
          pendapat pengacara.
        </p>
        <p>Diselenggarakan oleh PT. Think Era Labs. Pembayaran sekali lewat Midtrans (QRIS atau e-wallet).</p>
      </div>
    </article>
  );
}
