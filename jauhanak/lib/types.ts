export const CAREGIVERS = ["pasangan", "nenek", "saudara"] as const;
export const FREQUENCIES = ["hampir-tiap-hari", "beberapa-kali", "seminggu-sekali", "jarang"] as const;
export const LENGTHS = ["di-bawah-5", "5-sampai-15", "15-sampai-30", "lebih-30"] as const;
export const TOPICS = ["kabar-ringan", "cerita-hari", "sekolah-saja", "nasihat-uang"] as const;
export const SIGNS = ["tidak-ada", "menolak-telepon", "nilai-turun", "marah", "menarik-diri"] as const;
export const BANDS = ["dekat", "renggang", "perlu-perhatian"] as const;

export type CaregiverId = (typeof CAREGIVERS)[number];
export type FrequencyId = (typeof FREQUENCIES)[number];
export type LengthId = (typeof LENGTHS)[number];
export type TopicId = (typeof TOPICS)[number];
export type SignId = (typeof SIGNS)[number];
export type BandId = (typeof BANDS)[number];

export type ClosenessInput = {
  childAge: number;
  yearsApart: number;
  caregiver: CaregiverId;
  frequency: FrequencyId;
  length: LengthId;
  topic: TopicId;
  signs: SignId[];
  monthsLeft: number;
};

export type HabitItem = {
  title: string;
  detail: string;
  tone: "membantu" | "mengganggu";
};

export type CallPlan = {
  rhythm: string;
  ask: string[];
  avoid: string[];
};

export type ClosenessResult = {
  band: BandId;
  bandLabel: string;
  headline: string;
  points: number;
  habits: HabitItem[];
  plan: CallPlan;
  caregiverScript: string;
  assumptions: string[];
};

export type StoredCheck = {
  id: string;
  orderId: string;
  status: "pending" | "paid";
  createdAt: string;
  paidAt: string | null;
  input: ClosenessInput;
  result: ClosenessResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};
