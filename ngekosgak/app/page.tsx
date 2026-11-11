import { CekForm } from "@/components/CekForm";
import { Hero } from "@/components/Hero";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CekForm />
      <section className="mx-auto mt-16 grid max-w-6xl gap-4 px-5 sm:grid-cols-3">
        {[
          ["Uang sebulan", "Ongkos jalan, sewa, makan pengganti, cucian, dan ongkos pulang ke rumah."],
          ["Jam setahun", "Berapa lama tubuhmu ada di jalan, bukan berapa gaji yang “sepadan”."],
          ["Tidur pagi", "Perkiraan jam bangun yang bergeser kalau hari kerja dekat kantor."],
        ].map(([title, copy]) => (
          <article key={title} className="rounded-2xl border border-mist bg-ticket/70 p-5">
            <h2 className="font-semibold text-soot">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-mute">{copy}</p>
          </article>
        ))}
      </section>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-sm text-mute">
        Baca dulu{" "}
        <Link href="/artikel/patokan-ongkos-jalan" className="font-semibold text-rail underline">
          cara membaca patokan 20 persen
        </Link>{" "}
        supaya angkanya tidak terasa seperti perintah.
      </p>
    </>
  );
}
