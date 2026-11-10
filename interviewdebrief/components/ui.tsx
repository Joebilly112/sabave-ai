import type { ButtonHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from "react";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  children,
  variant = "solid",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "ghost"; children: ReactNode }) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "solid" ? "bg-ink text-paper hover:bg-moss" : "bg-transparent text-ink hover:bg-white/60",
        className,
      )}
      {...props}
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
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs text-mute">{hint}</span> : null}
    </label>
  );
}

const control =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-mute/70 focus:border-amber";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={control} {...props} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(control, "min-h-36 resize-y leading-relaxed")} {...props} />;
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={control} {...props} />;
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-mute">
      {children}
    </span>
  );
}

export function ScoreBar({ label, score, note }: { label: string; score: number; note?: string }) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
        <span className="font-semibold">{label}</span>
        <span className="tabular-nums text-mute">{score}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-ink" style={{ width: `${score}%` }} />
      </div>
      {note ? <p className="mt-2 text-sm leading-relaxed text-mute">{note}</p> : null}
    </div>
  );
}
