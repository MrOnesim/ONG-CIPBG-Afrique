import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CIPBG Afrique – Cercle International pour la Paix et la Bonne Gouvernance en Afrique",
    template: "%s | CIPBG Afrique",
  },
  description:
    "ONG CIPBG Afrique – Promouvoir la paix, la bonne gouvernance, la démocratie et le développement durable au Bénin et en Afrique.",
  keywords: [
    "CIPBG Afrique",
    "ONG paix Bénin",
    "bonne gouvernance Bénin",
    "ONG Abomey-Calavi",
    "paix Afrique",
    "démocratie Bénin",
  ],
  metadataBase: new URL("https://cipbg-afrique.org"),
  openGraph: {
    title: "CIPBG Afrique – Paix et Bonne Gouvernance en Afrique",
    description:
      "Ensemble, construisons des sociétés plus pacifiques, responsables, transparentes et inclusives.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable} ${merriweather.variable}`}>
      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
