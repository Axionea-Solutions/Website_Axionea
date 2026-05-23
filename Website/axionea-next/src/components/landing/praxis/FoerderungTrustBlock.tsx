"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { PraxisIcon } from "./icons";
import { kfoTrustCards, kfoTrustIntro } from "@/data/kfo-praxis";
import type { TrustCard } from "@/data/kfo-praxis";

function Card({ card, index }: { card: TrustCard; index: number }) {
    const { ref, isInView } = useInView(0.1);

    return (
        <div
            ref={ref}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
            }}
            className="flex flex-col rounded-3xl border border-sapphire/20 bg-sapphire/[0.07] backdrop-blur-md p-8"
        >
            <span className="w-12 h-12 rounded-2xl bg-sapphire/15 border border-sapphire/20 flex items-center justify-center text-sapphire mb-5">
                <PraxisIcon name={card.iconKey} className="w-6 h-6" />
            </span>
            <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                {card.title}
            </h3>
            <ul className="space-y-2.5 mb-7 flex-1">
                {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <svg
                            className="w-4 h-4 text-sapphire shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
            <Link
                href={card.ctaHref}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-sapphire text-white font-semibold text-sm hover:bg-sapphire-hover transition-all shadow-[0_0_24px_rgba(15,82,186,0.4)] hover:shadow-[0_0_32px_rgba(15,82,186,0.6)]"
            >
                {card.ctaLabel} →
            </Link>
        </div>
    );
}

export function FoerderungTrustBlock() {
    return (
        <section className="mb-20">
            <SectionHeading
                eyebrow={kfoTrustIntro.eyebrow}
                eyebrowIcon="shieldCheck"
                title={kfoTrustIntro.title}
                subtitle={kfoTrustIntro.subtitle}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                {kfoTrustCards.map((card, i) => (
                    <Card key={card.title} card={card} index={i} />
                ))}
            </div>
        </section>
    );
}
