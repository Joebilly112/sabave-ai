import Link from "next/link";
import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";
import { Panel } from "@/components/ui";
import { articles } from "@/lib/articles";

const steps = [
  {
    title: "Empat isian, tanpa nama klien",
    body: "Omzet bruto setahun, status NPWP, ada tidaknya potongan PPh, dan pita Rp500 juta / Rp4,8 miliar.",
  },
  {
    title: "Peta dihitung di server",
    body: "Putusan tidak ditampilkan dulu. Kamu melihat ringkasan isian, lalu membuka slipnya.",
  },
  {
    title: "Tiga hal yang dibawa pulang",
    body: "Wajib, mungkin, atau belum tentu. Jalur formulir. Checklist dokumen plus pesan minta bukti potong.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-8 sm:grid-cols-3">
        {steps.map((step, index) => (
          <Panel key={step.title} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">0{index + 1}</p>
            <h2 className="mt-3 text-lg font-semibold text-pine">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-mute">{step.body}</p>
          </Panel>
        ))}
      </section>
      <section id="cek" className="mx-auto max-w-3xl px-5 py-8">
        <h2 className="text-3xl font-semibold tracking-tight text-pine">Isi yang membuatmu begadang di Maret</h2>
        <p className="mb-6 mt-2 text-sm leading-6 text-mute">
          Tidak perlu NPWP, nama klien, atau password DJP. Hasil penuh terbuka setelah Rp24.900.
        </p>
        <CekForm />
      </section>
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-pine">Bacaan sebelum linimasa makin ramai</h2>
          <Link href="/artikel" className="text-sm font-semibold text-moss">
            Semua artikel
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} href={`/artikel/${article.slug}`} className="block">
              <Panel className="h-full p-5">
                <p className="text-xs text-mute">{article.minutes} menit</p>
                <h3 className="mt-2 text-lg font-semibold text-pine">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mute">{article.description}</p>
              </Panel>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
