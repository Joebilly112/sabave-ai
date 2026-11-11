import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackView } from "@/components/TrackView";
import { Container } from "@/components/ui";
import { ARTICLES, getArticle } from "@/lib/articles";
import { articleJsonLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return pageMeta({ title: "Artikel", description: "Tidak ditemukan.", path: "/artikel", noindex: true });
  return pageMeta({
    title: article.title,
    description: article.description,
    path: `/artikel/${article.slug}`,
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  return (
    <>
      <TrackView path={`/artikel/${article.slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: articleJsonLd({
            title: article.title,
            description: article.description,
            path: `/artikel/${article.slug}`,
            date: article.date,
          }),
        }}
      />
      <Container className="max-w-3xl py-14">
        <Link href="/artikel" className="text-sm font-semibold text-ink/50">
          Artikel
        </Link>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight">{article.title}</h1>
        <p className="mt-3 text-sm text-ink/50">
          {article.date} · {article.minutes} menit baca
        </p>
        <div className="mt-8 space-y-8">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-extrabold">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-[15px] leading-7 text-ink/75">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
