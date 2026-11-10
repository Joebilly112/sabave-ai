import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-20 text-center">
      <h1 className="text-3xl font-semibold text-ward">Halaman tidak ada</h1>
      <p className="mt-3 text-sm text-mute">Hasil itu tidak tersimpan, atau tautannya salah.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-lamp px-5 py-3 text-sm font-semibold text-ward">
        Kembali ke dinas
      </Link>
    </section>
  );
}
