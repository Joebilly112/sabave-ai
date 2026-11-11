import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles.find((item) => item.slug === params.slug);
  if (!article) return { title: "Artikel" };
  return { title: article.title, description: article.description };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((item) => item.slug === params.slug);
  if (!article) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs text-mute">
        {article.publishedAt} · {article.minutes} menit baca
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-deep">{article.title}</h1>
      <p className="mt-4 text-base leading-7 text-mute">{article.description}</p>
      <div className="mt-8 space-y-4 text-[15px] leading-7 text-ink/90">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-8 text-sm text-mute">
        Ini bacaan, bukan penetapan resmi.{" "}
        <Link href="/#cek" className="font-semibold text-sea">
          Cek tawaran
        </Link>
        .
      </p>
    </article>
  );
}
