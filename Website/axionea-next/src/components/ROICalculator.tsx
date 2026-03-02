"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LetterReveal } from "./ui/LetterReveal";
import { IndustrySelector } from "./roi-calculator/IndustrySelector";
import { InputSlider } from "./roi-calculator/InputSlider";
import { ResultCard } from "./roi-calculator/ResultCard";
import { SourceAccordion } from "./roi-calculator/SourceAccordion";
import { AnimatedCounter } from "./roi-calculator/AnimatedCounter";
import { AnimatedGraphic } from "./roi-calculator/AnimatedGraphic";
import { calculateROI, CalculatorInput } from "./roi-calculator/roi-calculator.utils";

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setIsInView(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, isInView };
}

export default function ROICalculator() {
    const { ref, isInView } = useInView(0.1);

    // States for the 4 inputs
    const [industryId, setIndustryId] = useState<string | null>(null);
    const [teamSize, setTeamSize] = useState(10);
    const [weeklyHours, setWeeklyHours] = useState(8);
    const [hourlyCost, setHourlyCost] = useState(45);

    const input: CalculatorInput = {
        industryId,
        teamSize,
        hourlyCost,
        weeklyHours,
    };

    const results = calculateROI(input);

    return (
        <section id="roi" className="py-16 md:py-24 px-6 bg-background relative overflow-hidden">

            {/* Background ambient glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sapphire/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3.5 h-3.5"
                        >
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                            <line x1="8" y1="6" x2="16" y2="6" />
                            <line x1="8" y1="10" x2="16" y2="10" />
                            <line x1="8" y1="14" x2="12" y2="14" />
                        </svg>
                        ROI CALCULATOR
                    </span>
                    <h2
                        className="text-[clamp(28px,6vw,52px)] font-bold tracking-tight leading-tight mb-4 break-words hyphens-auto"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        <LetterReveal text="Berechnen Sie Ihren " />
                        <br className="hidden sm:block" />
                        <span className="text-sapphire">
                            <LetterReveal text="Verlust durch Ineffizienz" delay={0.3} />
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        <LetterReveal
                            text="Finden Sie heraus, wie viel Geld Ihr Unternehmen aktuell jeden Monat für manuelle, repetitive Aufgaben verbrennt – basierend auf echten Branchendaten von McKinsey & EY."
                            delay={0.6}
                            stagger={0.015}
                        />
                    </p>
                </div>

                {/* Main Calculator Box */}
                <div
                    ref={ref}
                    style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "translateY(0)" : "translateY(20px)",
                        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="rounded-[2.5rem] border border-black/10 dark:border-white/10 bg-white dark:bg-[#040812] shadow-2xl overflow-hidden backdrop-blur-sm"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/10 dark:divide-white/10">

                        {/* LEFT COLUMN: Inputs */}
                        <div className="lg:col-span-4 p-8 md:p-10 lg:p-12 flex flex-col justify-center space-y-10 bg-black/[0.01] dark:bg-white/[0.01]">
                            <IndustrySelector selectedId={industryId} onChange={setIndustryId} />

                            <div className="space-y-8">
                                <InputSlider
                                    label="Wie viele Mitarbeitende hat Ihr Team?"
                                    value={teamSize}
                                    min={1}
                                    max={100}
                                    onChange={setTeamSize}
                                />

                                <InputSlider
                                    label="Ø Stundenkosten (inkl. AG-Anteil)"
                                    value={hourlyCost}
                                    min={25}
                                    max={120}
                                    step={5}
                                    unit=" €"
                                    onChange={setHourlyCost}
                                />

                                <InputSlider
                                    label="Wöchentliche manuelle Routine-Aufgaben (pro Person)"
                                    value={weeklyHours}
                                    min={2}
                                    max={30}
                                    unit=" h"
                                    onChange={setWeeklyHours}
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Results */}
                        <div className="lg:col-span-8 p-8 md:p-10 lg:p-12 flex flex-col relative min-h-[600px]">

                            <AnimatedGraphic />

                            {!industryId ? (
                                // Empty State / Prompt
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background/50 backdrop-blur-sm z-10">
                                    <div className="w-16 h-16 rounded-full bg-sapphire/10 flex items-center justify-center mb-4 border border-sapphire/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-sapphire">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                                        Wählen Sie Ihre Branche
                                    </h3>
                                    <p className="text-muted-foreground max-w-md">
                                        Um die detaillierten McKinsey & EY Potenziale zu sehen, wählen Sie bitte links Ihre Branche aus.
                                    </p>
                                </div>
                            ) : null}

                            {/* Big Header Result */}
                            <div className={`transition-opacity duration-500 ${!industryId ? "opacity-30 blur-sm" : "opacity-100"}`}>
                                <div className="mb-10 text-center lg:text-left">
                                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                        Ihre monatlichen Kosten für repetitive Arbeit
                                    </p>
                                    <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground drop-shadow-sm flex items-center justify-center lg:justify-start" style={{ fontFamily: "var(--font-syne)" }}>
                                        <AnimatedCounter value={results.monthlyRepetitiveCost} />
                                        <span className="text-3xl sm:text-4xl text-muted-foreground ml-2">€</span>
                                    </div>
                                </div>

                                {/* 3 Result Cards Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
                                    <ResultCard
                                        title="KI-Potenzial (Maximal)"
                                        valueMin={Math.round(results.savingsPotentialMin)}
                                        valueMax={Math.round(results.savingsPotentialMax)}
                                        label="Mögliche Kostensenkung"
                                        progressPercent={100}
                                        colorClass="bg-blue-500"
                                        bgClass="bg-[#F0F4FF] dark:bg-blue-900/10"
                                        delay={0.1}
                                    />
                                    <ResultCard
                                        title="Ohne Axionea (Typisch)"
                                        valueMin={Math.round(results.realizationWithout)}
                                        label="Tatsächliche Realisierung"
                                        progressPercent={25}
                                        colorClass="bg-red-500"
                                        bgClass="bg-[#FFF0F0] dark:bg-red-900/10"
                                        delay={0.2}
                                    />
                                    <ResultCard
                                        title="Mit Axionea (Begleitet)"
                                        valueMin={Math.round(results.realizationWith)}
                                        label="Sichere Realisierung"
                                        progressPercent={70}
                                        colorClass="bg-green-500"
                                        bgClass="bg-[#F0FFF4] dark:bg-green-900/10"
                                        delay={0.3}
                                    />
                                </div>

                                {/* Bottom Summary & CTA */}
                                <div className="mt-auto flex flex-col items-center lg:items-start space-y-4 pt-6 border-t border-black/5 dark:border-white/5">
                                    <p className="text-lg text-foreground font-medium flex items-center gap-2">
                                        Jährlicher Verlust durch Nichtstun:
                                        <span className="font-bold text-red-500 ml-1">
                                            ≈ <AnimatedCounter value={results.annualLossMin} /> <span className="font-normal mx-0.5">–</span> <AnimatedCounter value={results.annualLossMax} /> €
                                        </span>
                                    </p>

                                    {results.paybackMonths > 0 && (
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            ROI mit Axionea: Amortisation ab <strong className="text-foreground">Monat {results.paybackMonths}—{results.paybackMonths + 1}</strong>
                                        </p>
                                    )}

                                    <a
                                        href="#kontakt"
                                        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sapphire text-white font-semibold text-base transition-all duration-300 hover:bg-sapphire-hover hover:scale-[1.02] shadow-[0_8px_32px_rgba(15,82,186,0.3)]"
                                    >
                                        Kostenloses Erstgespräch buchen
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>

                                {/* Expanding Sources Section */}
                                <SourceAccordion industry={results.industryFactor} />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
