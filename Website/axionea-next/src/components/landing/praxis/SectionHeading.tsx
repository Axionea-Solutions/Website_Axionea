"use client";

import { LetterReveal } from "@/components/ui/LetterReveal";
import { PraxisIcon } from "./icons";
import type { PraxisIconKey } from "@/data/kfo-praxis";

export function SectionHeading({
    eyebrow,
    eyebrowIcon = "router",
    title,
    subtitle,
}: {
    eyebrow: string;
    eyebrowIcon?: PraxisIconKey;
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                <PraxisIcon name={eyebrowIcon} className="w-3.5 h-3.5" />
                {eyebrow}
            </span>
            <h2
                className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
            >
                <LetterReveal text={title} />
            </h2>
            {subtitle && (
                <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mt-4">
                    <LetterReveal text={subtitle} delay={0.2} stagger={0.012} />
                </p>
            )}
        </div>
    );
}
