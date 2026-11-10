import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ScanForm } from "@/components/ScanForm";
import { articles } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CVtolak",
  description:
    "Kenapa lamaranmu tidak dibalas? Tempel CV dan peran target. Sekali bayar membuka celah kata kunci, tanda format, ringkasan baru, dan daftar simpan / potong / tambah.",
  path: "/",
});

const steps = [
  { n: "01", title: "Tempel yang kamu kirim", body: "Teks CV, peran yang dilamar, dan lama pengalaman. Satu peran, bukan sepuluh." },
  { n: "02", title: "Halaman dibaca seperti saringan", body: "Kata peran dicocokkan. Format yang pecah, tujuan yang umum, dan angka yang hilang ditandai." },
  { n: "03", title: "Buka daftar yang bisa dikerjakan", body: "Ringkasan baru plus simpan, potong, tambah. Bukan janji dipanggil wawancara." },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:grid-cols-3">
        {steps.map((step) => (
          <article key={step.n} className="rounded-3xl border border-line bg-card/80 p-5">
            <p className="text-xs font-semibold tracking-[0.16em] text-tide">{step.n}</p>
            <h2 className="mt-2 text-lg font-semibold">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mute">{step.body}</p>
          </article>
        ))}
      </section>
      <section className="px-5 py-6">
        <ScanForm />
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Catatan untuk yang sudah lelah mengirim</h2>
          <Link href="/artikel" className="text-sm font-semibold text-tide">
            Semua artikel
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} href={`/artikel/${article.slug}`} className="rounded-3xl border border-line bg-card p-5 hover:border-tide">
              <p className="text-xs text-mute">{article.readingMinutes} menit</p>
              <h3 className="mt-2 font-semibold leading-snug">{article.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{article.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
