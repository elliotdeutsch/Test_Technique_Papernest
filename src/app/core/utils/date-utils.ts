// Renvoie la date d'expiration normalisée à minuit
export function normalizeDate(date: Date | null): Date | null {
  if (!date) return null;
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// Renvoie la différence en jours entre deux dates
export function getDifferenceDays(firstDate: Date, secondDate: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((firstDate.getTime() - secondDate.getTime()) / msPerDay);
}

// Renvoie le nombre de jours entre la date d'expiration et aujourd'hui
export function getDiffDaysFromToday(
  expirationDate: Date | null
): number | null {
  const normalizedExpDate = normalizeDate(expirationDate);
  if (!normalizedExpDate) return null;
  const today = normalizeDate(new Date())!;
  return getDifferenceDays(normalizedExpDate, today);
}
