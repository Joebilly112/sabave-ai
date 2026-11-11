import { Container } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="py-20">
      <h1 className="text-4xl font-extrabold text-paper">Halaman tidak ada</h1>
      <p className="mt-3 text-mist">Kembali ke beranda untuk menyusun giliran pelatihan.</p>
      <Link href="/" className="mt-6 inline-block font-semibold text-lime">
        Ke beranda
      </Link>
    </Container>
  );
}
