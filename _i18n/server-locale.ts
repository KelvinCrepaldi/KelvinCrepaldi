import { cookies, headers } from "next/headers";

import {
  detectFromAcceptLanguage,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "./locales";

/** Locale da request: cookie salvo → Accept-Language → pt-BR. */
export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const accept = (await headers()).get("accept-language");
  return detectFromAcceptLanguage(accept);
}
