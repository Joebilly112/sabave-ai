export const SIP_IDS = ["aktif", "proses", "belum", "tidak_tahu"] as const;
export const PLACE_IDS = ["rs_pemerintah", "rs_swasta", "klinik", "puskesmas", "mandiri"] as const;
export const BANDS = ["longgar", "siaga", "mepet", "lewat"] as const;

export type SipId = (typeof SIP_IDS)[number];
export type PlaceId = (typeof PLACE_IDS)[number];
export type BandId = (typeof BANDS)[number];

export type CekInput = {
  issuedOn: string;
  expiresOn: string;
  sip: SipId;
  place: PlaceId;
  skp: number;
};

export type DocItem = {
  title: string;
  detail: string;
  tone: "siap" | "cek" | "kosong";
};

export type WeekStep = {
  label: string;
  title: string;
  detail: string;
};

export type CekResult = {
  daysLeft: number;
  band: BandId;
  bandLabel: string;
  headline: string;
  countdownLabel: string;
  documents: DocItem[];
  weeks: WeekStep[];
  note: string;
  assumptions: string[];
};

export type StoredCek = {
  id: string;
  orderId: string;
  status: "pending" | "paid";
  createdAt: string;
  paidAt: string | null;
  input: CekInput;
  result: CekResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};

export const SIP_LABEL: Record<SipId, string> = {
  aktif: "SIP masih aktif",
  proses: "SIP sedang diproses",
  belum: "Belum punya SIP",
  tidak_tahu: "Tidak ingat status SIP",
};

export const PLACE_LABEL: Record<PlaceId, string> = {
  rs_pemerintah: "Rumah sakit pemerintah",
  rs_swasta: "Rumah sakit swasta",
  klinik: "Klinik",
  puskesmas: "Puskesmas",
  mandiri: "Praktik mandiri",
};
