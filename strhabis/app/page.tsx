import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="cek" className="mx-auto max-w-3xl px-5 pb-20">
        <h2 className="text-2xl font-semibold text-seal">Tanggal di kartu, bukan tebakan</h2>
        <p className="mt-2 mb-6 text-sm leading-6 text-mute">
          Empat isian. Hasilnya mengurutkan apa yang kamu siapkan sebelum SDM bertanya lagi.
        </p>
        <CekForm />
      </section>
    </>
  );
}
