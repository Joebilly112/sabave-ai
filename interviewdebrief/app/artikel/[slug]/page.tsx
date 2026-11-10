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
  if (!article) return { title: "Artikel tidak ditemukan" };
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
      <p className="text-xs text-mute">
        <Link href="/artikel" className="hover:text-ink">Artikel</Link>
        {" · "}
        {article.publishedAt} · {article.readingMinutes} menit baca
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{article.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-mute">{article.description}</p>
      <div className="mt-10 space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-[15px] leading-7">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
