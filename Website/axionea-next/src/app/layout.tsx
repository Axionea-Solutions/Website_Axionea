import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Preloader from "@/components/Preloader";
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatBot from "@/components/ChatBot";
import CookieBanner from "@/components/CookieBanner";
import StructuredData from "@/components/StructuredData";
import ConsentScripts from "@/components/ConsentScripts";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

// Bildschirmtastatur (Mobile) verkleinert das Layout statt es zu überdecken —
// wichtig für das Chat-Eingabefeld im Bottom-Sheet.
export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.axionea-solutions.de"),
  title: "Axionea | KI-Lösungen für Arztpraxen, Kieferorthopäden & Makler",
  description: "KI-Automatisierung für Arztpraxen, Kieferorthopäden und Immobilienmakler. DSGVO-konform, EU-AI-Act-ready, praxiserprobt. Inkl. KI-Schulungen für dein Team. Jetzt kostenloses Erstgespräch buchen.",
  keywords: [
    "KI für Arztpraxen",
    "KI für Kieferorthopäden",
    "KI für Immobilienmakler",
    "KI-Schulung Mitarbeiter",
    "DSGVO KI",
    "EU AI Act",
    "KI Beratung Mittelstand",
    "KI Agentur DACH"
  ],
  authors: [
    { name: "Maximilian Zvada", url: "https://www.axionea-solutions.de" },
    { name: "Nico Fisseler", url: "https://www.axionea-solutions.de" },
  ],
  creator: "Axionea Solutions GbR",
  publisher: "Axionea Solutions GbR",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.axionea-solutions.de",
    languages: {
      "de-DE": "https://www.axionea-solutions.de",
      "de-AT": "https://www.axionea-solutions.de",
      "de-CH": "https://www.axionea-solutions.de",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.axionea-solutions.de",
    title: "Axionea | KI-Lösungen für Arztpraxen, Kieferorthopäden & Makler",
    description: "KI-Automatisierung mit Branchenfokus — DSGVO-konform, sofort einsetzbar, inkl. Team-Schulungen.",
    siteName: "Axionea",
    // OG-Image wird automatisch aus app/opengraph-image.tsx generiert
  },
  twitter: {
    card: "summary_large_image",
    title: "Axionea | KI-Lösungen für Arztpraxen, Kieferorthopäden & Makler",
    description: "KI-Automatisierung mit Branchenfokus — DSGVO-konform, sofort einsetzbar.",
    creator: "@axionea",
    // Twitter-Image wird automatisch aus app/opengraph-image.tsx generiert
  },
  verification: {
    // google: "DEIN_GOOGLE_VERIFICATION_CODE",  // TODO: nach Google Search Console Einrichtung eintragen
  },
  other: {
    "geo.region": "DE-BY",
    "geo.placename": "Gaimersheim",
    "geo.position": "48.814;11.381",
    "ICBM": "48.814, 11.381",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <StructuredData />
          <Preloader />
          <AnimatedNavbar />
          <ChatBot />
          {children}
          <CookieBanner />
        </ThemeProvider>
        <ConsentScripts />
      </body>
    </html>
  );
}
