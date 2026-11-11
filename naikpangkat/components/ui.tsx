import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>;
}

export function Pill({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "stamp" | "pine" | "brass" }) {
  const tones = {
    ink: "bg-ink text-paper",
    stamp: "bg-stamp text-white",
    pine: "bg-pine text-white",
    brass: "bg-brass/15 text-brass",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "ghost";
};

export function Button({ href, variant = "primary", className = "", children, ...props }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-stamp text-white hover:bg-[#9d1e15]"
      : "bg-transparent text-ink ring-1 ring-ink/15 hover:bg-ink/5";
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-ink/55">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const control =
  "w-full rounded-2xl border border-ink/10 bg-white px-3 py-3 text-sm text-ink outline-none ring-stamp/30 focus:ring-2";

export function SelectField(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${control} ${props.className ?? ""}`} />;
}

export function FolderFrame({
  tab,
  children,
  stamp,
}: {
  tab: string;
  children: ReactNode;
  stamp?: string;
}) {
  return (
    <div className="relative">
      <div className="ml-4 inline-flex rounded-t-xl bg-manila px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/70">
        {tab}
      </div>
      <div className="relative rounded-[28px] rounded-tl-none border border-[#d9c7a4] bg-manila p-4 shadow-[0_20px_50px_rgba(27,39,64,0.12)] sm:p-5">
        {stamp ? (
          <div className="pointer-events-none absolute right-5 top-5 rotate-[-8deg] rounded-md border-2 border-stamp px-2 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-stamp">
            {stamp}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
