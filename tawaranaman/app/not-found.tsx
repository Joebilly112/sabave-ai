import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-20">
      <h1 className="text-3xl font-semibold text-deep">Halaman tidak ketemu</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Laporan itu tidak ada, atau tautannya salah.</p>
      <Link href="/#cek" className="mt-6 inline-block text-sm font-semibold text-sea">
        Kembali ke cek tawaran
      </Link>
    </section>
  );
}
