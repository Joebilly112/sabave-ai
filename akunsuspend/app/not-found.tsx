import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flare">Tidak ketemu</p>
      <h1 className="mt-3 text-3xl font-semibold text-night">Halaman ini tidak ada.</h1>
      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-night underline">
        Kembali ke beranda
      </Link>
    </section>
  );
}
