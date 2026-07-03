import type { CSSProperties } from "react";

// Gemeinsame Karten-Klassen — eine Quelle für Radien, Flächen und Hover,
// damit alle Sektionskarten identisch wirken.
//
// cardSection: großflächige Sektionskarten (Benefit-, Service-, Team-Karten,
//              Accordions, Vergleichstabelle) — rounded-3xl
// cardSmall:   kompakte Karten (Kontakt-Infos, Workflow-Nodes) — rounded-2xl
// cardHover:   einheitlicher Sapphire-Glow-Hover mit Lift

export const cardSection =
    "rounded-3xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]";

export const cardSmall =
    "rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]";

export const cardHover =
    "transition-all duration-500 hover:border-sapphire/50 hover:shadow-[0_0_20px_rgba(15,82,186,0.25),0_0_50px_rgba(15,82,186,0.12)] hover:-translate-y-1";

// Einheitliche Entrance-Animation für alle Sektionskarten: 0,7 s,
// translateY(16px), Stagger 0,08 s pro Index. Zusammen mit useInView nutzen:
//   const { ref, isInView } = useInView(0.1);
//   <div ref={ref} style={revealStyle(isInView, index)}>
export function revealStyle(isInView: boolean, index = 0): CSSProperties {
    const delay = `${index * 0.08}s`;
    return {
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}`,
    };
}
