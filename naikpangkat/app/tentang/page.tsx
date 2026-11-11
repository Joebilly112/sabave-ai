import { TrackView } from "@/components/TrackView";
import { Container } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Tentang",
  description: "NaikPangkat menyusun daftar berkas kenaikan pangkat dari data yang Anda isi sendiri.",
  path: "/tentang",
});

export default function TentangPage() {
  return (
    <>
      <TrackView path="/tentang" />
      <Container className="max-w-3xl py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Tentang</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Satu rasa: map pangkat yang tidak jelas.</h1>
        <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/75">
          <p>
            NaikPangkat dibuat untuk ASN yang masa kerjanya sudah terasa cukup, tetapi tidak yakin lembar mana yang
            masih kurang. BKD mengembalikan berkas, grup mengirim foto edaran yang terpotong, dan mapnya makin tebal
            tanpa makin jelas.
          </p>
          <p>
            Anda mengisi status PNS atau PPPK, golongan, lama di golongan itu, jenis jabatan, dan tahun SK terakhir.
            Setelah {SITE.priceLabel}, halaman hasil menampilkan daftar berkas, alasan penolakan yang sering muncul pada
            profil itu, dan perkiraan jendela setor.
          </p>
          <p>
            Ini informasi untuk menyusun map, bukan penetapan kepegawaian dan bukan layanan yang menguruskan berkas
            Anda. Tanggal resmi tetap ada di edaran instansi. Produk ini juga tidak membandingkan penghasilan.
          </p>
          <p>NaikPangkat diterbitkan oleh PT. Think Era Labs untuk naikpangkat.id.</p>
        </div>
      </Container>
    </>
  );
}
