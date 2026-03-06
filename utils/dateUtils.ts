/**
 * Returns today's date string in YYYY-MM-DD format (local time)
 */
export function todayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Returns a numeric seed from a date string (YYYY-MM-DD)
 * so the same date always yields the same questions.
 */
export function dateSeed(dateStr: string): number {
  const digits = dateStr.replace(/-/g, '');
  let hash = 0;
  for (let i = 0; i < digits.length; i++) {
    hash = (hash * 31 + digits.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Simple seeded pseudo-random number (0 <= n < 1)
 */
export function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed + index) * 10000;
  return x - Math.floor(x);
}

/**
 * Returns whether two date strings are consecutive days
 */
export function isConsecutiveDay(prev: string, today: string): boolean {
  const prevDate = new Date(prev);
  const todayDate = new Date(today);
  const diff = todayDate.getTime() - prevDate.getTime();
  const oneDayMs = 86400000;
  return diff === oneDayMs;
}

/**
 * Formats a date string to Japanese readable format (例: 2024年3月5日)
 */
export function formatDateJP(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
}
