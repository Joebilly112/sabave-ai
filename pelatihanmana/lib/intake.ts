import { isCertId, isGoalId, isUnitId, isYearsId } from "@/lib/recommend";
import type { Intake } from "@/lib/types";

export function parseIntake(body: unknown): Intake | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const unit = typeof record.unit === "string" ? record.unit : "";
  const years = typeof record.years === "string" ? record.years : "";
  const goal = typeof record.goal === "string" ? record.goal : "";
  const nickname = typeof record.nickname === "string" ? record.nickname.trim().slice(0, 40) : "";
  if (!isUnitId(unit) || !isYearsId(years) || !isGoalId(goal)) return null;

  const heldRaw = Array.isArray(record.held) ? record.held : [];
  const held = heldRaw.filter((item): item is string => typeof item === "string").filter(isCertId);
  const unique = [...new Set(held)];

  return { nickname, unit, years, goal, held: unique };
}
