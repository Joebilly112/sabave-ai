import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold text-night">Halaman ini tidak ada</h1>
      <p className="mt-3 text-sm text-mist">Kembali ke beranda untuk mengisi buku jaga 14 hari.</p>
      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-clay">
        Ke beranda
      </Link>
    </section>
  );
}
