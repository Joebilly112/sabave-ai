import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { ARTICLES, getArticle } from "@/lib/articles";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return pageMetadata({ title: "Artikel", noindex: true });
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/artikel/${article.slug}`,
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  return (
    <Container className="py-16">
      <article className="max-w-3xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }} />
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          {article.published} · {article.minutes} menit
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">{article.title}</h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-mist">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </Container>
  );
}
