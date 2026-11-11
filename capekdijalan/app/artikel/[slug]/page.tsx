import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: "Artikel" };
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: absoluteUrl(`/artikel/${article.slug}`) },
    openGraph: { title: article.title, description: article.description, type: "article" },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const published = new Date(article.publishedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <Link href="/artikel" className="text-sm font-semibold text-indigo">
        Semua artikel
      </Link>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-night">{article.title}</h1>
      <p className="mt-3 text-sm text-mute">
        {published} · {article.minutes} menit baca
      </p>
      <div className="mt-8 space-y-4 text-[15px] leading-7 text-ink/90">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
