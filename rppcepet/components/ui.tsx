import type { ReactNode } from "react";
import Link from "next/link";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">{children}</p>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  tone?: "pine" | "ink" | "ghost";
};

const tones: Record<NonNullable<ButtonProps["tone"]>, string> = {
  pine: "bg-pine text-sheet hover:bg-[#174a3c]",
  ink: "bg-ink text-sheet hover:bg-black",
  ghost: "bg-transparent text-ink ring-1 ring-ink/15 hover:bg-white/60",
};

export function Button({ children, href, type = "button", disabled, onClick, tone = "pine" }: ButtonProps) {
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
      {hint ? <span className="mt-1 block text-xs text-mist">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const fieldClass =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none ring-lamp/40 placeholder:text-mist/70 focus:ring-2";
