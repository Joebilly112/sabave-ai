import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-asphalt">Halaman tidak ada</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Tautan hasil hanya hidup untuk isian yang baru saja disusun.</p>
      <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-road">
        Kembali ke beranda
      </Link>
    </section>
  );
}
