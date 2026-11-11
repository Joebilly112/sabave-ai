import Link from "next/link";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime/90">{children}</p>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "lime" | "ghost";
};

export function Button({ href, variant = "lime", className = "", children, ...props }: ButtonProps) {
  const styles =
    variant === "lime"
      ? "bg-lime text-ink hover:bg-[#e4ff7a]"
      : "border border-line bg-transparent text-paper hover:border-mist";
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-paper">{label}</span>
      {children}
      {hint ? <span className="mt-2 block text-xs text-mist/80">{hint}</span> : null}
    </label>
  );
}

const control =
  "w-full rounded-2xl border border-line bg-ink px-4 py-3 text-sm text-paper outline-none ring-lime/0 transition focus:border-lime focus:ring-2 focus:ring-lime/40";

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${control} ${props.className ?? ""}`} />;
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${control} ${props.className ?? ""}`} />;
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] border border-line bg-panel shadow-card ${className}`}>{children}</div>
  );
}
