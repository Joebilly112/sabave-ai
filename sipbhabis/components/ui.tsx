import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import type { DocState, UrgencyId } from "@/lib/types";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-stamp px-5 py-3 text-sm font-semibold text-paper shadow-stamp transition hover:bg-night disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-[28px] border border-line bg-paper shadow-card ${className}`}>{children}</div>;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 text-mute">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const control =
  "w-full rounded-2xl border border-line bg-mist px-4 py-3 text-sm text-ink outline-none ring-tide/30 focus:ring-2";

export function SelectInput({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`${control} ${className}`} {...props} />;
}

export function TextInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${control} ${className}`} {...props} />;
}

export function UrgencyPill({ urgency, children }: { urgency: UrgencyId | "kunci"; children: ReactNode }) {
  const tone =
    urgency === "longgar"
      ? "bg-[#d9f3ef] text-tide"
      : urgency === "susun"
        ? "bg-[#efe4ff] text-plum"
        : urgency === "dekat"
          ? "bg-[#fff1d6] text-[#8a5a10]"
          : urgency === "ketat" || urgency === "lewat"
            ? "bg-[#ffe1e4] text-stamp"
            : "bg-mist text-mute";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{children}</span>;
}

export function DocMark({ state }: { state: DocState }) {
  const tone = state === "siap" ? "bg-tide" : state === "cek" ? "bg-gold" : "bg-stamp";
  const label = state === "siap" ? "Tercatat" : state === "cek" ? "Cocokkan" : "Susun dulu";
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-mute">
      <span className={`h-2.5 w-2.5 rounded-full ${tone}`} />
      {label}
    </span>
  );
}
