import Link from "next/link";
import { Container } from "@/components/ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-mist">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Pelatihan Mana. Bantuan pilih pelatihan, bukan lembaga sertifikasi.</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/privasi" className="hover:text-paper">
            Privasi
          </Link>
          <Link href="/syarat" className="hover:text-paper">
            Syarat
          </Link>
          <Link href="/disclaimer" className="hover:text-paper">
            Disclaimer
          </Link>
          <Link href="/kontak" className="hover:text-paper">
            Kontak
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
