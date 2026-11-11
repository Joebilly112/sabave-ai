import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: "Artikel" };
  return { title: article.title, description: article.description };
}

export default function ArtikelPage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">{article.minutes} menit baca</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-soot">{article.title}</h1>
      <p className="mt-3 text-sm text-mute">{article.publishedAt}</p>
      <div className="mt-8 space-y-4 text-[15px] leading-7 text-ink/90">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link href="/artikel" className="mt-10 inline-block text-sm font-semibold text-rail underline">
        Semua artikel
      </Link>
    </article>
  );
}
