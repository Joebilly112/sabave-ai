import type { ReactNode } from "react";
import { Container } from "@/components/ui";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Container className="py-16">
      <article className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink">{title}</h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-mist">{children}</div>
      </article>
    </Container>
  );
}
