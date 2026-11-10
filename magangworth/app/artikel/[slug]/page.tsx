import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) {
    return buildMetadata({ title: "Artikel", description: "Tidak ditemukan.", path: "/artikel", noindex: true });
  }
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/artikel/${article.slug}`,
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/artikel" className="text-sm font-semibold text-clay">
        Semua artikel
      </Link>
      <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-pine">{article.title}</h1>
      <p className="mt-3 text-sm text-mute">
        {article.publishedAt} · {article.readingMinutes} menit baca
      </p>
      <div className="mt-8 space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold tracking-tight text-pine">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-3 text-[15px] leading-7 text-ink/90">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
