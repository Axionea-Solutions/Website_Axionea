import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Preloader from "@/components/Preloader";
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatBot from "@/components/ChatBot";
import CookieBanner from "@/components/CookieBanner";
import StructuredData from "@/components/StructuredData";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.axionea-solutions.de"),
  title: {
    default: "Axionea | KI-Automatisierung für den Mittelstand",
    template: "%s | Axionea",
  },
  description: "Axionea automatisiert repetitive Prozesse in kleinen und mittelständischen Unternehmen — ohne eigene IT-Abteilung, ohne monatelange Einführung, ohne Enterprise-Budget. Live in 4 Wochen. DSGVO-konform. Server in Deutschland.",
  keywords: [
    "KI-Automatisierung",
    "Mittelstand",
    "KI Beratung",
    "KI Agentur",
    "Axionea",
    "Prozesse automatisieren",
    "Künstliche Intelligenz",
    "KI-Chatbot",
    "Voice Agents",
    "Voicebots",
    "KI-Agenten",
    "KI Integration",
    "Workflow Automatisierung",
    "Prozessautomatisierung",
    "KMU Automatisierung",
    "DSGVO-konform",
    "No-Code Automatisierung",
    "Lead Generation KI",
    "Make Automatisierung",
    "Zapier Alternative",
    "KI Agentur Deutschland",
    "DACH",
    "KI für KMU",
    "Automatisierung ohne IT-Abteilung",
  ],
  authors: [
    { name: "Maximilian Zvada", url: "https://www.axionea-solutions.de" },
    { name: "Nico Fisseler", url: "https://www.axionea-solutions.de" },
  ],
  creator: "Axionea GbR",
  publisher: "Axionea GbR",
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
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.axionea-solutions.de",
    title: "Axionea | KI-Automatisierung für den Mittelstand",
    description: "Axionea automatisiert repetitive Prozesse in KMU — ohne IT-Abteilung, ohne Enterprise-Budget. Live in 4 Wochen. DSGVO-konform.",
    siteName: "Axionea",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Axionea — KI-Automatisierung für den Mittelstand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axionea | KI-Automatisierung für den Mittelstand",
    description: "Axionea automatisiert repetitive Prozesse in KMU — ohne IT-Abteilung, ohne Enterprise-Budget. Live in 4 Wochen. DSGVO-konform.",
    images: ["/og-image.png"],
    creator: "@axionea",
  },
  verification: {
    // google: "DEIN_GOOGLE_VERIFICATION_CODE",  // TODO: nach Google Search Console Einrichtung eintragen
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
      </body>
    </html>
  );
}
