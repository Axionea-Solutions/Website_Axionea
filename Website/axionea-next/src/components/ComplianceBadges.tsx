"use client";

import React from 'react';
import { Server, Lock, FileCheck, RefreshCw } from 'lucide-react';
import { LetterReveal } from "./ui/LetterReveal";
import { useInView } from "@/hooks/useInView";
import { cardSection, cardHover, revealStyle } from "@/lib/cardStyles";

const facts = [
    {
        title: "EU-Rechenzentren",
        description: "Hosting und Datenverarbeitung ausschließlich in EU-Rechenzentren. Deine Daten verlassen Europa nicht.",
        icon: <Server className="w-6 h-6 text-sapphire" aria-hidden="true" />,
    },
    {
        title: "Durchgehend verschlüsselt",
        description: "Verschlüsselte Übertragung (TLS) und verschlüsselte Speicherung — Stand der Technik nach DSGVO Art. 32.",
        icon: <Lock className="w-6 h-6 text-sapphire" aria-hidden="true" />,
    },
    {
        title: "AVV & DSGVO Art. 28",
        description: "Auftragsverarbeitungsvertrag inklusive. Keine KI-Trainings auf euren Kunden- oder Geschäftsdaten.",
        icon: <FileCheck className="w-6 h-6 text-sapphire" aria-hidden="true" />,
    },
    {
        title: "Backups & Verfügbarkeit",
        description: "Automatische Backups und Monitoring. Selbstheilende Automatisierungen laufen weiter, statt still auszufallen.",
        icon: <RefreshCw className="w-6 h-6 text-sapphire" aria-hidden="true" />,
    },
];

function FactCard({ fact, index }: { fact: (typeof facts)[number]; index: number }) {
    const { ref, isInView } = useInView(0.1);
    return (
        <div
            ref={ref}
            style={revealStyle(isInView, index)}
            className={`group relative flex flex-col items-center text-center p-8 ${cardSection} ${cardHover}`}
        >
            <div className="mb-4 p-4 rounded-full bg-sapphire/10 border border-sapphire/20 group-hover:shadow-[0_0_20px_rgba(15,82,186,0.3)] transition-all duration-300">
                {fact.icon}
            </div>
            <h3 className="text-lg font-bold text-sapphire mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                {fact.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
                {fact.description}
            </p>

            {/* Hover Gradient line at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-sapphire to-transparent group-hover:w-full transition-all duration-500" />
        </div>
    );
}

export default function ComplianceBadges() {
    return (
        <section id="hosting" className="relative py-16 md:py-24 px-6 overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-sapphire/5 blur-[120px] rounded-[100%] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        SICHERES HOSTING
                    </span>
                    <h2 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight leading-tight mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                        <LetterReveal text="Sicheres Hosting & Compliance" />
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        <LetterReveal text="Deine KI läuft auf sicherer Infrastruktur in Europa — DSGVO-konform, EU-AI-Act-ready und ohne dass deine Daten je zum Trainingsmaterial werden." delay={0.2} stagger={0.015} />
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {facts.map((fact, idx) => (
                        <FactCard key={fact.title} fact={fact} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
