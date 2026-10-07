import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { LetterReveal } from "@/components/ui/LetterReveal";
import FoerderCheck from "@/components/foerderung/FoerderCheck";

export const metadata: Metadata = {
    title: "BAFA & Förderprogramme für KI-Projekte | KfW, Länder — Axionea",
    description: "BAFA-Beratungsförderung, KfW-Kredite, Bayern Digitalbonus, Mittelstand-Digital — wir erklären die Förderprogramme für KI-Projekte in KMU und unterstützen bei der Antragstellung.",
    keywords: [
        "BAFA Förderung KI",
        "BAFA Beratungsförderung",
        "KI Förderung KMU",
        "Digitalbonus Bayern",
        "KfW Digitalisierungskredit",
        "Förderung Mittelstand KI",
        "Mittelstand-Digital",
    ],
    alternates: { canonical: "https://www.axionea-solutions.de/foerderung" },
    openGraph: {
        title: "BAFA & Förderprogramme für KI-Projekte | Axionea",
        description: "Übersicht aller Förderprogramme für KI-Einführung in KMU — von BAFA bis Land Bayern. Mit Antragsunterstützung.",
        url: "https://www.axionea-solutions.de/foerderung",
    },
};

interface Programme {
    name: string;
    sponsor: string;
    maxAmount: string;
    quote: string;
    target: string;
    description: string;
    link?: string;
    badge?: "TOP" | "NEU" | "LAND";
}

// Stand 07.10.2026: „digital jetzt“ (bis 31.12.2023) und „go-digital“ (bis 31.12.2024) sind ausgelaufen und entfernt.
const programs: Programme[] = [
    {
        name: "BAFA Beratungs­förderung für KMU",
        sponsor: "Bundesamt für Wirtschaft und Ausfuhrkontrolle (BAFA)",
        maxAmount: "bis 3.500 €",
        quote: "50–80 % der Beratungs­kosten",
        target: "KMU mit <250 Mitarbeitenden",
        description: "Allgemeine Unternehmens­beratung — auch für KI-Strategie und -Audit nutzbar. In den neuen Bundesländern und Berlin höhere Förderquote (80 %), in den alten Bundesländern 50 %.",
        link: "https://www.bafa.de/DE/Wirtschaft/Beratung_Finanzierung/Unternehmensberatung/unternehmensberatung_node.html",
    },
    {
        name: "Bayern Digitalbonus",
        sponsor: "Bayerisches Staats­ministerium für Wirtschaft",
        maxAmount: "bis 50.000 €",
        quote: "30–50 % je nach Variante",
        target: "Bayerische KMU mit 3–249 Mitarbeitenden",
        description: "Bayern-spezifische Förderung für Digitalisierungs-Investitionen und IT-Sicherheit. Drei Varianten: Standard (10.000 €), Plus (50.000 €) und Kredit. Antragstellung über IHK München / Bayern Innovativ.",
        link: "https://www.digitalbonus.bayern/",
        badge: "LAND",
    },
    {
        name: "KfW-Digitalisierungs- und Innovationskredit",
        sponsor: "Kreditanstalt für Wiederaufbau (KfW)",
        maxAmount: "bis 25 Mio. €",
        quote: "Zinsverbilligter Kredit, ggf. mit Tilgungs­zuschuss",
        target: "Etablierte Unternehmen (>2 Jahre am Markt)",
        description: "Niedrig­verzinste Finanzierung für Digitalisierungs- und Innovationsvorhaben. Geeignet für größere KI-Roll-outs oder Plattform-Investitionen mit längerem Amortisations­horizont.",
        link: "https://www.kfw.de/inlandsfoerderung/Unternehmen/Erweitern-Festigen/Digitalisierung-%26-Innovation/",
    },
    {
        name: "Mittelstand-Digital Zentren",
        sponsor: "Bundesministerium für Wirtschaft (BMWK)",
        maxAmount: "kostenlos",
        quote: "100 % staatlich finanziert",
        target: "Alle KMU",
        description: "Bundesweites Netz von 28 Kompetenzzentren — kostenlose Beratung, Demos, Workshops, Pilotprojekte zur Digitalisierung. Kein Ersatz für Implementierung, aber wertvoll für die Strategie-Phase.",
        link: "https://www.mittelstand-digital.de/",
    },
];

const austriaSwitzerlandPrograms: Programme[] = [
    {
        name: "aws Digitalisierung",
        sponsor: "Austria Wirtschafts­service (Österreich)",
        maxAmount: "bis 50.000 €",
        quote: "50–70 % Förderung",
        target: "Österreichische KMU",
        description: "Förderung für Digitalisierungs- und KI-Projekte in österreichischen KMU. Antragstellung über aws.",
        link: "https://www.aws.at/aws-digitalisierung/",
    },
    {
        name: "Innosuisse — Innovationsschecks",
        sponsor: "Schweizerische Agentur für Innovationsförderung (Schweiz)",
        maxAmount: "bis 15.000 CHF",
        quote: "100 % der Forschungs-Stunden bei Forschungspartnern",
        target: "Schweizer KMU",
        description: "Erste Innovationsprojekte — geeignet für KI-Machbarkeits­studien und Prototypen mit einer Forschungsinstitution als Partner.",
        link: "https://www.innosuisse.admin.ch/de/foerderung-innovation/innovationsprojekte",
    },
];

function ProgramCard({ p }: { p: Programme }) {
    return (
        <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 transition-all hover:border-sapphire/30 hover:bg-sapphire/5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <h3
                    className="text-xl md:text-2xl font-bold text-white tracking-tight"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    {p.name}
                </h3>
                {p.badge && (
                    <span className={`text-[10px] font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-full ${p.badge === "TOP" ? "bg-sapphire text-white" : p.badge === "LAND" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"}`}>
                        {p.badge === "TOP" ? "EMPFOHLEN" : p.badge === "LAND" ? "LAND BAYERN" : "NEU"}
                    </span>
                )}
            </div>
            <p className="text-xs text-gray-500 mb-4">{p.sponsor}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="rounded-lg border border-sapphire/20 bg-sapphire/5 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Max. Förderung</p>
                    <p className="text-sapphire text-sm font-bold">{p.maxAmount}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Förderquote</p>
                    <p className="text-white text-sm font-semibold">{p.quote}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Zielgruppe</p>
                    <p className="text-white text-sm font-semibold">{p.target}</p>
                </div>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">{p.description}</p>
            {p.link && (
                <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sapphire text-sm font-semibold hover:text-sapphire-hover transition-colors"
                >
                    Offizielle Programminfo
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                </a>
            )}
        </article>
    );
}

export default function FoerderungPage() {
    return (
        <>
            <main className="min-h-screen bg-[#070d1a] text-white selection:bg-sapphire selection:text-white pt-32 pb-16 overflow-hidden">
                {/* Background Glows */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-sapphire/20 blur-[120px]" />
                    <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                <path d="M12 2v6m0 8v6m10-10h-6M8 12H2" />
                            </svg>
                            FÖRDERUNG
                        </span>
                        <h1
                            className="text-[clamp(36px,6vw,72px)] font-bold tracking-tight leading-tight mb-6 text-white"
                            style={{
                                fontFamily: "var(--font-syne)",
                                textShadow: '0 0 16px rgba(125,211,252,0.5), 0 0 40px rgba(56,189,248,0.4), 0 0 90px rgba(15,82,186,0.4)',
                            }}
                        >
                            <LetterReveal text="Förderprogramme für dein KI-Projekt" />
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            <LetterReveal
                                text="BAFA, KfW, Mittelstand-Digital und Landesprogramme wie der Bayern Digitalbonus — wir kennen die Programme und unterstützen bei der Antragstellung."
                                delay={0.2}
                                stagger={0.012}
                            />
                        </p>
                    </div>

                    {/* Intro */}
                    <div className="max-w-3xl mx-auto mb-12">
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            Für KI-Projekte in KMU gibt es mehrere Förderwege — vom Zuschuss für die Beratung bis zum zinsgünstigen Kredit für die Umsetzung. Oft ist nicht die fehlende Förderung das Problem, sondern dass viele Unternehmen die passenden Programme nicht kennen oder den Antrags­prozess scheuen. Hier ist die Übersicht der relevantesten Programme für KI-Vorhaben in KMU im DACH-Raum.
                        </p>
                    </div>

                    {/* Interaktiver Förder-Check (Leadmagnet) */}
                    <FoerderCheck />

                    {/* DE Programs */}
                    <h2
                        className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Deutschland
                    </h2>
                    <div className="space-y-5 mb-16">
                        {programs.map((p, i) => (
                            <ProgramCard key={i} p={p} />
                        ))}
                    </div>

                    {/* AT / CH Programs */}
                    <h2
                        className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Österreich & Schweiz
                    </h2>
                    <div className="space-y-5 mb-16">
                        {austriaSwitzerlandPrograms.map((p, i) => (
                            <ProgramCard key={i} p={p} />
                        ))}
                    </div>

                    {/* How we help */}
                    <div className="rounded-3xl border border-sapphire/30 bg-sapphire/10 backdrop-blur-md p-8 md:p-12 mb-16">
                        <h2
                            className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Wie wir unterstützen
                        </h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Wir kennen die Förder­programme und begleiten dich vom ersten Check bis zum Verwendungs­nachweis. Konkret heißt das:
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-sapphire shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong className="text-white">Förder-Check im Erstgespräch</strong> — wir prüfen kostenlos welche Programme für dich passen.</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-sapphire shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong className="text-white">Antragsunterstützung</strong> — wir liefern alle nötigen Dokumente, Angebote und Beschreibungen für deinen Antrag.</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-sapphire shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong className="text-white">Verwendungsnachweis</strong> — am Ende der Förderperiode dokumentieren wir die Mittelverwendung sauber für die Schluss­abrechnung.</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-sapphire shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong className="text-white">Stapelbar denken</strong> — bei größeren Projekten kombinieren wir mehrere Programme (z.B. BAFA-Beratung für die Strategie + ein Landesprogramm oder KfW-Kredit für die Umsetzung).</span>
                            </li>
                        </ul>
                    </div>

                    {/* Disclaimer */}
                    <div className="text-xs text-gray-500 mb-12 leading-relaxed">
                        <strong>Wichtig:</strong> Förder­bedingungen, -höhen und -fristen ändern sich regelmäßig. Die hier genannten Zahlen sind der Stand bei Veröffentlichung dieser Seite und dienen der ersten Orientierung. Verbindlich ist immer der offizielle Programm­text bei der jeweiligen Förder­stelle. Die Förder­berechtigung ist im Einzelfall zu prüfen.
                    </div>

                    {/* CTA */}
                    <div className="text-center rounded-3xl border border-sapphire/30 bg-sapphire/10 backdrop-blur-md p-10 md:p-14">
                        <h2
                            className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Welche Förderung passt zu deinem KI-Projekt?
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Im kostenlosen Erstgespräch klären wir gemeinsam welche Programme bei dir passen — und ob sich für dich ein Stapeln mehrerer Programme lohnt.
                        </p>
                        <Link
                            href="#foerder-check"
                            className="inline-block px-8 py-4 rounded-full bg-sapphire text-white font-semibold text-lg hover:bg-sapphire-hover transition-all shadow-[0_0_30px_rgba(15,82,186,0.6)] hover:shadow-[0_0_40px_rgba(15,82,186,0.8)]"
                        >
                            Förder-Check starten →
                        </Link>
                    </div>
                </div>
            </main>
            <BreadcrumbSchema name="Förderung & BAFA" path="/foerderung" />
            <Footer />
        </>
    );
}
