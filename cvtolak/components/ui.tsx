import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  children,
  variant = "solid",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "ghost" | "tide"; children: ReactNode }) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "solid" && "bg-ink text-paper hover:bg-signal",
        variant === "tide" && "bg-tide text-white hover:bg-ink",
        variant === "ghost" && "bg-transparent text-ink hover:bg-white/70",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs leading-relaxed text-mute">{hint}</span> : null}
    </label>
  );
}

const control =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-mute/70 focus:border-tide";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={control} {...props} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(control, "min-h-40 resize-y leading-relaxed")} {...props} />;
}

export function Pill({ children, tone = "mute" }: { children: ReactNode; tone?: "mute" | "signal" | "tide" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "mute" && "border-line bg-card text-mute",
        tone === "signal" && "border-signal/30 bg-signal/10 text-signal",
        tone === "tide" && "border-tide/30 bg-tide/10 text-tide",
      )}
    >
      {children}
    </span>
  );
}
