const DOT_DATE_PATTERN = /^(\d{4})\.(\d{2})\.(\d{2})$/;

export function parseDotDate(date: string): Date {
  const match = DOT_DATE_PATTERN.exec(date);
  if (!match) {
    return new Date(date.replace(/\./g, "-"));
  }

  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function formatDotDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parseDotDate(date));
}

/** Alias semântico para datas de publicação de logs. */
export const formatLogDate = formatDotDate;
