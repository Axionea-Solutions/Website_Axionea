"use client";

import { useState } from "react";
import ContactButton from "../hubspot/ContactButton";

type Land = "bayern" | "de" | "at" | "ch";
type Teamgroesse = "1-2" | "3-99" | "100-249" | "250-499" | "500+";
type Vorhaben = "beratung" | "umsetzung" | "schulung" | "rollout";

interface CheckProgram {
    name: string;
    maxLabel: string;
    /** Maximale Fördersumme in € für die "bis zu"-Headline (0 = Kredit/kostenlos) */
    maxEur: number;
    hint: string;
    match: (land: Land, team: Teamgroesse, vorhaben: Vorhaben) => boolean;
}

// Vereinfachte Matching-Regeln — Detailbedingungen stehen in den Programmkarten
// darunter; verbindlich ist immer der offizielle Programmtext (siehe Disclaimer).
const CHECK_PROGRAMS: CheckProgram[] = [
    {
        name: "digital jetzt",
        maxLabel: "bis 50.000 €",
        maxEur: 50000,
        hint: "Investitionen in KI-Software inkl. Mitarbeiter-Qualifizierung, 30–50 % Zuschuss",
        match: (land, team, vorhaben) =>
            (land === "de" || land === "bayern") &&
            ["3-99", "100-249", "250-499"].includes(team) &&
            (vorhaben === "umsetzung" || vorhaben === "schulung"),
    },
    {
        name: "BAFA go-digital",
        maxLabel: "bis 16.500 €",
        maxEur: 16500,
        hint: "50 % Zuschuss auf Beratung & Umsetzung — wir sind autorisierter Berater",
        match: (land, team, vorhaben) =>
            (land === "de" || land === "bayern") &&
            (team === "1-2" || team === "3-99") &&
            vorhaben !== "rollout",
    },
    {
        name: "BAFA Beratungsförderung für KMU",
        maxLabel: "bis 3.500 €",
        maxEur: 3500,
        hint: "50–80 % der Beratungskosten für KI-Strategie und -Audit",
        match: (land, team, vorhaben) =>
            (land === "de" || land === "bayern") &&
            ["1-2", "3-99", "100-249"].includes(team) &&
            vorhaben === "beratung",
    },
    {
        name: "Bayern Digitalbonus",
        maxLabel: "bis 50.000 €",
        maxEur: 50000,
        hint: "Bayern-spezifisch, kombinierbar mit Bundesprogrammen",
        match: (land, team, vorhaben) =>
            land === "bayern" &&
            (team === "3-99" || team === "100-249") &&
            vorhaben === "umsetzung",
    },
    {
        name: "KfW-Digitalisierungskredit",
        maxLabel: "bis 25 Mio. €",
        maxEur: 0,
        hint: "Zinsverbilligte Finanzierung für größere Roll-outs",
        match: (land, _team, vorhaben) =>
            (land === "de" || land === "bayern") && vorhaben === "rollout",
    },
    {
        name: "Mittelstand-Digital Zentren",
        maxLabel: "kostenlos",
        maxEur: 0,
        hint: "Kostenlose Erstberatung und Workshops in der Strategie-Phase",
        match: (land, _team, vorhaben) =>
            (land === "de" || land === "bayern") && vorhaben === "beratung",
    },
    {
        name: "aws Digitalisierung",
        maxLabel: "bis 50.000 €",
        maxEur: 50000,
        hint: "50–70 % Förderung für österreichische KMU",
        match: (land) => land === "at",
    },
    {
        name: "Innosuisse Innovationsschecks",
        maxLabel: "bis 15.000 CHF",
        maxEur: 15000,
        hint: "Für KI-Machbarkeitsstudien mit Forschungspartner",
        match: (land) => land === "ch",
    },
];

const LAND_OPTIONS: { value: Land; label: string }[] = [
    { value: "bayern", label: "Bayern" },
    { value: "de", label: "Anderes Bundesland" },
    { value: "at", label: "Österreich" },
    { value: "ch", label: "Schweiz" },
];

const TEAM_OPTIONS: { value: Teamgroesse; label: string }[] = [
    { value: "1-2", label: "1–2" },
    { value: "3-99", label: "3–99" },
    { value: "100-249", label: "100–249" },
    { value: "250-499", label: "250–499" },
    { value: "500+", label: "500+" },
];

const VORHABEN_OPTIONS: { value: Vorhaben; label: string }[] = [
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
    const [land, setLand] = useState<Land | null>(null);
    const [team, setTeam] = useState<Teamgroesse | null>(null);
    const [vorhaben, setVorhaben] = useState<Vorhaben | null>(null);

    const complete = land !== null && team !== null && vorhaben !== null;
    const matches = complete
        ? CHECK_PROGRAMS.filter((p) => p.match(land, team, vorhaben))
        : [];
    const maxSum = matches.reduce((acc, p) => Math.max(acc, p.maxEur), 0);

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
