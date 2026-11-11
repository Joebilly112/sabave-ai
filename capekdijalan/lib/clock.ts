export function minutesOf(clock: string): number {
  const [hour, minute] = clock.split(":").map(Number);
  return hour * 60 + minute;
}

export function formatClock(clock: string): string {
  return clock.replace(":", ".");
}

export function spanMinutes(depart: string, returnAt: string): number {
  const raw = minutesOf(returnAt) - minutesOf(depart);
  return raw >= 0 ? raw : raw + 24 * 60;
}
