import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ARTICLES } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Artikel PPG Siap",
  description: "Catatan singkat tentang slot PPG, urutan berkas, latihan uji, dan izin mengajar.",
  path: "/artikel",
});

export default function ArtikelIndexPage() {
  return (
    <Container className="py-16">
      <Eyebrow>Artikel</Eyebrow>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">Sebelum slot terpakai</h1>
      <ul className="mt-8 grid gap-4">
        {ARTICLES.map((article) => (
          <li key={article.slug}>
            <Link href={`/artikel/${article.slug}`} className="block rounded-3xl border border-line bg-card p-5 hover:border-seal">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                {article.published} · {article.minutes} menit
              </p>
              <h2 className="mt-2 text-2xl font-bold text-ink">{article.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
