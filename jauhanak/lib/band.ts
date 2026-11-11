import type { CallPlan, ClosenessInput, ClosenessResult, HabitItem } from "@/lib/types";

type WeightedHabit = HabitItem & { weight: number };

function ageName(age: number): string {
  if (age <= 4) return "balita";
  if (age <= 8) return "anak";
  if (age <= 12) return "pra-remaja";
  return "remaja";
}

function callPlan(input: ClosenessInput): CallPlan {
  if (input.childAge <= 4) {
    return {
      rhythm: "Dua atau tiga panggilan pendek seminggu, waktu yang sama, cukup sampai anak masih mau lihat layar.",
      ask: [
        "Tunjukkan satu benda di dekatmu, lalu minta anak menunjukkan benda di rumah.",
        "Nyanyikan potongan lagu yang sama setiap kali, supaya suara kamu jadi penanda.",
        "Tanya pengasuh satu hal lucu hari ini, lalu ulang ke anak dengan kata yang pendek.",
      ],
      avoid: [
        "Memaksa anak duduk diam lebih dari beberapa menit.",
        "Menilai apakah anak “masih ingat” atau “sudah lupa”.",
        "Mengisi panggilan dengan cerita kerja yang belum ia pahami.",
      ],
    };
  }
  if (input.childAge <= 8) {
    return {
      rhythm: "Satu panggilan tetap seminggu, 10–15 menit, plus pesan suara singkat di hari lain kalau sempat.",
      ask: [
        "Minta satu cerita: siapa yang ditemui, apa yang dimakan, atau permainan apa.",
        "Pilih satu gambar yang anak kirim, lalu tanya bagian mana yang ia suka.",
        "Janji satu hal kecil untuk panggilan berikutnya, misalnya tebak-tebakan.",
      ],
      avoid: [
        "Membuka dengan nilai atau PR.",
        "Membandingkan anak dengan sepupu.",
        "Menutup telepon saat anak baru mulai bercerita.",
      ],
    };
  }
  if (input.childAge <= 12) {
    return {
      rhythm: "Satu waktu tetap seminggu. Biarkan anak memilih video, gambar, atau obrolan biasa.",
      ask: [
        "Tanya satu hal yang membuat hari ini enteng atau berat, tanpa menuntut jawaban panjang.",
        "Ajak lakukan sesuatu bersama di layar: teka gambar, resep sederhana, atau baca satu halaman.",
        "Tanyakan apa yang pengasuh sudah bantu, supaya anak melihat kamu menghargai rumahnya.",
      ],
      avoid: [
        "Ceramah tentang masa depan.",
        "Menginterogasi teman atau sekolah di menit pertama.",
        "Menganggap diam sebagai sikap kurang ajar.",
      ],
    };
  }
  return {
    rhythm: "Panggilan lebih pendek dan lebih jarang boleh, asal waktunya disepakati. Remaja butuh pintu, bukan sidang.",
    ask: [
      "Tanya apa yang sedang ia ikuti, lalu diam sejenak sebelum menimpali.",
      "Tawarkan dua pilihan waktu, biarkan ia yang menentukan.",
      "Kirim satu kalimat biasa di chat, tanpa menuntut balasan panjang.",
    ],
    avoid: [
      "“Kenapa diam saja?” di awal panggilan.",
      "Membandingkan usahamu dengan sikapnya.",
      "Mengunci panggilan lebih dari 20 menit kalau ia sudah ingin selesai.",
    ],
  };
}

function habitsFor(input: ClosenessInput): HabitItem[] {
  const items: WeightedHabit[] = [];
  const age = ageName(input.childAge);

  if (input.frequency === "hampir-tiap-hari" || input.frequency === "beberapa-kali") {
    items.push({
      weight: 16,
      tone: "membantu",
      title: "Irama panggilan sudah ada",
      detail: `Kamu sudah menghubungi ${age} ini lebih dari sekali seminggu. Jaga jamnya, jangan menambah durasi dulu.`,
    });
  } else if (input.frequency === "seminggu-sekali") {
    items.push({
      weight: 12,
      tone: "membantu",
      title: "Satu janji seminggu",
      detail: "Seminggu sekali masih bisa jadi jangkar, asal tidak sering digeser mendadak.",
    });
  } else {
    items.push({
      weight: 22,
      tone: "mengganggu",
      title: "Jeda yang terlalu panjang",
      detail: "Panggilan yang jarang membuat suara kamu terasa tamu. Mulai dari satu waktu tetap, bukan dari panggilan dadakan yang panjang.",
    });
  }

  if (input.topic === "cerita-hari") {
    items.push({
      weight: 17,
      tone: "membantu",
      title: "Anak sempat punya cerita",
      detail: "Isi panggilan yang mengikuti harinya memberi ruang. Pertahankan satu pertanyaan, lalu dengarkan.",
    });
  } else if (input.topic === "kabar-ringan") {
    items.push({
      weight: 11,
      tone: "membantu",
      title: "Kabar yang tidak menginterogasi",
      detail: "Kabar ringan aman. Tambah satu pertanyaan spesifik tentang hari ini supaya obrolan tidak berhenti di “baik-baik saja”.",
    });
  } else if (input.topic === "sekolah-saja") {
    items.push({
      weight: 16,
      tone: "mengganggu",
      title: "Nilai dibuka lebih dulu",
      detail: "Kalau telepon terasa seperti rapor, anak belajar menjawab singkat. Tunda sekolah sampai ia sendiri yang menyebut.",
    });
  } else {
    items.push({
      weight: 18,
      tone: "mengganggu",
      title: "Panggilan yang terasa seperti rapat",
      detail: "Nasihat dan uang yang selalu di depan membuat anak menjaga jarak. Simpan satu kalimat urusan, lalu kembali ke harinya.",
    });
  }

  if (input.length === "di-bawah-5" && input.childAge >= 5) {
    items.push({
      weight: 14,
      tone: "mengganggu",
      title: "Panggilan yang keburu selesai",
      detail: "Di bawah lima menit sering habis untuk sapaan. Untuk usia ini, sisakan sepuluh menit meski isinya sederhana.",
    });
  } else if (input.length === "lebih-30" && input.childAge >= 13) {
    items.push({
      weight: 13,
      tone: "mengganggu",
      title: "Durasi yang terasa panjang",
      detail: "Remaja mudah lelah di kamera. Panggilan yang lebih pendek dan berakhir saat ia masih nyaman lebih mudah diulang.",
    });
  } else if (input.length === "5-sampai-15" || (input.length === "di-bawah-5" && input.childAge <= 4)) {
    items.push({
      weight: 12,
      tone: "membantu",
      title: "Lama panggilan yang masih muat",
      detail: "Durasi ini dekat dengan perhatian anak. Jangan memaksakan lebih lama hanya karena rindu.",
    });
  }

  if (input.signs.includes("menolak-telepon")) {
    items.push({
      weight: 24,
      tone: "mengganggu",
      title: "Telepon yang ditolak",
      detail: "Penolakan adalah tanda, bukan vonis. Kirim kabar pendek, lalu minta pengasuh menawarkan waktu yang anak pilih.",
    });
  }
  if (input.signs.includes("menarik-diri")) {
    items.push({
      weight: 20,
      tone: "mengganggu",
      title: "Anak yang menarik diri",
      detail: "Menarik diri perlu diperhatikan, bukan dikejar dengan banyak pertanyaan. Satu sapaan tetap lebih berguna daripada interogasi.",
    });
  }
  if (input.signs.includes("marah")) {
    items.push({
      weight: 15,
      tone: "mengganggu",
      title: "Marah yang belum diberi tempat",
      detail: "Marah bisa berarti rindu yang tidak punya kata. Akui bahwa jauh itu berat, tanpa meminta ia segera baik.",
    });
  }
  if (input.signs.includes("nilai-turun")) {
    items.push({
      weight: 12,
      tone: "mengganggu",
      title: "Nilai yang menutupi kabar lain",
      detail: "Nilai turun perlu diketahui pengasuh dan sekolah. Di telepon dengan anak, jangan menjadikan angka itu pembuka.",
    });
  }
  if (input.signs.includes("tidak-ada")) {
    items.push({
      weight: 10,
      tone: "membantu",
      title: "Belum ada tanda menjauh yang kamu catat",
      detail: "Tidak adanya penolakan, marah, atau menarik diri adalah kabar yang patut dijaga, bukan alasan menunda irama.",
    });
  }

  if (input.caregiver === "nenek") {
    items.push({
      weight: 13,
      tone: "membantu",
      title: "Nenek sudah jadi rumah sehari-hari",
      detail: "Anak yang lebih akrab dengan nenek bukan kekalahan. Sebut nenek dengan hangat di panggilan, supaya kamu tidak terasa lawan.",
    });
  } else if (input.caregiver === "saudara") {
    items.push({
      weight: 11,
      tone: "mengganggu",
      title: "Peran pengasuh yang mudah tertukar",
      detail: "Saudara yang mengasuh butuh batas yang jelas. Ucapkan terima kasih, lalu minta satu jendela waktu yang tidak bentrok dengan urusan rumah.",
    });
  } else {
    items.push({
      weight: 9,
      tone: "membantu",
      title: "Pasangan masih di jalur yang sama",
      detail: "Kalau pasangan yang sehari-hari bersama anak, sepakati dulu apa yang tidak perlu diulang di depan anak.",
    });
  }

  if (input.yearsApart >= 5) {
    items.push({
      weight: 14,
      tone: "mengganggu",
      title: "Tahun yang sudah panjang",
      detail: `${input.yearsApart} tahun terpisah membuat kenangan lama tidak cukup. Anak butuh cerita minggu ini, bukan hanya foto waktu kecil.`,
    });
  }

  if (input.monthsLeft <= 3) {
    items.push({
      weight: 11,
      tone: "membantu",
      title: "Sisa kontrak yang bisa dijadikan janji kecil",
      detail: "Beberapa bulan lagi pulang. Sebut satu hal konkret yang akan kalian lakukan, tanpa menjanjikan semuanya berubah sekaligus.",
    });
  }

  const sorted = items.sort((a, b) => b.weight - a.weight);
  const picked: HabitItem[] = [];
  for (const item of sorted) {
    if (picked.length === 3) break;
    if (picked.some((existing) => existing.title === item.title)) continue;
    picked.push({ title: item.title, detail: item.detail, tone: item.tone });
  }
  return picked;
}

function caregiverScript(input: ClosenessInput): string {
  const window =
    input.childAge <= 4 ? "beberapa menit, dua atau tiga kali seminggu" : "sepuluh sampai lima belas menit, sekali seminggu pada jam yang sama";
  const opener =
    input.caregiver === "pasangan"
      ? "Aku mau kita jaga satu waktu video yang tetap, bukan menambah aturan baru di rumah."
      : input.caregiver === "nenek"
        ? "Bu, terima kasih sudah merawatnya setiap hari. Saya tidak ingin mengganggu ritme rumah."
        : "Terima kasih sudah menemani anak saya. Saya ingin membantu dari jauh tanpa menambah beban.";
  const ifRefused = input.signs.includes("menolak-telepon")
    ? " Kalau ia menolak, kabari saya saja. Saya akan kirim pesan pendek dan tidak memaksa panggilan panjang."
    : " Kalau hari itu ia sedang tidak mau, geser waktunya, jangan dipaksa sampai selesai.";
  return `${opener} Boleh kita sepakat ${window}? Saya ingin bertanya tentang harinya, bukan membuka nilai atau nasihat di menit pertama.${ifRefused} Tolong beri tahu satu hal yang sedang ia sukai, supaya saya punya bahan obrolan yang nyata.`;
}

function score(input: ClosenessInput): number {
  let points = 48;
  if (input.frequency === "hampir-tiap-hari") points += 18;
  else if (input.frequency === "beberapa-kali") points += 10;
  else if (input.frequency === "seminggu-sekali") points += 2;
  else points -= 16;

  if (input.length === "di-bawah-5") points += input.childAge <= 4 ? 4 : -8;
  else if (input.length === "5-sampai-15") points += 8;
  else if (input.length === "15-sampai-30") points += input.childAge >= 13 ? 2 : 6;
  else points += input.childAge >= 13 ? -4 : 2;

  if (input.topic === "cerita-hari") points += 12;
  else if (input.topic === "kabar-ringan") points += 6;
  else if (input.topic === "sekolah-saja") points -= 6;
  else points -= 12;

  if (input.caregiver === "pasangan") points += 4;
  else if (input.caregiver === "saudara") points -= 3;

  if (input.yearsApart === 0) points += 6;
  else if (input.yearsApart <= 2) points += 2;
  else if (input.yearsApart <= 5) points -= 6;
  else points -= 12;

  if (input.signs.includes("tidak-ada")) points += 8;
  if (input.signs.includes("menolak-telepon")) points -= 14;
  if (input.signs.includes("menarik-diri")) points -= 12;
  if (input.signs.includes("marah")) points -= 8;
  if (input.signs.includes("nilai-turun")) points -= 6;

  if (input.childAge >= 13 && input.frequency === "jarang") points -= 6;
  if (input.childAge <= 4 && input.frequency === "jarang") points -= 8;

  return Math.max(0, Math.min(100, points));
}

export function decideCloseness(input: ClosenessInput): ClosenessResult {
  const points = score(input);
  const band = points >= 68 ? "dekat" : points >= 40 ? "renggang" : "perlu-perhatian";
  const bandLabel = band === "dekat" ? "Dekat" : band === "renggang" ? "Renggang" : "Perlu perhatian";
  const headline =
    band === "dekat"
      ? "Anak masih ada di jalur dekat. Jaga irama yang sudah hidup."
      : band === "renggang"
        ? "Jaraknya terasa. Masih ada kebiasaan yang bisa digeser minggu ini."
        : "Tanda menjauh sudah kelihatan. Mulai dari satu waktu tetap, bukan dari ceramah.";

  return {
    band,
    bandLabel,
    headline,
    points,
    habits: habitsFor(input),
    plan: callPlan(input),
    caregiverScript: caregiverScript(input),
    assumptions: [
      "Ini bacaan dari isianmu, bukan diagnosis psikologis dan bukan penilaian terhadap pengasuh.",
      "Usia anak menentukan panjang panggilan dan jenis pertanyaan, bukan “benar” atau “salah”-nya rasa rindu.",
      "Kalau anak dalam keadaan tidak aman, hubungi pengasuh dan layanan darurat setempat sebelum membaca laporan.",
    ],
  };
}
