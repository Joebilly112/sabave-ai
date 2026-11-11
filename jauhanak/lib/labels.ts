import type { CaregiverId, FrequencyId, LengthId, SignId, TopicId } from "@/lib/types";

export const CAREGIVER_LABEL: Record<CaregiverId, string> = {
  pasangan: "Pasangan",
  nenek: "Nenek atau kakek",
  saudara: "Saudara",
};

export const FREQUENCY_LABEL: Record<FrequencyId, string> = {
  "hampir-tiap-hari": "Hampir tiap hari",
  "beberapa-kali": "Beberapa kali seminggu",
  "seminggu-sekali": "Sekitar seminggu sekali",
  jarang: "Jarang, atau sering batal",
};

export const LENGTH_LABEL: Record<LengthId, string> = {
  "di-bawah-5": "Di bawah 5 menit",
  "5-sampai-15": "5–15 menit",
  "15-sampai-30": "15–30 menit",
  "lebih-30": "Lebih dari 30 menit",
};

export const TOPIC_LABEL: Record<TopicId, string> = {
  "kabar-ringan": "Kabar ringan",
  "cerita-hari": "Cerita hari anak",
  "sekolah-saja": "Sekolah dan nilai",
  "nasihat-uang": "Nasihat atau uang",
};

export const SIGN_LABEL: Record<SignId, string> = {
  "tidak-ada": "Belum ada tanda itu",
  "menolak-telepon": "Menolak telepon",
  "nilai-turun": "Nilai turun",
  marah: "Mudah marah",
  "menarik-diri": "Menarik diri",
};
