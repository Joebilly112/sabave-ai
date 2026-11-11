import { Clock3, ListOrdered, ShieldOff } from "lucide-react";
import { FauxBoard } from "@/components/FauxBoard";
import { IntakeForm } from "@/components/IntakeForm";
import { Container, Eyebrow } from "@/components/ui";
import { ARTICLES } from "@/lib/articles";
import Link from "next/link";

const steps = [
  {
    icon: ListOrdered,
    title: "Isi unit, masa kerja, sertifikat, tujuan",
    body: "Bangsal, ICU, komunitas, atau jalur luar negeri tidak membaca CV yang sama.",
  },
  {
    icon: ShieldOff,
    title: "Bayar sekali Rp19.900",
    body: "QRIS atau e-wallet. Tidak ada langganan dan tidak ada unggahan berkas.",
  },
  {
    icon: Clock3,
    title: "Terima tiga giliran plus yang ditunda",
    body: "Setiap pelatihan punya alasan dan biaya waktu. Satu dua yang ramai sengaja tidak diambil sekarang.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="pb-8 pt-14 sm:pt-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow>Untuk perawat yang sertifikatnya keburu ramai</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-paper sm:text-6xl">
              Pelatihan mana yang berikutnya, kalau cuti dan uangmu cuma cukup untuk satu?
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
              ICU, BTCLS, perawatan luka — semuanya terasa wajib. Kamu dapat urutan tiga yang paling menggeser tujuanmu, plus yang sebaiknya ditunda musim ini.
            </p>
            <p className="mt-4 text-sm font-semibold text-lime">Sekali buka · Rp19.900</p>
          </div>
          <FauxBoard />
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="rounded-[24px] border border-line bg-panel/70 p-5">
              <step.icon className="h-5 w-5 text-lime" aria-hidden />
              <h2 className="mt-4 text-lg font-bold text-paper">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{step.body}</p>
            </article>
          ))}
        </Container>
      </section>

      <section id="pilih" className="scroll-mt-20 py-8">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Satu emosi, satu keputusan</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-paper">Berhenti menambah sertifikat yang tidak mengubah dinasmu.</h2>
            <p className="mt-4 text-mist leading-relaxed">
              Ini bukan katalog lembaga pelatihan dan bukan hitungan gaji. Kamu menjawab empat hal tentang kerja sekarang. Hasilnya mengurutkan giliran belajar, dengan waktu yang harus kamu sisihkan, dan nama yang boleh kamu abaikan dulu.
            </p>
          </div>
          <IntakeForm />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-paper">Bacaan sebelum transfer</h2>
            <Link href="/artikel" className="text-sm font-semibold text-lime">
              Semua artikel
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {ARTICLES.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/artikel/${article.slug}`}
                className="rounded-[24px] border border-line bg-ink/40 p-5 transition hover:border-lime/50"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-mist">{article.readingMinutes} menit</p>
                <h3 className="mt-3 text-lg font-bold text-paper">{article.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{article.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
