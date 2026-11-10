import Link from "next/link";
import { Hero } from "@/components/Hero";
import { NilaiForm } from "@/components/NilaiForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Magangworth",
  description:
    "Takut semester magang habis untuk fotokopi? Isi tugas harianmu. Sekali bayar membuka lampu nilai karier, skill minggu pertama, dan skrip renegosiasi.",
  path: "/",
});

const steps = [
  { title: "Tulis tugas yang nyata", body: "Jenis kantor, peran, bayar atau tidak, durasi, daftar harian, dan seberapa sering pembimbing muncul." },
  { title: "Lampu dihitung di server", body: "Merah, kuning, atau hijau dari komposisi tugas dan akses mentor — bukan dari brosur lowongan." },
  { title: "Buka minggu pertama", body: "Empat permintaan konkret plus kalimat sopan untuk pembimbing, setelah pembayaran QRIS." },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-8 sm:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-xl border border-line bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">0{index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold text-pine">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/80">{step.body}</p>
          </article>
        ))}
      </section>
      <section className="px-5 py-8" id="nilai">
        <NilaiForm />
      </section>
      <section className="mx-auto max-w-3xl px-5 py-10 text-sm leading-7 text-ink/80">
        <h2 className="text-2xl font-semibold tracking-tight text-pine">Satu pertanyaan</h2>
        <p className="mt-3">
          Magangworth menjawab rasa takut waktu kuliah habis untuk kerja yang tidak bisa diceritakan. Ia tidak
          membandingkan gaji, tidak menjanjikan diangkat, dan tidak menulis magangmu untukmu.
        </p>
        <p className="mt-3">
          Baca dulu catatan di <Link href="/artikel" className="font-semibold text-clay">artikel</Link> kalau kamu masih
          meraba tugas yang layak diminta.
        </p>
      </section>
    </>
  );
}
