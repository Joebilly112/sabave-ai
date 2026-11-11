"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ATTEMPTS, DOCUMENTS, EDUCATION, EMPLOYMENT, type DocumentId, type Intake } from "@/lib/types";
import { openSnap } from "@/components/snap";
import { Button, Field, fieldClass } from "@/components/ui";
import { PRODUCT } from "@/lib/config";

type PayResponse = {
  id?: string;
  token?: string | null;
  clientKey?: string;
  isProduction?: boolean;
  error?: string;
};

const emptyDocs = Object.fromEntries(DOCUMENTS.map((doc) => [doc.id, false])) as Record<DocumentId, boolean>;

export function IntakeForm() {
  const router = useRouter();
  const [employment, setEmployment] = useState<Intake["employment"] | "">("");
  const [education, setEducation] = useState<Intake["education"] | "">("");
  const [attempts, setAttempts] = useState<Intake["attempts"] | "">("");
  const [years, setYears] = useState("6");
  const [documents, setDocuments] = useState<Record<DocumentId, boolean>>(emptyDocs);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function toggle(id: DocumentId) {
    setDocuments((current) => ({ ...current, [id]: !current[id] }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!employment || !education || attempts === "") {
      setError("Lengkapi status, pendidikan, dan riwayat percobaan.");
      return;
    }
    const parsedYears = Number(years);
    if (!Number.isInteger(parsedYears) || parsedYears < 0 || parsedYears > 45) {
      setError("Lama mengajar diisi angka bulat antara 0 dan 45.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employment, education, attempts, years: parsedYears, documents }),
      });
      const payload = (await response.json()) as PayResponse;
      if (!response.ok || !payload.id) {
        setError(payload.error ?? "Isian belum bisa diproses.");
        return;
      }
      if (payload.token && payload.clientKey) {
        try {
          await openSnap({
            token: payload.token,
            clientKey: payload.clientKey,
            isProduction: Boolean(payload.isProduction),
            onDone: () => router.push(`/hasil/${payload.id}`),
          });
        } catch {
          router.push(`/hasil/${payload.id}`);
        }
        return;
      }
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Jaringan terputus. Coba kirim lagi.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-line bg-card p-5 shadow-folder md:p-7">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Status kepegawaian" hint="Mengubah jenis surat yang perlu disiapkan, bukan nilai kelulusan.">
          <select className={fieldClass} value={employment} onChange={(event) => setEmployment(event.target.value as Intake["employment"])}>
            <option value="">Pilih status</option>
            {EMPLOYMENT.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Lama mengajar" hint="Tahun penuh. Isi 0 jika belum pernah mengajar.">
          <input className={fieldClass} inputMode="numeric" value={years} onChange={(event) => setYears(event.target.value)} />
        </Field>
        <Field label="Pendidikan terakhir">
          <select className={fieldClass} value={education} onChange={(event) => setEducation(event.target.value as Intake["education"])}>
            <option value="">Pilih pendidikan</option>
            {EDUCATION.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Percobaan PPG sebelumnya">
          <select
            className={fieldClass}
            value={attempts === "" ? "" : String(attempts)}
            onChange={(event) => setAttempts(event.target.value === "" ? "" : (Number(event.target.value) as Intake["attempts"]))}
          >
            <option value="">Pilih riwayat</option>
            {ATTEMPTS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-ink">Berkas yang sudah kamu pegang</legend>
        <p className="mt-1 text-xs text-mist">Centang hanya yang benar-benar ada, bukan yang “nanti dicari”.</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {DOCUMENTS.map((doc) => (
            <li key={doc.id}>
              <label className="flex items-start gap-3 rounded-2xl border border-line bg-white px-3 py-3 text-sm text-ink">
                <input
                  type="checkbox"
                  className="mt-1 accent-seal"
                  checked={documents[doc.id]}
                  onChange={() => toggle(doc.id)}
                />
                <span>
                  {doc.label}
                  {doc.critical ? <span className="mt-0.5 block text-xs text-stamp">Berkas kunci</span> : null}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {error ? <p className="mt-4 text-sm font-medium text-stamp">{error}</p> : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyusun lembar…" : `Buka lembar · ${PRODUCT.priceLabel}`}
        </Button>
        <p className="text-xs leading-relaxed text-mist">Sekali bayar. Skor, daftar bolong, dan rencana 30 hari terbuka di halaman hasil.</p>
      </div>
    </form>
  );
}
