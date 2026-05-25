"use client";

import { useInView } from "@/hooks/useInView";
import { SectionHeading } from "./SectionHeading";
import { PraxisIcon } from "./icons";
import {
    kfoArchitectureIntro,
    knowledgeAgents,
    knowledgeBase,
    knowledgeSources,
} from "@/data/kfo-praxis";

function FlowConnector({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center py-4" aria-hidden="true">
            <div className="h-6 w-px bg-gradient-to-b from-sapphire/10 to-sapphire/40" />
            <span className="my-1 text-[10px] font-semibold uppercase tracking-[2px] text-sapphire/60">
                {label}
            </span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-sapphire/60" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
        </div>
    );
}

export function KnowledgeArchitecture() {
    const { ref, isInView } = useInView(0.05);

    return (
        <section className="mb-20">
            <SectionHeading
                eyebrow={kfoArchitectureIntro.eyebrow}
                eyebrowIcon="database"
                title={kfoArchitectureIntro.title}
                subtitle={kfoArchitectureIntro.subtitle}
            />

            <div
                ref={ref}
                style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="max-w-4xl mx-auto"
            >
                {/* Band 1 — Datenquellen */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {knowledgeSources.map((source) => (
                        <div
                            key={source.label}
                            className="rounded-xl border border-slate-200 bg-white shadow-sm px-4 py-3 text-center"
                        >
                            <p className="text-sm font-semibold text-slate-800">{source.label}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5">{source.detail}</p>
                        </div>
                    ))}
                </div>

                <FlowConnector label="fließt ein in" />

                {/* Band 2 — Knowledge Base */}
                <div className="rounded-3xl border-2 border-sapphire/40 bg-white shadow-[0_4px_24px_-4px_rgba(15,82,186,0.15)] p-6 md:p-8">
                    <div className="flex items-center justify-center gap-3 mb-1">
                        <span className="w-9 h-9 rounded-lg bg-sapphire/10 border border-sapphire/20 flex items-center justify-center text-sapphire shrink-0">
                            <PraxisIcon name="database" className="w-5 h-5" />
                        </span>
                        <h3
                            className="text-base md:text-lg font-bold text-slate-900 text-center"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            {knowledgeBase.title}
                        </h3>
                    </div>
                    <p className="text-center text-xs md:text-sm text-sapphire mb-5">{knowledgeBase.subtitle}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {knowledgeBase.categories.map((category) => (
                            <div
                                key={category.title}
                                className="rounded-xl border border-slate-200 bg-[#F0F5FF] px-4 py-3 text-center"
                            >
                                <p className="text-sm font-semibold text-slate-800">{category.title}</p>
                                <p className="text-[11px] text-slate-500 mt-0.5">{category.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <FlowConnector label="beantwortet über" />

                {/* Band 3 — Agenten */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {knowledgeAgents.map((agent) => (
                        <div
                            key={agent.title}
                            className="rounded-xl border border-slate-200 bg-white shadow-sm px-5 py-4 hover:border-sapphire/50 hover:shadow-[0_0_16px_rgba(15,82,186,0.15)] transition-all duration-300"
                        >
                            <div className="flex items-center gap-2.5 mb-1.5">
                                <span className="w-7 h-7 rounded-lg bg-sapphire/10 border border-sapphire/20 flex items-center justify-center text-sapphire shrink-0">
                                    <PraxisIcon name="users" className="w-4 h-4" />
                                </span>
                                <p className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-syne)" }}>
                                    {agent.title}
                                </p>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{agent.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
