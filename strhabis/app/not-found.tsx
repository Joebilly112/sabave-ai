import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold text-seal">Halaman ini tidak ada</h1>
      <p className="mt-3 text-sm text-mute">Kembali ke beranda untuk mengisi tanggal STR.</p>
      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-stamp">
        Ke beranda
      </Link>
    </section>
  );
}
