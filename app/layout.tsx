import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import { AnimatedGeometricBackground } from "@/_components/_ui/AnimatedGeometricBackground";
import { ClickSpark } from "@/_components/_ui/ClickSpark";
import { CrtOverlay } from "@/_components/_ui/CrtOverlay";
import { DotTextureBackground } from "@/_components/_ui/DotTextureBackground";
import { SiteFooter } from "@/_components/SiteFooter";
import { SiteHeader } from "@/_components/SiteHeader";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE_ARCHIVIST // KELVIN CREPALDI",
  description: "Kelvin Crepaldi — Desenvolvedor Front-end React/JavaScript | Curitiba, Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`light ${spaceGrotesk.variable}`}>
      <body className="relative bg-surface text-on-surface selection:bg-on-surface selection:text-surface overflow-x-hidden font-body antialiased">
        <AnimatedGeometricBackground />
        <DotTextureBackground />
        <SiteHeader />
        <main className="relative z-10 min-h-screen pt-[var(--site-header-height)]">
          {children}
        </main>
        <SiteFooter />
        <ClickSpark
          global
          sparkColor="rgba(54, 51, 34, 0.5)"
          sparkRadius={60}
          sparkCount={4}
        />
        <CrtOverlay />
      </body>
    </html>
  );
}
