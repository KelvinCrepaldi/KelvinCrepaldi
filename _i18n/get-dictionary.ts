import type { Locale } from "./locales";
import type { Dictionary } from "./messages/pt-BR";
import en from "./messages/en";
import ptBR from "./messages/pt-BR";

const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": ptBR,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries["pt-BR"];
}
