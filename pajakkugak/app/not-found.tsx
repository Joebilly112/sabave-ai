import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stamp">Tidak ada di map</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-pine">Halaman ini tidak ada</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Putusan musim lapor hanya hidup di tautan yang dibuat dari formulir.</p>
      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-moss underline">
        Kembali ke beranda
      </Link>
    </section>
  );
}
