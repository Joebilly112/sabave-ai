import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "quiet" }) {
  const look =
    variant === "primary"
      ? "bg-soot text-ticket hover:bg-rail"
      : "bg-ticket text-soot ring-1 ring-mist hover:bg-white";
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${look} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-soot">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-mute">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const controlClass =
  "w-full rounded-xl border border-mist bg-white px-4 py-3 text-sm text-ink outline-none ring-dawn/40 transition focus:ring-4";
