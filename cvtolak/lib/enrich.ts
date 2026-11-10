import type { ChecklistAction, ChecklistRow, ScanInput, ScanResult } from "@/lib/scan";

function asText(value: unknown, min: number, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim().replace(/\s+/g, " ");
  if (text.length < min || text.length > max) return null;
  return text;
}

function asChecklist(value: unknown): ChecklistRow[] | null {
  if (!Array.isArray(value) || value.length < 6) return null;
  const rows: ChecklistRow[] = [];
  for (const item of value.slice(0, 9)) {
    if (!item || typeof item !== "object") return null;
    const row = item as Record<string, unknown>;
    const action = row.action;
    const text = asText(row.text, 12, 220);
    if ((action !== "simpan" && action !== "potong" && action !== "tambah") || !text) return null;
    rows.push({ action: action as ChecklistAction, text });
  }
  return rows;
}

export async function enrichScan(input: ScanInput, result: ScanResult): Promise<ScanResult> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return result;

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
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Kamu editor CV bahasa Indonesia. Jawab JSON saja dengan kunci summary, verdict, checklist. Jangan mengarang pengalaman yang tidak ada di CV. Jangan bahas gaji. summary 2 kalimat, verdict 1 kalimat, checklist 6-9 item dengan action simpan|potong|tambah.",
          },
          {
            role: "user",
            content: JSON.stringify({
              role: input.role,
              years: input.years,
              cv: input.cvText.slice(0, 5000),
              missing: result.keywords.filter((row) => !row.present).map((row) => row.term),
              draftSummary: result.summary,
              draftVerdict: result.verdict,
            }),
          },
        ],
      }),
    });
    if (!response.ok) return result;
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) return result;
    const parsed = JSON.parse(content) as Record<string, unknown>;
    const summary = asText(parsed.summary, 40, 500);
    const verdict = asText(parsed.verdict, 20, 280);
    const checklist = asChecklist(parsed.checklist);
    if (!summary && !verdict && !checklist) return result;
    return {
      ...result,
      summary: summary ?? result.summary,
      verdict: verdict ?? result.verdict,
      checklist: checklist ?? result.checklist,
    };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
