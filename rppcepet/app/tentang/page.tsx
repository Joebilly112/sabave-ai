import { Container } from "@/components/ui";
import { PRODUCT } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tentang RPP Cepet",
  description: "RPP Cepet menyusun kerangka satu pertemuan untuk guru yang besok sudah mengajar dan malam ini kehabisan waktu.",
  path: "/tentang",
});

export default function TentangPage() {
  return (
    <Container className="py-16">
      <article className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight">Tentang RPP Cepet</h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-mist">
          <p>
            {PRODUCT.name} menjawab satu pertanyaan: {PRODUCT.question} Harganya {PRODUCT.priceLabel}, sekali bayar.
          </p>
          <p>
            Kamu memasukkan jenjang, mata pelajaran, kurikulum, topik, jumlah siswa, dan berapa menit yang masih tersisa
            malam ini. Yang terbuka setelah pembayaran adalah kerangka tujuan, langkah, asesmen, checklist pengerjaan,
            dan daftar lampu merah. Bukan RPP jadi yang ditandatangani orang lain, dan bukan layanan yang mengajar
            menggantikanmu.
          </p>
          <p>
            Durasi kelas pada kerangka mengikuti kelaziman jenjang (misalnya dua jam pelajaran). Silakan ubah jika jadwal
            sekolahmu berbeda. Guru tetap yang menyesuaikan dengan modul, kondisi kelas, dan format yang diminta.
          </p>
        </div>
      </article>
    </Container>
  );
}
