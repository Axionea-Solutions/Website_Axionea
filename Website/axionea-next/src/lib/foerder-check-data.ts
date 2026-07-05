// Gemeinsame Förder-Check-Logik — genutzt vom interaktiven Check auf
// /foerderung UND vom Chatbot-Tool (api/chat). Eine Quelle, ein Ergebnis.
// Vereinfachte Matching-Regeln; verbindlich ist der offizielle Programmtext.

export type FoerderLand = "bayern" | "de" | "at" | "ch";
export type FoerderTeamgroesse = "1-2" | "3-99" | "100-249" | "250-499" | "500+";
export type FoerderVorhaben = "beratung" | "umsetzung" | "schulung" | "rollout";

export interface CheckProgram {
    name: string;
    maxLabel: string;
    /** Maximale Fördersumme in € für die "bis zu"-Headline (0 = Kredit/kostenlos) */
    maxEur: number;
    hint: string;
    match: (land: FoerderLand, team: FoerderTeamgroesse, vorhaben: FoerderVorhaben) => boolean;
}

export const CHECK_PROGRAMS: CheckProgram[] = [
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

export interface FoerderCheckResult {
    programme: { name: string; maxLabel: string; hint: string }[];
    maxSummeEur: number;
}

export function matchFoerderprogramme(
    land: FoerderLand,
    team: FoerderTeamgroesse,
    vorhaben: FoerderVorhaben
): FoerderCheckResult {
    const matches = CHECK_PROGRAMS.filter((p) => p.match(land, team, vorhaben));
    return {
        programme: matches.map(({ name, maxLabel, hint }) => ({ name, maxLabel, hint })),
        maxSummeEur: matches.reduce((acc, p) => Math.max(acc, p.maxEur), 0),
    };
}
