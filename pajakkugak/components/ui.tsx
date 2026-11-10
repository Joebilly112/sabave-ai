import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-line bg-paper shadow-slip ${className}`}>{children}</div>
  );
}

export function Button({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-full bg-pine px-5 py-3 text-sm font-semibold text-paper transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
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
      <span className="text-sm font-semibold text-pine">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-mute">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const control =
  "w-full rounded-2xl border border-line bg-ledger px-4 py-3 text-sm text-ink outline-none ring-brass focus:ring-2";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${control} ${props.className || ""}`} />;
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${control} ${props.className || ""}`} />;
}

export function Stamp({ children, tilt = -8 }: { children: ReactNode; tilt?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full border-2 border-stamp px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-stamp"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {children}
    </span>
  );
}
