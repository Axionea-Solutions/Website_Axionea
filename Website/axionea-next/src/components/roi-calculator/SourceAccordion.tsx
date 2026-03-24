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
        <div className="mt-8 border-t border-black/10 dark:border-white/10 pt-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
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
                        <div className="pt-4 pb-2 text-xs sm:text-sm text-muted-foreground space-y-4">
                            <p>
                                Die Berechnungen basieren auf publizierten Studien von McKinsey & Company und EY (Ernst & Young).
                                {industry && (
                                    <span>
                                        {" "}Die branchenspezifischen Automatisierungsfaktoren für <strong>{industry.name_de}</strong> stammen aus:
                                    </span>
                                )}
                            </p>

                            {industry && (
                                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-lg p-4">
                                    <p className="font-semibold text-foreground mb-1">
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
                                    <li>Die Realisierungsrate von 25% ohne professionelle Begleitung basiert auf McKinsey-Analysen, nach denen Unternehmen bei digitalen Transformationen lediglich 25% der angestrebten Kosteneinsparungen realisieren (McKinsey, &quot;Bits, Bytes und Butter&quot;, Sept. 2025).</li>
                                    <li>Der Wert von 70% Realisierung mit Axionea ist ein konservatives Ziel basierend auf branchenüblichen Benchmarks für professionell begleitete Automatisierungsprojekte.</li>
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
