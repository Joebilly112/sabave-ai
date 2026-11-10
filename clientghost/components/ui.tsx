import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Button({
  children,
  variant = "solid",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "ghost" }) {
  const look =
    variant === "solid"
      ? "bg-flare text-white hover:bg-[#be4520] disabled:bg-flare/50"
      : "bg-transparent text-night ring-1 ring-line hover:bg-mist disabled:opacity-50";
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed ${look} ${props.className || ""}`}
    >
      {children}
    </button>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[28px] border border-line bg-paper shadow-slip ${className}`}>{children}</div>;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-night">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-mute">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function Stamp({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-flare/30 bg-[#fff1ea] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-flare">
      {children}
    </span>
  );
}
