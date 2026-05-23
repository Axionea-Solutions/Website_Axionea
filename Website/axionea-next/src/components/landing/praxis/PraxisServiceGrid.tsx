"use client";

import { useInView } from "@/hooks/useInView";
import { PraxisIcon } from "./icons";
import { SectionHeading } from "./SectionHeading";
import type { PraxisServiceCard } from "@/data/kfo-praxis";

function ServiceCard({ card, index }: { card: PraxisServiceCard; index: number }) {
    const { ref, isInView } = useInView<HTMLElement>(0.1);

    return (
        <article
            ref={ref}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 3) * 0.12}s`,
            }}
            className={`group relative h-full rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 ${
                card.highlight
                    ? "border-sapphire/30 bg-sapphire/10 hover:border-sapphire/50"
                    : card.subtle
                      ? "border-white/5 bg-white/[0.02] hover:border-white/15"
                      : "border-white/10 bg-white/5 hover:border-sapphire/30 hover:bg-sapphire/5"
            }`}
        >
            <div className="flex items-center justify-between mb-4">
                <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-sapphire ${
                        card.subtle ? "bg-white/5 border border-white/10" : "bg-sapphire/15 border border-sapphire/20"
                    }`}
                >
                    <PraxisIcon name={card.iconKey} className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold tracking-[2px] uppercase text-sapphire/70">
                    {card.phase}
                </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                {card.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{card.description}</p>

            <ul className="space-y-2">
                {card.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <svg
                            className="w-4 h-4 text-sapphire shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

export function PraxisServiceGrid({
    eyebrow,
    eyebrowIcon,
    title,
    subtitle,
    cards,
}: {
    eyebrow: string;
    eyebrowIcon?: Parameters<typeof SectionHeading>[0]["eyebrowIcon"];
    title: string;
    subtitle?: string;
    cards: PraxisServiceCard[];
}) {
    return (
        <section className="mb-20">
            <SectionHeading eyebrow={eyebrow} eyebrowIcon={eyebrowIcon} title={title} subtitle={subtitle} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cards.map((card, i) => (
                    <ServiceCard key={card.title} card={card} index={i} />
                ))}
            </div>
        </section>
    );
}
