import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { ARTICLES } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Artikel Pelatihan Mana",
  description: "Catatan untuk perawat yang memilih pelatihan berikutnya tanpa ikut semua poster yang lewat.",
  path: "/artikel",
});

export default function ArtikelIndexPage() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-extrabold tracking-tight text-paper">Artikel</h1>
      <p className="mt-3 max-w-2xl text-mist">Lima catatan pendek sebelum kamu membayar pelatihan yang sedang ramai.</p>
      <div className="mt-8 grid gap-4">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/artikel/${article.slug}`}
            className="rounded-[24px] border border-line bg-panel/60 p-5 transition hover:border-lime/40"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-mist">
              {article.date} · {article.readingMinutes} menit
            </p>
            <h2 className="mt-2 text-2xl font-bold text-paper">{article.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">{article.description}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
