import { Clock3, ListChecks, ShieldAlert } from "lucide-react";
import { HeroDesk } from "@/components/HeroDesk";
import { IntakeForm } from "@/components/IntakeForm";
import { Container, Eyebrow } from "@/components/ui";
import { PRODUCT } from "@/lib/config";

const unlocks = [
  {
    icon: ListChecks,
    title: "Tujuan, langkah, asesmen",
    text: "Tiga bagian yang besok pagi benar-benar kamu pakai, disesuaikan dengan jenjang, mapel, topik, dan jumlah siswa.",
  },
  {
    icon: Clock3,
    title: "Checklist sesuai menitmu",
    text: "Daftar kerja malam ini mengikuti menit yang masih tersisa, bukan jumlah halaman pada format ideal.",
  },
  {
    icon: ShieldAlert,
    title: "Lampu merah pengawas",
    text: "Kalimat yang sering bikin rencana terlihat kosong: tujuan tidak teramati, inti yang hanya LKS, waktu yang tidak dijumlahkan.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroDesk />
      <section className="py-8">
        <Container className="grid gap-4 md:grid-cols-3">
          {unlocks.map((item) => (
            <article key={item.title} className="rounded-3xl border border-line bg-white/50 p-5">
              <item.icon className="h-5 w-5 text-pine" />
              <h2 className="mt-3 text-lg font-extrabold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{item.text}</p>
            </article>
          ))}
        </Container>
      </section>
      <section id="mulai" className="py-12">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Eyebrow>Satu pertemuan, malam ini</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Isi kelas besok, bukan biodatamu.</h2>
            <p className="mt-4 text-base leading-relaxed text-mist">
              {PRODUCT.emotion} Setelah bayar {PRODUCT.priceLabel}, kerangka terbuka di halaman hasil dan bisa disalin ke dokumen sekolah.
            </p>
          </div>
          <IntakeForm />
        </Container>
      </section>
    </>
  );
}
