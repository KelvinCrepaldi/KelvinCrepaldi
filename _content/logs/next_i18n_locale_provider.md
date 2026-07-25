# i18n no Next.js App Router: idioma do sistema, preferência salva e conteúdo em dois idiomas

Quando você começa a pensar em internacionalização, a primeira imagem que vem à cabeça costuma ser uma biblioteca grande, rotas com prefixos de idioma e um middleware que reescreve tudo. Isso funciona — e em muitos produtos é o caminho certo. Mas não é o único.

Neste artigo vamos montar, do zero, um padrão mais leve: a URL continua a mesma, o app detecta o idioma do navegador, o usuário troca com um select, a escolha fica salva, e o servidor ainda entrega o texto certo, inclusive Markdown. Usamos Next.js com App Router, React e Tailwind só para a interface ter cara de app real.

A ideia é didática: cada peça tem um lugar na pasta, um motivo para existir e um trecho de código que você pode colar e adaptar.

---

# 1. O problema que estamos resolvendo

Imagine um portfólio ou um produto pequeno com duas línguas: português do Brasil e inglês. Você quer:

1. Abrir o site e ver o idioma do sistema. Se o navegador falar qualquer variante de português, usamos pt-BR; caso contrário, inglês.
2. Trocar o idioma no canto da navegação.
3. Voltar amanhã e continuar no idioma escolhido.
4. Páginas com texto longo (artigos, documentação) também mudarem de idioma, sem inventar duas URLs para o mesmo conteúdo.

Não vamos prefixar rotas como /en/about. Vamos guardar a preferência no localStorage no cliente e espelhar num cookie para o servidor ler. Server Components do Next conseguem ler cookies; o cliente consegue ler o navegador e o storage. Os dois lados conversam.

---

# 2. O que vamos construir

Um app mínimo com:

- header com um select PT / EN
- textos de interface vindos de dicionários TypeScript
- um artigo em Markdown com versão inglesa no arquivo irmão (sufixo .en.md)
- detecção automática na primeira visita

Pense nisso como um laboratório. O nome do projeto pode ser qualquer um — o importante é a estrutura.

```bash
npx create-next-app@latest my-i18n-lab --typescript --tailwind --app --eslint
cd my-i18n-lab
```

---

# 3. Árvore de pastas

Antes de digitar código, desenhe a casa. Uma organização clara evita misturar configuração de idioma com componente de botão.

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

- Pasta i18n: regras e dicionários, sem JSX.
- Pasta components: React no cliente (provider e select).
- Pasta content: Markdown por idioma.
- Arquivo lib/posts.ts: catálogo que importa os MDs e resolve o texto pelo locale.

Se o seu projeto já usa pastas como _i18n ou _utils, o padrão é o mesmo: só mudam os nomes.

---

# 4. Tipos e helpers de locale

Crie o arquivo i18n/locales.ts. Aqui vive o contrato: quais idiomas existem, onde salvamos a preferência e como interpretamos o idioma do navegador.

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

/** Qualquer pt* vira pt-BR; qualquer outro idioma do sistema vira en */
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

A regra fica explícita: português tem prioridade quando o sistema fala alguma variante de pt; o resto cai para inglês. Isso evita ficar “meio francês, meio default” sem critério.

Em seguida, crie i18n/localize.ts — um helper pequeno para campos que existem nos dois idiomas:

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

A função L é só açúcar sintático para não repetir objetos enormes no catálogo.

---

# 5. Dicionários de interface

Textos curtos de UI (nav, botões, títulos de seção) ficam bem em arquivos TypeScript. Crie i18n/messages/pt-BR.ts:

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

E o espelho em inglês, i18n/messages/en.ts, tipado com o mesmo Dictionary:

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

O seletor fica em i18n/get-dictionary.ts:

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

Por que TypeScript e não JSON? Porque o compilador grita se você esquecer uma chave no inglês. Em um artigo longo isso é ouro.

---

# 6. LocaleProvider: o coração no cliente

Crie components/locale-provider.tsx com a diretiva use client no topo. Esse componente:

1. Lê o localStorage (escolha do usuário).
2. Se não houver, detecta o idioma do navegador.
3. Escreve cookie para o servidor.
4. Atualiza o atributo lang do elemento html.
5. Expõe locale, setLocale e o dicionário via Context.

Trecho essencial:

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

Observe o detalhe do persist: na primeira visita detectamos o sistema e gravamos o cookie, mas só gravamos localStorage quando o usuário escolhe. Assim, quem nunca tocou no select ainda acompanha o idioma do SO; quem escolheu manualmente fica com a preferência fixa.

A chamada router.refresh força o Next a re-renderizar Server Components com o cookie novo — essencial para páginas de artigo.

---

# 7. Select de idioma no header

Arquivo components/language-select.tsx:

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

E o header em components/site-header.tsx, usando Tailwind só para composição visual:

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

O select fica no canto superior direito — o lugar onde o usuário já procura controles do site (tema, idioma, conta).

---

# 8. Ligando tudo no layout

Em app/layout.tsx, envolva a aplicação com o provider. Opcionalmente, um script mínimo no head reduz o flash de idioma errado antes da hidratação:

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

A home pode ser um Client Component simples:

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

# 9. Locale no servidor (cookie)

Client Components resolvem a UI. Mas uma página de artigo em Server Component precisa saber o idioma antes de hidratar. Para isso, crie i18n/server-locale.ts:

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

Você pode implementar detectFromAcceptLanguage no mesmo espírito de detectBrowserLocale: prioriza pt, senão en. Na primeira request sem cookie, o header Accept-Language já dá um bom chute.

---

# 10. Markdown localizado

Conteúdo longo não cabe bem em dicionário. O esquema simples e eficaz: arquivo base em português e irmão em inglês com o sufixo .en.md.

```text
content/posts/welcome.md
content/posts/welcome.en.md
```

Configure o bundler para importar arquivos .md como string. No Next com webpack, algo como type asset/source. Depois o catálogo:

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

Na página do artigo:

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
      {/* passe resolved.md para o seu renderer de Markdown */}
      <pre className="whitespace-pre-wrap text-sm">{resolved.md}</pre>
    </article>
  );
}
```

Quando o usuário troca o idioma no select, o cookie muda e o refresh faz essa página buscar o Markdown certo de novo.

---

# 11. O fluxo completo (de ponta a ponta)

Vale reler o caminho mental:

1. Primeira visita: o script ou o provider olha o navegador, escolhe pt-BR ou en e grava o cookie.
2. UI: Client Components leem o Context e mostram o dicionário.
3. Artigo: Server Component lê o cookie e escolhe o corpo em português ou inglês.
4. Troca manual: o select grava localStorage e cookie e chama refresh.
5. Volta amanhã: o localStorage manda; o sistema não sobrescreve a escolha humana.

```text
[navegador / storage]
        │
        ▼
 LocaleProvider ──► cookie ──► getRequestLocale()
        │                           │
        ▼                           ▼
  dicionário UI              resolvePost / Markdown
```

---

# Conclusão

Este padrão não tenta substituir next-intl em um e-commerce multilíngue com SEO agressivo por idioma. Ele resolve muito bem o caso do site pessoal, documentação pequena ou produto com dois idiomas e URL limpa: você controla a detecção, a persistência e o conteúdo longo sem inventar uma segunda árvore de rotas.

O que vale levar daqui:

- Separe regras (pasta i18n) de UI (pasta components).
- Use dicionários tipados para strings curtas.
- Use pares de Markdown (.md e .en.md) para texto longo.
- Espelhe a preferência em cookie para o App Router não ficar cego no servidor.

Com isso, i18n deixa de ser um plugin misterioso e vira um fluxo que você consegue desenhar no papel — e explicar para a próxima pessoa do time.
