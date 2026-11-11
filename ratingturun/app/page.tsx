import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";

const STEPS = [
  {
    title: "Pita, bukan vonis",
    body: "Aman, waspada, atau kritis disusun dari rating, batal, keluhan, dan order yang selesai. Bukan ambang rahasia aplikasi.",
  },
  {
    title: "Dua puluh order",
    body: "Empat blok kerja: hentikan batal baru, rapikan keluhan yang berulang, latih kalimat pendek, tutup tanpa memohon bintang.",
  },
  {
    title: "Di motor, bukan di chat panjang",
    body: "Tiga naskah untuk helm, rute, atau suasana tegang. Kamu yang mengucapkan. Penumpang tidak dipaksa memberi ulasan.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="cek" className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-asphalt">Isi minggu yang membuat bintang terasa licin</h2>
          <p className="mt-3 text-sm leading-6 text-mute">
            Cukup kondisi yang kamu ingat. Tidak perlu unggah tangkapan layar, nama penumpang, atau kata sandi aplikasi.
          </p>
          <ol className="mt-6 space-y-4">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-road">0{index + 1}</p>
                <p className="mt-1 font-semibold text-asphalt">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-mute">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <CekForm />
      </section>
    </>
  );
}
