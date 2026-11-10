import type { NilaiInput, NilaiResult } from "@/lib/nilai";

function asText(value: unknown, min: number, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim().replace(/\s+/g, " ");
  if (text.length < min || text.length > max) return null;
  return text;
}

function asSkills(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.length < 4) return null;
  const skills: string[] = [];
  for (const item of value.slice(0, 4)) {
    const text = asText(item, 12, 220);
    if (!text) return null;
    skills.push(text);
  }
  return skills;
}

function parsePayload(raw: string): { summary: string; skills: string[]; script: string } | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const row = parsed as Record<string, unknown>;
  const summary = asText(row.summary, 40, 600);
  const script = asText(row.script, 40, 900);
  const skills = asSkills(row.skills);
  if (!summary || !script || !skills) return null;
  return { summary, skills, script };
}

export async function enrichNilai(input: NilaiInput, drafted: NilaiResult): Promise<NilaiResult> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return drafted;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "Kamu menyunting hasil Magangworth dalam bahasa Indonesia. Jangan mengubah lampu (merah/kuning/hijau). Jangan membahas nominal gaji, membandingkan bayaran, atau menjanjikan konversi karyawan. Kembalikan JSON saja dengan kunci summary, skills (tepat 4 string), dan script. Script adalah pesan sopan ke pembimbing.",
          },
          {
            role: "user",
            content: JSON.stringify({
              lampu: drafted.band,
              peran: input.role,
              jenisKantor: input.companyType,
              statusBayar: input.pay,
              durasiMinggu: input.durationWeeks,
              pembimbing: input.supervisor,
              tugas: input.tasks,
              draf: {
                summary: drafted.summary,
                skills: drafted.skills,
                script: drafted.script,
              },
            }),
          },
        ],
      }),
    });
    if (!response.ok) return drafted;
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) return drafted;
    const cleaned = parsePayload(content);
    if (!cleaned) return drafted;
    return { ...drafted, summary: cleaned.summary, skills: cleaned.skills, script: cleaned.script };
  } catch {
    return drafted;
  } finally {
    clearTimeout(timer);
  }
}
