import type { ReactNode } from "react";
import Link from "next/link";

export function Container({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`mx-auto w-full max-w-6xl px-5 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.2em] text-seal">{children}</p>;
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  tone?: "seal" | "ink" | "ghost";
};

const tones: Record<NonNullable<ButtonProps["tone"]>, string> = {
  seal: "bg-seal text-card hover:bg-[#0c5855]",
  ink: "bg-ink text-card hover:bg-black",
  ghost: "bg-transparent text-ink ring-1 ring-ink/15 hover:bg-white",
};

export function Button({ children, href, type = "button", disabled, onClick, tone = "seal" }: ButtonProps) {
  const className = `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${tones[tone]}`;
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-relaxed text-mist">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const fieldClass =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none ring-seal/30 placeholder:text-mist/60 focus:ring-2";
