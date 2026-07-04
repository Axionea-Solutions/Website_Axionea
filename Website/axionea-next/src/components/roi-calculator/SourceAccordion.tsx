"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Info } from "lucide-react";
import { ROIIndustryFactor } from "./roi-calculator.utils";

interface SourceAccordionProps {
    industry: ROIIndustryFactor | null;
}

export function SourceAccordion({ industry }: SourceAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-8 border-t border-slate-200  pt-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
            >
                <Info className="w-4 h-4" />
                📊 Quellen und Methodik anzeigen
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-2 text-xs sm:text-sm text-slate-500 space-y-4">
                            <p>
                                Die Berechnungen basieren auf publizierten Studien und Erhebungen u. a. von McKinsey & Company, EY, Bitkom, dem ifo Institut, KfW Research und dem MIT.
                                {industry && (
                                    <span>
                                        {" "}Die branchenspezifischen Automatisierungsfaktoren für <strong>{industry.name_de}</strong> stammen aus:
                                    </span>
                                )}
                            </p>

                            {industry && (
                                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-lg p-4">
                                    <p className="font-semibold text-slate-900 mb-1">
                                        <a href={industry.primary_source.url} target="_blank" rel="noopener noreferrer" className="hover:text-sapphire underline underline-offset-2">
                                            {industry.primary_source.name}
                                        </a> ({industry.primary_source.date})
                                    </p>
                                    <p className="mb-2 italic">„{industry.primary_source.key_finding}“</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        {industry.additional_facts.map((fact, i) => (
                                            <li key={i}>{fact}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="space-y-2">
                                <p><strong>Allgemeine Methodik:</strong></p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Die Realisierungsrate von 25% ohne professionelle Begleitung basiert auf McKinsey-Analysen, nach denen Unternehmen bei digitalen Transformationen lediglich 25% der angestrebten Kosteneinsparungen realisieren (McKinsey, &quot;Bits, Bytes und Butter&quot;, Sept. 2025). Eine MIT-Analyse von 300 Unternehmens-Deployments kommt zum selben Muster: Nur ~5% der GenAI-Piloten erreichen messbare Ergebniswirkung — extern begleitete Umsetzungen sind dabei etwa doppelt so erfolgreich wie interne Alleingänge (MIT NANDA, &quot;The GenAI Divide&quot;, Aug. 2025).</li>
                                    <li>Der Wert von 70% Realisierung mit Axionea ist ein konservatives Ziel basierend auf branchenüblichen Benchmarks für professionell begleitete Automatisierungsprojekte — kein garantiertes Ergebnis.</li>
                                    <li>Die Amortisationsschätzung setzt den typischen Projektumfang (Potenzial-Check + Pilotprojekt) ins Verhältnis zur zusätzlich realisierten monatlichen Einsparung. Das konkrete Angebot erstellen wir nach dem kostenlosen Erstgespräch.</li>
                                    <li>Die Stundenkosten umfassen den vollständigen Arbeitgeberbeitrag (Brutto + AG-Anteile).</li>
                                </ul>
                                <p className="mt-4 italic opacity-80">
                                    Hinweis: Diese Berechnung dient als Richtwert. Die tatsächlichen Einsparungen hängen von individuellen Faktoren ab, einschließlich bestehender IT-Infrastruktur, Prozessreife und Mitarbeitenden-Akzeptanz.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
