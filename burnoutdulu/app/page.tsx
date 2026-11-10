import Link from "next/link";
import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";
import { Panel } from "@/components/ui";
import { articles } from "@/lib/articles";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

const steps = [
  {
    title: "Lima isian, tanpa nama klien",
    body: "Jam seminggu, klien aktif, tidur, hari tanpa kerja, dan sinyal tubuh yang kamu rasakan sendiri.",
  },
  {
    title: "Pita dihitung di server",
    body: "Hijau, amber, atau merah tidak ditampilkan dulu. Kamu melihat ringkasan isian, lalu membuka halamannya.",
  },
  {
    title: "Tiga hal yang dibawa pulang",
    body: "Pita risiko, rencana potong beban 14 hari, dan naskah untuk menjeda atau mengakhiri satu klien.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-4 sm:grid-cols-3">
        {steps.map((step, index) => (
          <Panel key={step.title} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rest">0{index + 1}</p>
            <h2 className="mt-3 text-lg font-semibold text-dusk">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-mute">{step.body}</p>
          </Panel>
        ))}
      </section>
      <section id="cek" className="mx-auto max-w-3xl px-5 py-10">
        <h2 className="text-3xl font-semibold tracking-tight text-dusk">Isi minggu yang menelan weekend</h2>
        <p className="mb-6 mt-2 text-sm leading-6 text-mute">
          Tidak perlu nama klien atau password apa pun. Hasil penuh terbuka setelah {formatRupiah(UNLOCK_PRICE_IDR)}.
        </p>
        <CekForm />
        <p className="mt-4 text-xs leading-5 text-mute">
          Kalau hari ini terasa tidak aman, lewati formulir dan hubungi orang terdekat atau layanan kesehatan. Into The
          Light Indonesia dan 119 ext 8 ada di luar halaman bayar.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-dusk">Bacaan sebelum kamu mengiyakan revisi lagi</h2>
          <Link href="/artikel" className="text-sm font-semibold text-rest">
            Semua artikel
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {articles.slice(0, 4).map((article) => (
            <Link key={article.slug} href={`/artikel/${article.slug}`} className="block">
              <Panel className="h-full p-5 transition hover:-translate-y-0.5">
                <p className="text-xs text-mute">{article.minutes} menit</p>
                <h3 className="mt-2 text-lg font-semibold text-dusk">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mute">{article.description}</p>
              </Panel>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
