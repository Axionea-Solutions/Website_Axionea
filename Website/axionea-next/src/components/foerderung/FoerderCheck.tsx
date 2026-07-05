"use client";

import { useState } from "react";
import ContactButton from "../hubspot/ContactButton";
import {
    FoerderLand,
    FoerderTeamgroesse,
    FoerderVorhaben,
    matchFoerderprogramme,
} from "@/lib/foerder-check-data";

// Matching-Regeln liegen in src/lib/foerder-check-data.ts — gemeinsame Quelle
// mit dem Chatbot-Tool (api/chat), damit beide identisch prüfen.

const LAND_OPTIONS: { value: FoerderLand; label: string }[] = [
    { value: "bayern", label: "Bayern" },
    { value: "de", label: "Anderes Bundesland" },
    { value: "at", label: "Österreich" },
    { value: "ch", label: "Schweiz" },
];

const TEAM_OPTIONS: { value: FoerderTeamgroesse; label: string }[] = [
    { value: "1-2", label: "1–2" },
    { value: "3-99", label: "3–99" },
    { value: "100-249", label: "100–249" },
    { value: "250-499", label: "250–499" },
    { value: "500+", label: "500+" },
];

const VORHABEN_OPTIONS: { value: FoerderVorhaben; label: string }[] = [
    { value: "beratung", label: "Strategie & KI-Check" },
    { value: "umsetzung", label: "Umsetzung & Software" },
    { value: "schulung", label: "Team-Schulungen" },
    { value: "rollout", label: "Größeres Roll-out" },
];

function OptionRow<T extends string>({
    label,
    options,
    selected,
    onSelect,
}: {
    label: string;
    options: { value: T; label: string }[];
    selected: T | null;
    onSelect: (value: T) => void;
}) {
    return (
        <fieldset>
            <legend className="text-sm font-semibold text-white mb-3">{label}</legend>
            <div className="flex flex-wrap gap-2">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        type="button"
                        aria-pressed={selected === opt.value}
                        onClick={() => onSelect(opt.value)}
                        className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            selected === opt.value
                                ? "bg-sapphire text-white border-sapphire"
                                : "bg-white/5 text-gray-300 border-white/10 hover:border-sapphire/40 hover:text-white"
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </fieldset>
    );
}

export default function FoerderCheck() {
    const [land, setLand] = useState<FoerderLand | null>(null);
    const [team, setTeam] = useState<FoerderTeamgroesse | null>(null);
    const [vorhaben, setVorhaben] = useState<FoerderVorhaben | null>(null);

    const complete = land !== null && team !== null && vorhaben !== null;
    const result = complete ? matchFoerderprogramme(land, team, vorhaben) : null;
    const matches = result?.programme ?? [];
    const maxSum = result?.maxSummeEur ?? 0;

    // Kontext in die URL — HubSpot speichert die Conversion-URL der Einsendung,
    // damit kommt der Lead qualifiziert (Region, Größe, Vorhaben) im CRM an
    const handleContactOpen = () => {
        if (!complete) return;
        const params = new URLSearchParams({
            fc_region: land,
            fc_team: team,
            fc_vorhaben: vorhaben,
            fc_programme: matches.map((p) => p.name).join(", "),
        });
        window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}#foerder-check`);
    };

    return (
        <section
            id="foerder-check"
            aria-label="Interaktiver Förder-Check"
            className="rounded-3xl border border-sapphire/30 bg-sapphire/10 backdrop-blur-md p-8 md:p-12 mb-16 scroll-mt-32"
        >
            <h2
                className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
            >
                Förder-Check: Finde dein Programm in 30 Sekunden
            </h2>
            <p className="text-gray-300 mb-8">
                Drei Angaben genügen — du siehst sofort, welche Programme für dein Vorhaben in Frage kommen.
            </p>

            <div className="space-y-6">
                <OptionRow label="Wo sitzt dein Unternehmen?" options={LAND_OPTIONS} selected={land} onSelect={setLand} />
                <OptionRow label="Wie viele Mitarbeitende habt ihr?" options={TEAM_OPTIONS} selected={team} onSelect={setTeam} />
                <OptionRow label="Was planst du?" options={VORHABEN_OPTIONS} selected={vorhaben} onSelect={setVorhaben} />
            </div>

            {complete && (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6" role="status">
                    {matches.length > 0 ? (
                        <>
                            <p className="text-white text-lg font-bold mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                                {maxSum > 0
                                    ? `${matches.length} ${matches.length === 1 ? "Programm kommt" : "Programme kommen"} in Frage — bis zu ${maxSum.toLocaleString("de-DE")} € Zuschuss möglich`
                                    : `${matches.length} ${matches.length === 1 ? "Programm kommt" : "Programme kommen"} für dich in Frage`}
                            </p>
                            <ul className="space-y-3 mb-6">
                                {matches.map((p) => (
                                    <li key={p.name} className="flex gap-3 text-sm">
                                        <svg className="w-5 h-5 text-sapphire shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-300">
                                            <strong className="text-white">{p.name}</strong> ({p.maxLabel}) — {p.hint}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xs text-gray-500 mb-6">
                                Erste Orientierung ohne Gewähr — die Förderberechtigung prüfen wir im Detail. Verbindlich ist der offizielle Programmtext.
                            </p>
                            <ContactButton
                                title="Kostenlosen Förder-Check anfordern"
                                ariaLabel="Kostenlosen Förder-Check anfordern"
                                onOpen={handleContactOpen}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sapphire text-white font-semibold hover:bg-sapphire-hover transition-all shadow-[0_0_30px_rgba(15,82,186,0.6)] hover:shadow-[0_0_40px_rgba(15,82,186,0.8)]"
                            >
                                Ergebnis prüfen lassen — kostenlos →
                            </ContactButton>
                        </>
                    ) : (
                        <>
                            <p className="text-white text-lg font-bold mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                                Kein Standard-Programm passt exakt — aber es gibt fast immer einen Weg
                            </p>
                            <p className="text-gray-300 text-sm mb-6">
                                Für deine Konstellation lohnt sich der Blick auf Sonderprogramme oder die Kombination mehrerer Bausteine. Das klären wir am schnellsten im kostenlosen Erstgespräch.
                            </p>
                            <ContactButton
                                title="Kostenlosen Förder-Check anfordern"
                                ariaLabel="Kostenlosen Förder-Check anfordern"
                                onOpen={handleContactOpen}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sapphire text-white font-semibold hover:bg-sapphire-hover transition-all shadow-[0_0_30px_rgba(15,82,186,0.6)]"
                            >
                                Individuell prüfen lassen →
                            </ContactButton>
                        </>
                    )}
                </div>
            )}
        </section>
    );
}
