"use client";

import { useInView } from "@/hooks/useInView";
import { PraxisIcon } from "./icons";
import { SectionHeading } from "./SectionHeading";
import { PRAXIS_GRAPHICS } from "./graphics/PraxisGraphics";
import type { PraxisServiceCard } from "@/data/kfo-praxis";

function ServiceCard({ card, index }: { card: PraxisServiceCard; index: number }) {
    const { ref, isInView } = useInView<HTMLElement>(0.1);
    const Graphic = card.graphicKey ? PRAXIS_GRAPHICS[card.graphicKey] : null;

    return (
        <article
            ref={ref}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 3) * 0.12}s`,
            }}
            className={`group relative h-full overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 ${
                card.highlight
                    ? "border-2 border-sapphire/40 hover:border-sapphire/70 hover:shadow-[0_0_24px_rgba(15,82,186,0.3)]"
                    : "border border-slate-200 hover:border-sapphire/50 hover:shadow-[0_0_20px_rgba(15,82,186,0.25),0_0_50px_rgba(15,82,186,0.12)]"
            } ${card.subtle ? "opacity-90" : ""}`}
        >
            {/* Illustration / Icon header */}
            <div className="relative border-b border-slate-100">
                {Graphic ? (
                    <Graphic />
                ) : (
                    <div className="flex h-64 items-center justify-center bg-[#FBFCFE]">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sapphire shadow-sm">
                            <PraxisIcon name={card.iconKey} className="h-9 w-9" />
                        </div>
                    </div>
                )}
                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[2px] text-sapphire/70 shadow-sm backdrop-blur-sm">
                    {card.phase}
                </span>
            </div>

            {/* Content */}
            <div className="relative p-6">
                <h3 className="mb-2 text-base font-bold tracking-tight text-sapphire" style={{ fontFamily: "var(--font-syne)" }}>
                    {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{card.description}</p>
            </div>
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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, i) => (
                    <ServiceCard key={card.title} card={card} index={i} />
                ))}
            </div>
        </section>
    );
}
