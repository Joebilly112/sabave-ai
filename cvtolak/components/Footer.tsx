import Link from "next/link";

const links = [
  { href: "/tentang", label: "Tentang" },
  { href: "/artikel", label: "Artikel" },
  { href: "/privasi", label: "Privasi" },
  { href: "/syarat", label: "Syarat" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookie", label: "Cookie" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>CVtolak · PT. Think Era Labs · cvtolak.id</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
