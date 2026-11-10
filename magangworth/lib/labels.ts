import type { CompanyType, PayKind, SupervisorAccess } from "@/lib/nilai";

export const COMPANY_OPTIONS: { value: CompanyType; label: string }[] = [
  { value: "startup", label: "Startup" },
  { value: "bumn", label: "BUMN" },
  { value: "korporat", label: "Korporat" },
  { value: "ngo", label: "NGO / yayasan" },
  { value: "instansi", label: "Instansi / kantor pemerintah" },
  { value: "ukm", label: "UKM / bisnis keluarga" },
];

export const PAY_OPTIONS: { value: PayKind; label: string }[] = [
  { value: "unpaid", label: "Tidak dibayar" },
  { value: "stipend", label: "Uang saku" },
  { value: "paid", label: "Dibayar" },
];

export const SUPERVISOR_OPTIONS: { value: SupervisorAccess; label: string }[] = [
  { value: "none", label: "Tidak ada pembimbing" },
  { value: "occasional", label: "Sesekali, kalau sempat" },
  { value: "weekly", label: "Rutin seminggu sekali" },
  { value: "mentor", label: "Mentor yang ikut mengerjakan" },
];

export function companyLabel(value: CompanyType): string {
  return COMPANY_OPTIONS.find((item) => item.value === value)?.label ?? value;
}

export function payLabel(value: PayKind): string {
  return PAY_OPTIONS.find((item) => item.value === value)?.label ?? value;
}

export function supervisorLabel(value: SupervisorAccess): string {
  return SUPERVISOR_OPTIONS.find((item) => item.value === value)?.label ?? value;
}
