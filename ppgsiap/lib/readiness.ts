import { labelOf } from "@/lib/intake";
import { DOCUMENTS, EDUCATION, EMPLOYMENT, type BandId, type DocumentId, type Intake, type Readiness, type WeekPlan } from "@/lib/types";

const STATUS_POINTS: Record<Intake["employment"], number> = {
  pns: 18,
  pppk: 16,
  honorer: 13,
  swasta: 11,
  calon: 4,
};

const EDU_POINTS: Record<Intake["education"], number> = {
  s1_kependidikan: 16,
  s2: 15,
  d4: 12,
  s1_non: 8,
  lain: 4,
};

function yearPoints(years: number): number {
  if (years <= 0) return 0;
  if (years === 1) return 6;
  if (years <= 3) return 10;
  if (years <= 8) return 14;
  return 16;
}

function attemptPoints(attempts: Intake["attempts"]): number {
  if (attempts === 0) return 6;
  if (attempts === 1) return 3;
  return 0;
}

const BANDS: Record<BandId, string> = {
  siap: "Siap daftar",
  hampir: "Hampir — rapikan dulu",
  belum: "Belum, 30 hari masih bisa",
  tunda: "Tunda slot tahun ini",
};

function lower(current: BandId, floor: BandId): BandId {
  const rank: BandId[] = ["siap", "hampir", "belum", "tunda"];
  return rank.indexOf(current) >= rank.indexOf(floor) ? current : floor;
}

function tasksForWeek(missingIds: DocumentId[], band: BandId, intake: Intake): WeekPlan[] {
  const missingLabels = DOCUMENTS.filter((doc) => missingIds.includes(doc.id)).map((doc) => doc.label);
  const criticalLabels = DOCUMENTS.filter((doc) => doc.critical && missingIds.includes(doc.id)).map((doc) => doc.label);

  const week1: WeekPlan = {
    rentang: "Hari 1–7",
    judul: criticalLabels.length > 0 ? "Tutup berkas yang menggantung" : "Rapikan berkas yang sudah ada",
    tugas:
      criticalLabels.length > 0
        ? [
            `Urutkan yang paling menghambat: ${criticalLabels.slice(0, 3).join(", ")}.`,
            "Simpan tiap berkas sebagai PDF terpisah, nama file jelas, ukuran di bawah batas unggah yang biasa diminta portal.",
            "Catat instansi yang masih harus membubuhi tanda tangan, lalu buat janji sebelum minggu kedua.",
          ]
        : [
            "Legalisir ulang ijazah jika salinan yang ada sudah pudar atau tahunnya meragukan.",
            "Samakan nama pada KTP, ijazah, dan NUPTK. Catat perbedaan ejaan sebelum portal menolak.",
            missingLabels.length > 0
              ? `Berkas pelengkap yang masih kosong: ${missingLabels.join(", ")}.`
              : "Cetak satu set salinan dan simpan di map terpisah dari berkas sekolah harian.",
          ],
  };

  const week2: WeekPlan = {
    rentang: "Hari 8–14",
    judul: "Izin mengajar dan jam yang harus dikosongkan",
    tugas: [
      intake.employment === "calon"
        ? "Kalau belum punya sekolah induk, tulis siapa yang berwenang menerbitkan surat tugas atau rekomendasi."
        : "Minta waktu 20 menit dengan kepala sekolah untuk membahas hari izin seleksi, bukan hanya menit terakhir.",
      "Tandai di jadwal mengajar minggu mana yang tidak boleh bentrok dengan unggah berkas dan uji.",
      "Siapkan guru piket pengganti secara tertulis supaya izin tidak macet karena kelas kosong.",
    ],
  };

  const week3: WeekPlan = {
    rentang: "Hari 15–21",
    judul: intake.attempts > 0 ? "Uji kompetensi, tanpa mengulang bimbel dulu" : "Latihan uji yang muat di sela mengajar",
    tugas: [
      intake.attempts > 0
        ? "Tulis tiga bagian yang membuat ragu pada percobaan lalu. Latihan hanya di situ, 25 menit per hari."
        : "Dua puluh lima menit per hari: satu konsep pedagogik dan satu soal sesuai mapel yang benar-benar diajar.",
      "Simpan soal yang salah di satu halaman. Jangan menambah sumber baru setiap malam.",
      intake.education === "s1_non"
        ? "Karena ijazah bukan kependidikan, sisihkan waktu ekstra untuk istilah pedagogik yang sering muncul di latihan."
        : "Akhiri tiap sesi dengan satu kalimat: apa yang akan kamu lakukan berbeda di kelas besok.",
    ],
  };

  const week4: WeekPlan =
    band === "tunda"
      ? {
          rentang: "Hari 22–30",
          judul: "Keputusan: slot tahun ini jangan dipaksa",
          tugas: [
            "Tulis alasan menunda dalam satu paragraf supaya tidak berubah pikiran hanya karena teman sudah daftar.",
            "Jadwalkan ulang berkas yang belum ada menjadi target bulan depan, bukan malam penutupan.",
            "Simpan edaran resmi tahun berjalan. Syarat bisa bergeser; perkiraan di halaman ini bukan pengumuman panitia.",
          ],
        }
      : {
          rentang: "Hari 22–30",
          judul: "Simulasi portal, dua hari sebelum tenggat",
          tugas: [
            "Unggah satu berkas uji ke akun sendiri dan cek apakah nama file serta ukuran diterima.",
            "Sisakan dua hari kosong sebelum penutupan. Jangan jadikan malam terakhir sebagai satu-satunya kesempatan.",
            "Siapkan cadangan koneksi dan satu orang yang bisa menemani unggah jika sekolah sedang padat.",
          ],
        };

  return [week1, week2, week3, week4];
}

export function buildReadiness(intake: Intake): Readiness {
  const docScore = DOCUMENTS.reduce((sum, doc) => sum + (intake.documents[doc.id] ? 5 : 0), 0);
  const score = Math.max(
    0,
    Math.min(
      100,
      4 + STATUS_POINTS[intake.employment] + yearPoints(intake.years) + EDU_POINTS[intake.education] + attemptPoints(intake.attempts) + docScore,
    ),
  );

  const missing = DOCUMENTS.filter((doc) => !intake.documents[doc.id]).map((doc) => ({
    id: doc.id,
    label: doc.label,
    critical: doc.critical,
  }));
  const criticalMissing = missing.filter((doc) => doc.critical).length;

  let band: BandId = score >= 80 ? "siap" : score >= 62 ? "hampir" : score >= 42 ? "belum" : "tunda";
  if (criticalMissing >= 5) band = "tunda";
  else if (criticalMissing >= 3) band = lower(band, "belum");
  if (intake.employment === "calon" && intake.years < 1) band = lower(band, "belum");

  const employment = labelOf(EMPLOYMENT, intake.employment);
  const education = labelOf(EDUCATION, intake.education);
  const yearsLabel = intake.years === 0 ? "belum punya masa mengajar" : `${intake.years} tahun mengajar`;

  const reasons = [
    `${employment} mengubah jenis surat tugas yang perlu disiapkan. Ini bukan nilai kelulusan.`,
    yearsLabel === "belum punya masa mengajar"
      ? "Belum ada masa mengajar tercatat, jadi bukti di kelas masih kosong."
      : `${intake.years} tahun mengajar memberi konteks, tetapi tidak menggantikan berkas.`,
    `Latar pendidikan: ${education}.`,
    intake.attempts === 0
      ? "Belum pernah memakai slot, jadi tahun ini masih utuh kalau berkasnya keburu."
      : intake.attempts === 1
        ? "Satu percobaan sebelumnya berarti pola belajarmu sudah ada — asal tidak diulang mentah-mentah."
        : "Dua kali atau lebih sudah terpakai. Slot berikutnya mahal kalau berkas yang sama masih bolong.",
  ];

  const ringkas =
    band === "siap"
      ? `Skor ${score} dari 100. Berkas inti sudah kamu centang. Tiga puluh hari dipakai untuk simulasi unggah dan izin mengajar, bukan untuk mengejar fotokopi di malam terakhir.`
      : band === "hampir"
        ? `Skor ${score} dari 100. Hampir, tetapi ${criticalMissing} berkas kunci masih kosong. Slot tahun ini masih masuk akal kalau lubang itu tertutup sebelum portal dibuka.`
        : band === "belum"
          ? `Skor ${score} dari 100. Belum layak dipaksa daftar minggu ini. Tiga puluh hari cukup untuk merapikan prioritas, asal jam mengajar tidak menelan seluruh malam.`
          : `Skor ${score} dari 100. Memaksa slot tahun ini berisiko mengulang kekosongan yang sama. Lebih aman menunda dan menutup berkas kunci dulu.`;

  const cautions = [
    "Perkiraan ini disusun dari isianmu, bukan dari pengumuman resmi panitia PPG.",
    "Cek edaran tahun berjalan sebelum menganggap satu berkas wajib atau tidak.",
    "Tidak ada jaminan lolos seleksi, dan halaman ini bukan bimbel.",
  ];
  if (intake.attempts >= 2) {
    cautions.unshift("Mengulang dengan berkas yang sama biasanya hanya memindahkan kekecewaan ke tahun berikutnya.");
  }

  return {
    score,
    band,
    bandLabel: BANDS[band],
    ringkas,
    reasons,
    missing,
    readyDocs: DOCUMENTS.filter((doc) => intake.documents[doc.id]).map((doc) => doc.label),
    weeks: tasksForWeek(
      missing.map((doc) => doc.id),
      band,
      intake,
    ),
    cautions,
  };
}
