"use client";

import { LetterReveal } from "@/components/ui/LetterReveal";
import { useInView } from "@/hooks/useInView";
import { PraxisIcon } from "./icons";
import { kfoStats } from "@/data/kfo-praxis";

export function PraxisHero({
    chip,
    headline,
    subline,
    intro,
}: {
    chip: string;
    headline: string;
    subline: string;
    intro: string;
}) {
    const { ref, isInView } = useInView(0.1);

    return (
        <>
            {/* Hero */}
            <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                    <PraxisIcon name="aligner" className="w-3.5 h-3.5" />
                    {chip}
                </span>
                <h1
                    className="text-[clamp(36px,6vw,72px)] font-bold tracking-tight leading-tight mb-6 text-white"
                    style={{
                        fontFamily: "var(--font-syne)",
                        textShadow:
                            "0 0 16px rgba(125,211,252,0.5), 0 0 40px rgba(56,189,248,0.4), 0 0 90px rgba(15,82,186,0.4)",
                    }}
                >
                    <LetterReveal text={headline} />
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    <LetterReveal text={subline} delay={0.2} stagger={0.012} />
                </p>
            </div>

            {/* Intro */}
            <div className="max-w-3xl mx-auto mb-16">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">{intro}</p>
            </div>

            {/* Stats */}
            <div
                ref={ref}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20"
                style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(20px)",
                    transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {kfoStats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] p-6 text-center"
                    >
                        <p className="text-3xl md:text-4xl font-bold text-sapphire mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                            {stat.value}
                        </p>
                        <p className="text-slate-500 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
