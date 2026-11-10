import Link from "next/link";
import { Hero } from "@/components/Hero";
import { KasusForm } from "@/components/KasusForm";
import { Panel } from "@/components/ui";
import { articles } from "@/lib/articles";

const steps = [
  {
    title: "Ceritakan brief-nya",
    body: "Sumber klien, persen DP, kontrak, revisi, jadwal bayar, dan tanda yang sudah terasa.",
  },
  {
    title: "Skor dihitung di server",
    body: "Angka risiko hantu tidak ditampilkan dulu. Kamu melihat ringkasan brief, lalu membuka hasilnya.",
  },
  {
    title: "Bawa pulang tiga hal",
    body: "Skor, checklist kontrak minimum, dan pesan sopan untuk minta DP sebelum kickoff.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-8 sm:grid-cols-3">
        {steps.map((step, index) => (
          <Panel key={step.title} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">0{index + 1}</p>
            <h2 className="mt-3 text-lg font-semibold text-night">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-mute">{step.body}</p>
          </Panel>
        ))}
      </section>
      <section id="cek" className="mx-auto max-w-3xl px-5 py-8">
        <h2 className="text-3xl font-semibold tracking-tight text-night">Masukkan brief yang sedang mengganjal</h2>
        <p className="mt-2 mb-6 text-sm leading-6 text-mute">
          Tidak perlu nama klien. Yang dipakai hanya pola kerjanya. Hasil penuh terbuka setelah Rp19.900.
        </p>
        <KasusForm />
      </section>
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-night">Bacaan sebelum kamu membalas chat</h2>
          <Link href="/artikel" className="text-sm font-semibold text-flare">
            Semua artikel
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} href={`/artikel/${article.slug}`} className="block">
              <Panel className="h-full p-5 transition hover:-translate-y-0.5">
                <p className="text-xs text-mute">{article.minutes} menit</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-night">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mute">{article.description}</p>
              </Panel>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
