import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { PRODUCT } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tentang PPG Siap",
  description: "Alat sekali bayar untuk guru yang takut menyia-nyiakan slot PPG tahun ini.",
  path: "/tentang",
});

export default function TentangPage() {
  return (
    <Container className="py-16">
      <article className="max-w-3xl">
        <Eyebrow>Tentang</Eyebrow>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">Satu pertanyaan: slot ini siap, atau belum?</h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-mist">
          <p>
            {PRODUCT.name} dibuat untuk guru yang sudah keburu harap-harap cemas. Portal belum tentu dibuka, tetapi grup sekolah sudah ramai. Yang ditanyakan hanya satu: apakah tahun ini berkas dan waktu mengajarmu cukup, atau slot akan terpakai dalam keadaan buta.
          </p>
          <p>
            Isiannya pendek: status kepegawaian, lama mengajar, pendidikan, berapa kali sudah mencoba, dan centang berkas yang benar-benar ada. Setelah {PRODUCT.priceLabel}, lembar menampilkan skor, daftar yang masih bolong, dan rencana 30 hari.
          </p>
          <p>
            Angka itu perkiraan, bukan syarat resmi dan bukan nilai uji. Kalimat di lembar tidak menjanjikan kelulusan. Edaran panitia tahun berjalan tetap yang menentukan berkas mana yang wajib.
          </p>
          <p>Halaman ini tidak membandingkan gaji, tidak menjual bimbel, dan tidak menghubungkanmu ke layanan lain.</p>
        </div>
      </article>
    </Container>
  );
}
