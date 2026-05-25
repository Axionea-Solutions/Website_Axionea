"use client";

import { useInView } from "@/hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { PraxisIcon } from "./icons";
import { kfoDifferentiators, kfoDifferentiatorsIntro } from "@/data/kfo-praxis";
import type { PraxisDifferentiator } from "@/data/kfo-praxis";

function DifferentiatorCard({ item, index }: { item: PraxisDifferentiator; index: number }) {
    const { ref, isInView } = useInView(0.1);

    return (
        <div
            ref={ref}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 3) * 0.1}s`,
            }}
            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] p-5 hover:border-sapphire/50 hover:shadow-[0_0_20px_rgba(15,82,186,0.15)] transition-all duration-300"
        >
            <span className="w-10 h-10 rounded-xl bg-sapphire/10 border border-sapphire/20 flex items-center justify-center text-sapphire shrink-0">
                <PraxisIcon name={item.iconKey} className="w-5 h-5" />
            </span>
            <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                    {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
        </div>
    );
}

export function PraxisDifferentiators() {
    return (
        <section className="mb-20">
            <SectionHeading
                eyebrow={kfoDifferentiatorsIntro.eyebrow}
                eyebrowIcon="handshake"
                title={kfoDifferentiatorsIntro.title}
                subtitle={kfoDifferentiatorsIntro.subtitle}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kfoDifferentiators.map((item, i) => (
                    <DifferentiatorCard key={item.title} item={item} index={i} />
                ))}
            </div>
        </section>
    );
}
