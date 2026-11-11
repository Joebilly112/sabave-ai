import { FileStack, Clock3, ShieldCheck } from "lucide-react";
import { BerkasForm } from "@/components/BerkasForm";
import { Hero } from "@/components/Hero";
import { TrackView } from "@/components/TrackView";
import { Container } from "@/components/ui";
import { pageMeta, websiteJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "NaikPangkat — berkas yang masih kurang",
  description: SITE.description,
  path: "/",
});

const steps = [
  {
    icon: FileStack,
    title: "Isi yang tertera di SK",
    body: "PNS atau PPPK, golongan, lama di pangkat, jenis jabatan, dan tahun SK terakhir.",
  },
  {
    icon: Clock3,
    title: "Lihat yang masih mengambang",
    body: "Daftar berkas mengikuti jalur itu, plus alasan BKD sering mengembalikan map serupa.",
  },
  {
    icon: ShieldCheck,
    title: "Tahu jendela setornya",
    body: "Perkiraan waktu masuk sebelum periode berikutnya. Edaran instansi Anda tetap yang mengunci tanggalnya.",
  },
];

export default function HomePage() {
  return (
    <>
      <TrackView path="/" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteJsonLd() }} />
      <Hero />
      <section className="border-y border-ink/10 bg-white/50">
        <Container className="grid gap-6 py-12 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title}>
              <step.icon className="h-5 w-5 text-stamp" aria-hidden />
              <h2 className="mt-3 text-lg font-extrabold">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">{step.body}</p>
            </article>
          ))}
        </Container>
      </section>
      <section id="mulai" className="scroll-mt-6 py-14">
        <Container>
          <BerkasForm />
        </Container>
      </section>
      <section className="pb-16">
        <Container className="rounded-[28px] bg-ink px-6 py-8 text-paper sm:px-8">
          <h2 className="text-2xl font-extrabold">Yang tidak dijanjikan</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-paper/75 md:grid-cols-2">
            <li>Bukan surat keputusan BKN atau BKD, dan bukan jasa pengurusan berkas.</li>
            <li>Bukan hitungan gaji, tunjangan, atau perbandingan penghasilan.</li>
            <li>Perkiraan April dan Oktober memakai patokan umum, lalu harus dicocokkan dengan edaran instansi.</li>
            <li>Satu kali {SITE.priceLabel}. Tidak ada langganan dan tidak ada unggahan NIP.</li>
          </ul>
        </Container>
      </section>
    </>
  );
}
