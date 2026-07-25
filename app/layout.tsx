import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import { SiteFooter } from "@/_components/layout/site-footer";
import { SiteHeader } from "@/_components/layout/site-header";
import {
  ScrollContainerProvider,
  SiteScrollViewport,
} from "@/_components/layout/scroll-container";
import { LocaleProvider } from "@/_components/i18n/locale-provider";
import { ThemeProvider } from "@/_components/theme/theme-provider";
import { CrtOverlay } from "@/_components/_ui/CrtOverlay";
import { DotTextureBackground } from "@/_components/_ui/DotTextureBackground";

import { siteConfig } from "@/_utils/site";

import "./globals.css";

const localeBootScript = `(function(){try{var k='kelvin-portfolio-locale';var s=localStorage.getItem(k);var raw=(s==='en'||s==='pt-BR')?s:((navigator.languages&&navigator.languages[0])||navigator.language||'');var l=s==='en'||s==='pt-BR'?s:(/^pt/i.test(raw)?'pt-BR':(raw?'en':'pt-BR'));document.documentElement.lang=l;document.cookie=k+'='+l+';path=/;max-age=31536000;SameSite=Lax';}catch(e){}})();`;

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeBootScript }} />
      </head>
      <body className="relative h-[100dvh] overflow-hidden bg-surface text-on-surface selection:bg-on-surface selection:text-surface font-body antialiased">
        <ThemeProvider>
          <LocaleProvider>
            <ScrollContainerProvider>
              <div className="relative flex h-[100dvh] flex-col overflow-hidden">
                <DotTextureBackground />
                <SiteHeader />
                <SiteScrollViewport>
                  <main className="relative z-10 min-h-full">{children}</main>
                  <SiteFooter />
                </SiteScrollViewport>
                <CrtOverlay />
              </div>
            </ScrollContainerProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
