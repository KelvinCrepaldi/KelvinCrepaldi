import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk } from "next/font/google";

import { SiteFooter } from "@/_components/layout/site-footer";
import { SiteHeader } from "@/_components/layout/site-header";
import {
  ScrollContainerProvider,
  SiteScrollViewport,
} from "@/_components/layout/scroll-container";
import { ThemeProvider } from "@/_components/theme/theme-provider";
import { CrtOverlay } from "@/_components/_ui/CrtOverlay";
import { DotTextureBackground } from "@/_components/_ui/DotTextureBackground";

import { siteConfig } from "@/_utils/site";

import "./globals.css";

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

const themeInitScript = `
(function(){
  try {
    var k = 'kelvin-portfolio-theme-user';
    var t = localStorage.getItem(k);
    var dark;
    if (t === 'dark') dark = true;
    else if (t === 'light') dark = false;
    else dark = true;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

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
      <body className="relative h-[100dvh] overflow-hidden bg-surface text-on-surface selection:bg-on-surface selection:text-surface font-body antialiased">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
