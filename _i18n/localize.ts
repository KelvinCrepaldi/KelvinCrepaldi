import { DEFAULT_LOCALE, type Locale } from "./locales";

export type LocalizedText = {
  "pt-BR": string;
  en: string;
};

export function pickLocalized(
  value: LocalizedText,
  locale: Locale,
): string {
  return value[locale] ?? value[DEFAULT_LOCALE];
}

export function L(ptBR: string, en: string): LocalizedText {
  return { "pt-BR": ptBR, en };
}
