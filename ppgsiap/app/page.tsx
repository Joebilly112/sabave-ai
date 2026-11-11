import Link from "next/link";
import { HeroLembar } from "@/components/HeroLembar";
import { IntakeForm } from "@/components/IntakeForm";
import { Button, Container, Eyebrow } from "@/components/ui";
import { ARTICLES } from "@/lib/articles";
import { PRODUCT } from "@/lib/config";

const unlocks = [
  { title: "Skor kesiapan", body: "Angka dari status, lama mengajar, pendidikan, riwayat slot, dan berkas yang benar-benar ada." },
  { title: "Daftar yang bolong", body: "Berkas kunci dipisah dari pelengkap, supaya minggu pertama tidak habis di fotokopi yang salah." },
  { title: "Rencana 30 hari", body: "Empat minggu: berkas, izin mengajar, latihan uji singkat, lalu simulasi portal atau keputusan menunda." },
];

const faqs = [
  {
    q: "Apakah ini portal resmi PPG?",
    a: "Bukan. PPG Siap memperkirakan kesiapan dari isianmu. Syarat tahun berjalan tetap dibaca di edaran panitia.",
  },
  {
    q: "Apakah skor menjamin lolos?",
    a: "Tidak. Skor hanya menandai apakah slot tahun ini sudah punya berkas dan waktu, atau masih akan terpakai dalam keadaan buta.",
  },
  {
    q: "Apa yang terbuka setelah bayar?",
    a: "Skor, pita keputusan, alasan angka itu, daftar berkas bolong, dan rencana 30 hari. Sekali bayar, tanpa langganan.",
  },
];

export default function HomePage() {
  return (
    <>
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <Eyebrow>Pendidikan Profesi Guru</Eyebrow>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink md:text-5xl md:leading-[1.05]">
            Slot tahun ini siap dipakai, atau masih akan terbuang?
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
            {PRODUCT.emotion} Isi status, masa mengajar, dan berkas yang sudah di tangan. Yang terbuka: skor, daftar bolong, dan 30 hari sebelum portal ramai.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/#periksa">Periksa slot · {PRODUCT.priceLabel}</Button>
            <Button href="/artikel" tone="ghost">
              Baca dulu
            </Button>
          </div>
        </div>
        <HeroLembar />
      </Container>

      <section className="border-y border-line/80 bg-card/70">
        <Container className="grid gap-6 py-12 md:grid-cols-3">
          {unlocks.map((item) => (
            <article key={item.title}>
              <h2 className="text-lg font-bold text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
            </article>
          ))}
        </Container>
      </section>

      <Container id="periksa" className="py-16">
        <div className="mb-8 max-w-2xl">
          <Eyebrow>Isian</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Centang yang sudah ada, bukan yang diharapkan ada</h2>
          <p className="mt-3 text-mist">Kosongkan centang kalau berkas masih “nanti dicari”. Angka yang jujur lebih berguna daripada angka yang menenangkan.</p>
        </div>
        <IntakeForm />
      </Container>

      <Container className="pb-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">Sebelum membuka portal</h2>
          <Link href="/artikel" className="text-sm font-semibold text-seal">
            Semua artikel
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {ARTICLES.slice(0, 4).map((article) => (
            <li key={article.slug}>
              <Link href={`/artikel/${article.slug}`} className="block rounded-3xl border border-line bg-card p-5 hover:border-seal">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">{article.minutes} menit</p>
                <h3 className="mt-2 text-lg font-bold text-ink">{article.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{article.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">Pertanyaan singkat</h2>
        <dl className="mt-6 grid gap-4">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-3xl border border-line bg-card p-5">
              <dt className="font-bold text-ink">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-mist">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}
