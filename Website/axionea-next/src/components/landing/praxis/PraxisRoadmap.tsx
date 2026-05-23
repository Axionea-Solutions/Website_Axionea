"use client";

import { useInView } from "@/hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { kfoPhases, kfoRoadmapBanner, kfoRoadmapIntro } from "@/data/kfo-praxis";
import type { PraxisPhase } from "@/data/kfo-praxis";

function PhaseCard({ phase, index }: { phase: PraxisPhase; index: number }) {
    const { ref, isInView } = useInView<HTMLLIElement>(0.1);

    return (
        <li
            ref={ref}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
            }}
            className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-sapphire/30 transition-all duration-300"
        >
            <div className="flex items-center justify-between mb-4">
                <span
                    className="text-2xl font-bold text-sapphire tracking-tight"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    {phase.phase}
                </span>
                <span className="text-[11px] font-semibold text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    {phase.duration}
                </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                {phase.title}
            </h3>
            <ul className="space-y-2">
                {phase.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-sapphire shrink-0 mt-1.5" />
                        <span>{step}</span>
                    </li>
                ))}
            </ul>
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
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {kfoPhases.map((phase, i) => (
                    <PhaseCard key={phase.phase} phase={phase} index={i} />
                ))}
            </ol>

            <div className="mt-8 rounded-2xl border border-sapphire/20 bg-sapphire/[0.07] backdrop-blur-md p-6 md:p-8 text-center">
                <p className="text-lg md:text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                    {kfoRoadmapBanner.claim}
                </p>
                <p className="text-gray-400 text-sm md:text-base">{kfoRoadmapBanner.subtitle}</p>
            </div>
        </section>
    );
}
