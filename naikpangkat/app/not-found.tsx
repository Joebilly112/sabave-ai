import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-20">
      <h1 className="text-3xl font-extrabold">Halaman ini tidak ada</h1>
      <p className="mt-3 text-sm text-ink/65">Kembali ke beranda untuk menyusun daftar berkas.</p>
      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-stamp">
        Ke beranda
      </Link>
    </Container>
  );
}
