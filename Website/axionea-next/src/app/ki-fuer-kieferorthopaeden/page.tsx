import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { PraxisHero } from "@/components/landing/praxis/PraxisHero";
import { PraxisServiceGrid } from "@/components/landing/praxis/PraxisServiceGrid";
import { PraxisRoadmap } from "@/components/landing/praxis/PraxisRoadmap";
import { KnowledgeArchitecture } from "@/components/landing/praxis/KnowledgeArchitecture";
import { PraxisWikiDemo } from "@/components/landing/praxis/PraxisWikiDemo";
import { PraxisDifferentiators } from "@/components/landing/praxis/PraxisDifferentiators";
import { PraxisFAQ } from "@/components/landing/praxis/PraxisFAQ";
import { FoerderungTrustBlock } from "@/components/landing/praxis/FoerderungTrustBlock";
import { PraxisCTA } from "@/components/landing/praxis/PraxisCTA";
import {
    kfoCtaText,
    kfoServiceCards,
    kfoServicesIntro,
    kfoUseCases,
} from "@/data/kfo-praxis";

export const metadata: Metadata = {
    title: "KI für Kieferorthopäden | Aligner-Anfragen automatisieren — Axionea",
    description:
        "KI-Lösungen für Kieferorthopädie-Praxen: Aligner-Anfragen 24/7, Konsultations-Routing, automatische Recall-Erinnerungen. DSGVO-konform, sofort einsetzbar.",
    keywords: [
        "KI für Kieferorthopäden",
        "Aligner Anfragen automatisieren",
        "KFO Praxis Automatisierung",
        "KI Kieferorthopädie",
        "Patientenkommunikation Kieferorthopäde",
    ],
    alternates: { canonical: "https://www.axionea-solutions.de/ki-fuer-kieferorthopaeden" },
    openGraph: {
        title: "KI für Kieferorthopäden | Axionea",
        description:
            "DSGVO-konforme KI für Aligner-Anfragen, Recalls, Konsultations-Routing — sofort einsetzbar.",
        url: "https://www.axionea-solutions.de/ki-fuer-kieferorthopaeden",
    },
};

export default function KiFuerKieferorthopaeden() {
    return (
        <>
            <main className="min-h-screen bg-[#070d1a] text-white selection:bg-sapphire selection:text-white pt-32 pb-16 overflow-hidden">
                {/* Background Glows */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-sapphire/20 blur-[120px]" />
                    <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
                    <PraxisHero
                        chip="KIEFERORTHOPÄDIE"
                        headline="KI für Kieferorthopäden"
                        subline="Aligner-Anfragen, Recalls und Konsultations-Routing — automatisiert auf KFO-Niveau."
                        intro="Aligner-Anfragen kommen rund um die Uhr, der initiale Beratungsbedarf ist hoch, und Recall-Termine über die gesamte Behandlungsdauer (oft 18–24 Monate) wollen sauber gesteuert sein. Wir bauen KI-Systeme, die diese Patient-Journey vollständig abbilden — von der ersten Aligner-Anfrage bis zur letzten Kontroll-Erinnerung."
                    />

                    <PraxisServiceGrid
                        eyebrow="KONKRET FÜR KFO"
                        eyebrowIcon="aligner"
                        title="Was wir konkret bauen"
                        subtitle="Die Aligner-Patient-Journey — von der Erstanfrage bis zum letzten Recall"
                        cards={kfoUseCases}
                    />

                    <PraxisServiceGrid
                        eyebrow={kfoServicesIntro.eyebrow}
                        eyebrowIcon="database"
                        title={kfoServicesIntro.title}
                        subtitle={kfoServicesIntro.subtitle}
                        cards={kfoServiceCards}
                    />

                    <PraxisRoadmap />

                    <KnowledgeArchitecture />

                    <PraxisWikiDemo />

                    <PraxisDifferentiators />

                    <PraxisFAQ />

                    <FoerderungTrustBlock />

                    <PraxisCTA ctaText={kfoCtaText} />
                </div>
            </main>
            <Footer />
        </>
    );
}
