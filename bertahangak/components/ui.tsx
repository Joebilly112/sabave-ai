import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "quiet" }) {
  const look =
    variant === "primary"
      ? "bg-lantern text-sand shadow-glow hover:bg-clay"
      : "bg-white text-sea ring-1 ring-line hover:bg-foam";
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${look} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-sea">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-mute">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const controlClass =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none ring-tide/30 transition focus:ring-4";
