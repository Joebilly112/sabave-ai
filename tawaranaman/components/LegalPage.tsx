import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sea">Dokumen</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-deep">{title}</h1>
      <p className="mt-3 text-sm text-mute">Diperbarui {updated}</p>
      <div className="mt-8 space-y-4 text-[15px] leading-7 text-ink/90">{children}</div>
    </article>
  );
}
