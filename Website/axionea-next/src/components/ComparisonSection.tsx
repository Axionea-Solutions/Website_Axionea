"use client";

import { LetterReveal } from "./ui/LetterReveal";
import { useInView } from "@/hooks/useInView";



const axioneaFeatures = [
    "Echtes Developer-Wissen (kein 'VibeCoding')",
    "Konzern-Governance & IT-Sicherheit",
    "Nachhaltiges Change Management",
    "Tiefes Enterprise AI-Wissen",
    "Maßgeschneiderte KI-Architekturen",
    "Skalierbare System-Integration",
    "Autonome KI-Agenten & Chatbots",
    "Laufende Team-Befähigung",
];

const othersFeatures = [
    "Zusammenkopierter 'VibeCode'",
    "Schatten-IT & Compliance-Risiken",
    "Projekte enden nach dem Go-Live",
    "Oberflächliches Prompting",
    "Generische Einheitslösungen",
    "Fehlende Skalierbarkeit",
    "Standard-Chatbots ohne Kontext",
    "Keine langfristige Betreuung",
];

export default function ComparisonSection() {
    const { ref, isInView } = useInView(0.1);

    return (
        <section id="vergleich" className="py-16 md:py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-muted-foreground mb-4 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                        VERGLEICH
                    </span>
                    <h2
                        className="text-[clamp(28px,6vw,52px)] font-bold tracking-tight leading-tight mb-4 break-words hyphens-auto"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        <LetterReveal text="Präzision vs. Standard" />
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        <LetterReveal text="Sieh, wie unsere KI die Konkurrenz in Geschwindigkeit und Qualität übertrifft" delay={0.2} stagger={0.015} />
                    </p>
                </div>

                {/* Comparison Card */}
                <div
                    ref={ref}
                    style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "translateY(0)" : "translateY(20px)",
                        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-500 hover:border-sapphire/50 hover:shadow-[0_0_20px_rgba(15,82,186,0.25),0_0_50px_rgba(15,82,186,0.12)]">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Axionea Column */}
                            <div className="p-8 md:p-10 md:border-r border-b md:border-b-0 border-slate-200">
                                <h3
                                    className="text-2xl md:text-3xl font-bold text-sapphire mb-8 tracking-tight"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    Axionea
                                </h3>

                                <div className="h-px w-full bg-slate-200 mb-6" style={{ backgroundImage: "repeating-linear-gradient(90deg, currentColor 0, currentColor 4px, transparent 4px, transparent 10px)", backgroundSize: "10px 1px", opacity: 0.3 }} />

                                <ul className="space-y-4">
                                    {axioneaFeatures.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-sapphire shrink-0 mt-0.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="text-sm text-slate-800">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <a
                                    href="#kontakt"
                                    className="group relative overflow-hidden mt-10 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sapphire text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(15,82,186,0.4)] hover:bg-sapphire-hover"
                                >
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                                    <span className="relative z-10 transition-colors duration-300">Jetzt starten</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                        <line x1="7" y1="17" x2="17" y2="7" />
                                        <polyline points="7 7 17 7 17 17" />
                                    </svg>
                                </a>
                            </div>

                            {/* Others Column */}
                            <div className="p-8 md:p-10 bg-slate-50/50">
                                <h3
                                    className="text-2xl md:text-3xl font-bold mb-8 tracking-tight text-muted-foreground"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    Andere
                                </h3>

                                <div className="h-px w-full mb-6" style={{ backgroundImage: "repeating-linear-gradient(90deg, currentColor 0, currentColor 4px, transparent 4px, transparent 10px)", backgroundSize: "10px 1px", opacity: 0.08 }} />

                                <ul className="space-y-4">
                                    {othersFeatures.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-300 shrink-0 mt-0.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="text-sm text-muted-foreground">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
