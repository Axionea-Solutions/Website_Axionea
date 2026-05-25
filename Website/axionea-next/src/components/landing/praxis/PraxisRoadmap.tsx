"use client";

import { useInView } from "@/hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { kfoPhases, kfoRoadmapBanner, kfoRoadmapIntro } from "@/data/kfo-praxis";
import type { PraxisPhase } from "@/data/kfo-praxis";

function PhaseNode({ phase, index }: { phase: PraxisPhase; index: number }) {
    const { ref, isInView } = useInView<HTMLLIElement>(0.1);
    const phaseNumber = phase.phase.replace(/^Phase\s*/i, "");

    return (
        <li
            ref={ref}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
            }}
            className="relative lg:flex-1 lg:px-3 flex gap-5 lg:block"
        >
            {/* Marker */}
            <div className="relative z-10 shrink-0 lg:mb-4 lg:flex lg:justify-center">
                <div className="size-14 rounded-full border border-sapphire/40 bg-[#070d1a] flex items-center justify-center shadow-[0_0_24px_rgba(56,127,255,0.25)]">
                    <span
                        className="text-sapphire font-bold text-lg leading-none"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        {phaseNumber}
                    </span>
                </div>
            </div>

            {/* Inhalt */}
            <div className="flex-1 min-w-0 lg:text-center">
                <div className="mb-2 lg:flex lg:justify-center">
                    <span className="inline-block text-[11px] font-semibold text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                        {phase.duration}
                    </span>
                </div>
                <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    {phase.title}
                </h3>
                <ul className="space-y-2 lg:max-w-[220px] lg:mx-auto lg:text-left">
                    {phase.steps.map((step) => (
                        <li key={step} className="flex items-start gap-2.5 text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-sapphire shrink-0 mt-1.5" />
                            <span>{step}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
}

export function PraxisRoadmap() {
    return (
        <section className="mb-20">
            <SectionHeading
                eyebrow={kfoRoadmapIntro.eyebrow}
                eyebrowIcon="report"
                title={kfoRoadmapIntro.title}
                subtitle={kfoRoadmapIntro.subtitle}
            />

            <ol className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
                {/* Verbindungslinie — vertikal (mobil) */}
                <div
                    aria-hidden="true"
                    className="absolute left-[27px] top-7 bottom-7 w-px bg-gradient-to-b from-sapphire/10 via-sapphire/60 to-sapphire/10 lg:hidden"
                />
                {/* Verbindungslinie — horizontal (desktop) */}
                <div
                    aria-hidden="true"
                    className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[28px] h-px bg-gradient-to-r from-sapphire/10 via-sapphire/60 to-sapphire/10"
                />

                {kfoPhases.map((phase, i) => (
                    <PhaseNode key={phase.phase} phase={phase} index={i} />
                ))}
            </ol>

            <div className="mt-12 rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] p-6 md:p-8 text-center">
                <p
                    className="text-lg md:text-xl font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    {kfoRoadmapBanner.claim}
                </p>
                <p className="text-slate-500 text-sm md:text-base">{kfoRoadmapBanner.subtitle}</p>
            </div>
        </section>
    );
}
