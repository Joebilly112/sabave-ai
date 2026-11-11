import Link from "next/link";
import { Container } from "@/components/ui";

const links = [
  { href: "/tentang", label: "Tentang" },
  { href: "/artikel", label: "Artikel" },
  { href: "/privasi", label: "Privasi" },
  { href: "/syarat", label: "Syarat" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-ink text-card">
      <Container className="grid gap-8 py-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-lg font-extrabold">PPG Siap</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            Perkiraan kesiapan slot Pendidikan Profesi Guru dari berkas, masa mengajar, dan waktu 30 hari. Bukan portal resmi dan bukan jaminan lolos.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
