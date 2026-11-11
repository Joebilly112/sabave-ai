import { JENJANG, KURIKULUM, type Intake, type Jenjang, type Kurikulum } from "@/lib/types";

function text(value: unknown, min: number, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (trimmed.length < min || trimmed.length > max) return null;
  return trimmed;
}

function whole(value: unknown, min: number, max: number): number | null {
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isInteger(number) || number < min || number > max) return null;
  return number;
}

export function parseIntake(body: unknown): Intake | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const jenjang = raw.jenjang;
  const kurikulum = raw.kurikulum;
  if (typeof jenjang !== "string" || !JENJANG.includes(jenjang as Jenjang)) return null;
  if (typeof kurikulum !== "string" || !KURIKULUM.includes(kurikulum as Kurikulum)) return null;
  const mapel = text(raw.mapel, 2, 80);
  const topik = text(raw.topik, 2, 140);
  const jumlahSiswa = whole(raw.jumlahSiswa, 1, 60);
  const menitTersedia = whole(raw.menitTersedia, 15, 180);
  if (!mapel || !topik || jumlahSiswa === null || menitTersedia === null) return null;
  return {
    jenjang: jenjang as Jenjang,
    mapel,
    kurikulum: kurikulum as Kurikulum,
    topik,
    jumlahSiswa,
    menitTersedia,
  };
}
