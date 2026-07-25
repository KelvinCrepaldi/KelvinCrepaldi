# i18n in the Next.js App Router: system language, saved preference, and content in two languages

When you start thinking about internationalization, the first picture that usually comes to mind is a large library, language-prefixed routes, and middleware that rewrites everything. That works — and in many products it is the right path. But it is not the only one.

In this article we will build, from scratch, a lighter pattern: the URL stays the same, the app detects the browser language, the user switches with a select, the choice is saved, and the server still delivers the right text, including Markdown. We use Next.js with the App Router, React, and Tailwind only so the interface looks like a real app.

The goal is didactic: each piece has a place in the folder tree, a reason to exist, and a code snippet you can paste and adapt.

---

# 1. The problem we are solving

Imagine a portfolio or a small product with two languages: Brazilian Portuguese and English. You want to:

1. Open the site and see the system language. If the browser speaks any Portuguese variant, we use pt-BR; otherwise English.
2. Switch language from the navigation corner.
3. Come back tomorrow and still be on the language you chose.
4. Pages with long text (articles, docs) also change language, without inventing two URLs for the same content.

We will not prefix routes like /en/about. We will store the preference in localStorage on the client and mirror it in a cookie so the server can read it. Next Server Components can read cookies; the client can read the browser and storage. Both sides talk to each other.

---

# 2. What we will build

A minimal app with:

- a header with a PT / EN select
- UI strings coming from TypeScript dictionaries
- an article in Markdown with an English sibling file (.en.md suffix)
- automatic detection on the first visit

Think of this as a lab. The project name can be anything — structure is what matters.

```bash
npx create-next-app@latest my-i18n-lab --typescript --tailwind --app --eslint
cd my-i18n-lab
```

---

# 3. Folder tree

Before typing code, draw the house. Clear organization keeps locale config from mixing with button components.

```text
my-i18n-lab/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── posts/
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── locale-provider.tsx
│   ├── language-select.tsx
│   └── site-header.tsx
├── i18n/
│   ├── locales.ts
│   ├── localize.ts
│   ├── get-dictionary.ts
│   ├── server-locale.ts
│   └── messages/
│       ├── pt-BR.ts
│       └── en.ts
├── content/
│   └── posts/
│       ├── welcome.md
│       └── welcome.en.md
└── lib/
    └── posts.ts
```

- i18n folder: rules and dictionaries, no JSX.
- components folder: client React (provider and select).
- content folder: Markdown per language.
- lib/posts.ts: catalog that imports the MDs and resolves text by locale.

If your project already uses folders like _i18n or _utils, the pattern is the same: only the names change.

---

# 4. Locale types and helpers

Create the file i18n/locales.ts. This is the contract: which languages exist, where we save the preference, and how we interpret the browser language.

```ts
// i18n/locales.ts
export const LOCALES = ["pt-BR", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt-BR";
export const LOCALE_STORAGE_KEY = "my-app-locale";
export const LOCALE_COOKIE = "my-app-locale";

export function isLocale(value: unknown): value is Locale {
  return value === "pt-BR" || value === "en";
}

export function normalizeLocale(raw: string | null | undefined): Locale | null {
  if (!raw) return null;
  const tag = raw.trim().toLowerCase();
  if (tag.startsWith("pt")) return "pt-BR";
  if (tag === "en" || tag.startsWith("en-") || tag.startsWith("en_")) return "en";
  return null;
}

/** Any pt* becomes pt-BR; any other system language becomes en */
export function detectBrowserLocale(
  languages: readonly string[] | undefined,
): Locale {
  if (!languages?.length) return DEFAULT_LOCALE;
  for (const lang of languages) {
    if (normalizeLocale(lang) === "pt-BR") return "pt-BR";
  }
  return "en";
}
```

The rule is explicit: Portuguese wins when the system speaks any pt variant; everything else falls to English. That avoids ending up half French, half default with no criteria.

Next, create i18n/localize.ts — a small helper for fields that exist in both languages:

```ts
// i18n/localize.ts
import { DEFAULT_LOCALE, type Locale } from "./locales";

export type LocalizedText = {
  "pt-BR": string;
  en: string;
};

export function pickLocalized(value: LocalizedText, locale: Locale): string {
  return value[locale] ?? value[DEFAULT_LOCALE];
}

export function L(ptBR: string, en: string): LocalizedText {
  return { "pt-BR": ptBR, en };
}
```

The L function is just syntactic sugar so you do not repeat huge objects in the catalog.

---

# 5. UI dictionaries

Short UI strings (nav, buttons, section titles) fit well in TypeScript files. Create i18n/messages/pt-BR.ts:

```ts
// i18n/messages/pt-BR.ts
const ptBR = {
  nav: {
    home: "Início",
    posts: "Artigos",
  },
  language: {
    label: "Idioma",
    pt: "PT",
    en: "EN",
  },
  home: {
    title: "Laboratório de i18n",
    subtitle: "Next.js, Tailwind e dois idiomas sem mudar a URL.",
  },
};

export default ptBR;
export type Dictionary = typeof ptBR;
```

And the English mirror, i18n/messages/en.ts, typed with the same Dictionary:

```ts
// i18n/messages/en.ts
import type { Dictionary } from "./pt-BR";

const en: Dictionary = {
  nav: {
    home: "Home",
    posts: "Posts",
  },
  language: {
    label: "Language",
    pt: "PT",
    en: "EN",
  },
  home: {
    title: "i18n lab",
    subtitle: "Next.js, Tailwind, and two languages without changing the URL.",
  },
};

export default en;
```

The picker lives in i18n/get-dictionary.ts:

```ts
// i18n/get-dictionary.ts
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
```

Why TypeScript instead of JSON? Because the compiler shouts if you forget a key in English. On a long article, that is gold.

---

# 6. LocaleProvider: the client-side heart

Create components/locale-provider.tsx with the use client directive at the top. This component:

1. Reads localStorage (user choice).
2. If missing, detects the browser language.
3. Writes a cookie for the server.
4. Updates the lang attribute on the html element.
5. Exposes locale, setLocale, and the dictionary via Context.

Essential excerpt:

```tsx
// components/locale-provider.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  DEFAULT_LOCALE,
  detectBrowserLocale,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/i18n/locales";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: ReturnType<typeof getDictionary>;
  ready: boolean;
} | null>(null);

function writeCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  const applyLocale = useCallback(
    (next: Locale, persist: boolean, refresh: boolean) => {
      setLocaleState(next);
      document.documentElement.lang = next;
      writeCookie(next);
      if (persist) {
        localStorage.setItem(LOCALE_STORAGE_KEY, next);
      }
      if (refresh) router.refresh();
    },
    [router],
  );

  useLayoutEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    const resolved = isLocale(stored)
      ? stored
      : detectBrowserLocale(navigator.languages ?? [navigator.language]);
    applyLocale(resolved, Boolean(isLocale(stored)), false);
    setReady(true);
  }, [applyLocale]);

  const setLocale = useCallback(
    (next: Locale) => applyLocale(next, true, true),
    [applyLocale],
  );

  const dictionary = useMemo(() => getDictionary(locale), [locale]);
  const value = useMemo(
    () => ({ locale, setLocale, dictionary, ready }),
    [locale, setLocale, dictionary, ready],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useTranslations() {
  return useLocale().dictionary;
}
```

Notice the persist detail: on the first visit we detect the system and write the cookie, but we only write localStorage when the user chooses. So people who never touch the select still follow the OS language; people who chose manually keep a fixed preference.

The router.refresh call forces Next to re-render Server Components with the new cookie — essential for article pages.

---

# 7. Language select in the header

File components/language-select.tsx:

```tsx
// components/language-select.tsx
"use client";

import { useLocale, useTranslations } from "./locale-provider";
import type { Locale } from "@/i18n/locales";

export function LanguageSelect() {
  const { locale, setLocale, ready } = useLocale();
  const t = useTranslations();

  if (!ready) {
    return <span className="inline-block h-9 w-16" aria-hidden />;
  }

  return (
    <label className="inline-flex h-9 items-center">
      <span className="sr-only">{t.language.label}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="h-9 cursor-pointer bg-transparent px-2 text-xs font-bold uppercase tracking-widest"
        aria-label={t.language.label}
      >
        <option value="pt-BR">{t.language.pt}</option>
        <option value="en">{t.language.en}</option>
      </select>
    </label>
  );
}
```

And the header in components/site-header.tsx, using Tailwind only for visual composition:

```tsx
// components/site-header.tsx
"use client";

import Link from "next/link";
import { LanguageSelect } from "./language-select";
import { useTranslations } from "./locale-provider";

export function SiteHeader() {
  const t = useTranslations();

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
      <nav className="flex gap-6 text-sm font-bold uppercase tracking-tight">
        <Link href="/">{t.nav.home}</Link>
        <Link href="/posts/welcome">{t.nav.posts}</Link>
      </nav>
      <LanguageSelect />
    </header>
  );
}
```

The select sits in the top-right corner — where users already look for site controls (theme, language, account).

---

# 8. Wiring everything in the layout

In app/layout.tsx, wrap the app with the provider. Optionally, a tiny script in head reduces a wrong-language flash before hydration:

```tsx
// app/layout.tsx
import { LocaleProvider } from "@/components/locale-provider";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const boot = `(function(){try{var k='my-app-locale';var s=localStorage.getItem(k);var raw=s||((navigator.languages&&navigator.languages[0])||navigator.language||'');var l=(s==='en'||s==='pt-BR')?s:(/^pt/i.test(raw)?'pt-BR':(raw?'en':'pt-BR'));document.documentElement.lang=l;document.cookie=k+'='+l+';path=/;max-age=31536000;SameSite=Lax';}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50">
        <LocaleProvider>
          <SiteHeader />
          <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>
        </LocaleProvider>
      </body>
    </html>
  );
}
```

Home can be a simple Client Component:

```tsx
// app/page.tsx
"use client";

import { useTranslations } from "@/components/locale-provider";

export default function HomePage() {
  const t = useTranslations();
  return (
    <section>
      <h1 className="text-4xl font-black tracking-tight">{t.home.title}</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        {t.home.subtitle}
      </p>
    </section>
  );
}
```

---

# 9. Locale on the server (cookie)

Client Components solve the UI. But an article page as a Server Component needs to know the language before hydration. For that, create i18n/server-locale.ts:

```ts
// i18n/server-locale.ts
import { cookies, headers } from "next/headers";
import {
  detectFromAcceptLanguage,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "./locales";

export async function getRequestLocale(): Promise<Locale> {
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const accept = (await headers()).get("accept-language");
  return detectFromAcceptLanguage(accept);
}
```

You can implement detectFromAcceptLanguage in the same spirit as detectBrowserLocale: prefer pt, otherwise en. On the first request without a cookie, the Accept-Language header already gives a solid guess.

---

# 10. Localized Markdown

Long content does not fit well in a dictionary. The simple, effective scheme: a Portuguese base file and an English sibling with the .en.md suffix.

```text
content/posts/welcome.md
content/posts/welcome.en.md
```

Configure the bundler to import .md files as strings. In Next with webpack, something like type asset/source. Then the catalog:

```ts
// lib/posts.ts
import welcomePt from "@/content/posts/welcome.md";
import welcomeEn from "@/content/posts/welcome.en.md";
import type { Locale } from "@/i18n/locales";
import { L, pickLocalized, type LocalizedText } from "@/i18n/localize";

export type Post = {
  slug: string;
  title: string;
  excerpt: LocalizedText;
  md: LocalizedText;
};

const posts: Post[] = [
  {
    slug: "welcome",
    title: "Welcome_Lab",
    excerpt: L(
      "Primeiro artigo do laboratório de i18n.",
      "First post from the i18n lab.",
    ),
    md: L(welcomePt, welcomeEn),
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function resolvePost(post: Post, locale: Locale) {
  return {
    ...post,
    excerpt: pickLocalized(post.excerpt, locale),
    md: pickLocalized(post.md, locale),
  };
}
```

On the article page:

```tsx
// app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getRequestLocale } from "@/i18n/server-locale";
import { getPost, resolvePost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const locale = await getRequestLocale();
  const resolved = resolvePost(post, locale);

  return (
    <article className="prose dark:prose-invert">
      <h1>{resolved.title}</h1>
      <p className="lead">{resolved.excerpt}</p>
      {/* pass resolved.md to your Markdown renderer */}
      <pre className="whitespace-pre-wrap text-sm">{resolved.md}</pre>
    </article>
  );
}
```

When the user switches language in the select, the cookie changes and refresh makes this page fetch the right Markdown again.

---

# 11. The full flow (end to end)

It is worth rereading the mental path:

1. First visit: the script or provider looks at the browser, picks pt-BR or en, and writes the cookie.
2. UI: Client Components read Context and show the dictionary.
3. Article: the Server Component reads the cookie and picks the Portuguese or English body.
4. Manual switch: the select writes localStorage and cookie and calls refresh.
5. Back tomorrow: localStorage wins; the system does not overwrite a human choice.

```text
[browser / storage]
        │
        ▼
 LocaleProvider ──► cookie ──► getRequestLocale()
        │                           │
        ▼                           ▼
  UI dictionary              resolvePost / Markdown
```

---

# Conclusion

This pattern does not try to replace next-intl in a multilingual e-commerce with aggressive per-language SEO. It works very well for a personal site, small docs, or a product with two languages and a clean URL: you control detection, persistence, and long-form content without inventing a second route tree.

What to take from here:

- Separate rules (i18n folder) from UI (components folder).
- Use typed dictionaries for short strings.
- Use Markdown pairs (.md and .en.md) for long text.
- Mirror the preference in a cookie so the App Router is not blind on the server.

With that, i18n stops being a mysterious plugin and becomes a flow you can draw on paper — and explain to the next person on the team.
