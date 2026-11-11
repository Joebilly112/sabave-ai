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
      <Link href="/artikel" className="text-sm font-semibold text-tide">
        Semua artikel
      </Link>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-sea">{article.title}</h1>
      <p className="mt-3 text-sm text-mute">
        {article.publishedAt} · {article.minutes} menit baca
      </p>
      <div className="mt-8 space-y-4 text-[15px] leading-7 text-ink">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
