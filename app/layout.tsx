import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk } from "next/font/google";

import { SiteFooter } from "@/_components/layout/site-footer";
import { SiteHeader } from "@/_components/layout/site-header";
import { ThemeProvider } from "@/_components/theme/theme-provider";
import { CrtOverlay } from "@/_components/_ui/CrtOverlay";
import { DotTextureBackground } from "@/_components/_ui/DotTextureBackground";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KELVIN CREPALDI // DEV",
  description: "Kelvin Crepaldi — Desenvolvedor de Software | Curitiba, Brasil",
};

const themeInitScript = `
(function(){
  try {
    var k = 'kelvin-portfolio-theme-user';
    var t = localStorage.getItem(k);
    var dark;
    if (t === 'dark') dark = true;
    else if (t === 'light') dark = false;
    else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
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
      className={spaceGrotesk.variable}
    >
      <body className="relative bg-surface text-on-surface selection:bg-on-surface selection:text-surface overflow-x-hidden font-body antialiased transition-colors duration-300">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <ThemeProvider>
          <DotTextureBackground />
          <SiteHeader />
          <main className="relative z-10 min-h-screen pt-[var(--site-header-height)]">
            {children}
          </main>
          <SiteFooter />
          <CrtOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
