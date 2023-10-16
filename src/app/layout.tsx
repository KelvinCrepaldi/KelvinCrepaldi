import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono, Roboto_Mono, Oxygen } from "next/font/google";
import Footer from "@/components/Footer";

const jetbrains = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--jetbrains",
});

const roboto = Roboto_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--roboto-mono",
  weight: ["400"],
});

const oxygen = Oxygen({
  display: "swap",
  subsets: ["latin"],
  variable: "--oxygen",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Kelvin Crepaldi",
  description: "Desenvolvedor Full-Stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${oxygen.variable} ${jetbrains.variable} ${roboto.variable} text-base md:text-lg lg:text-xl text-white bg-gray-800`}
      >
        <Header></Header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
