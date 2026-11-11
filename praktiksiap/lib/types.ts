export const WORKPLACES = ["puskesmas", "rs", "klinik", "belum"] as const;
export const STRB_STATES = ["aktif", "proses", "belum"] as const;
export const SIPB_STATES = ["aktif_lain", "belum", "habis"] as const;
export const PLACE_STATES = ["milik", "sewa", "belum"] as const;
export const GEAR_STATES = ["lengkap", "sebagian", "belum"] as const;
export const WASTE_STATES = ["ada", "belum"] as const;
export const IBI_STATES = ["ada", "proses", "belum"] as const;
export const BANDS = ["hijau", "kuning", "merah"] as const;
export const GAP_STATES = ["siap", "proses", "kurang"] as const;

export type WorkplaceId = (typeof WORKPLACES)[number];
export type StrbState = (typeof STRB_STATES)[number];
export type SipbState = (typeof SIPB_STATES)[number];
export type PlaceState = (typeof PLACE_STATES)[number];
export type GearState = (typeof GEAR_STATES)[number];
export type WasteState = (typeof WASTE_STATES)[number];
export type IbiState = (typeof IBI_STATES)[number];
export type BandId = (typeof BANDS)[number];
export type GapState = (typeof GAP_STATES)[number];

export type CekInput = {
  years: number;
  workplace: WorkplaceId;
  strb: StrbState;
  sipb: SipbState;
  place: PlaceState;
  gear: GearState;
  waste: WasteState;
  ibi: IbiState;
};

export type ScorePart = {
  id: string;
  label: string;
  points: number;
};

export type GapItem = {
  id: string;
  title: string;
  state: GapState;
  note: string;
};

export type PrepWeek = {
  title: string;
  window: string;
  tasks: string[];
};

export type CekResult = {
  score: number;
  band: BandId;
  bandLabel: string;
  headline: string;
  parts: ScorePart[];
  gaps: GapItem[];
  plan: PrepWeek[];
  loketNote: string;
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
