// Gemeinsame Förder-Check-Logik — genutzt vom interaktiven Check auf
// /foerderung UND vom Chatbot-Tool (api/chat). Eine Quelle, ein Ergebnis.
// Vereinfachte Matching-Regeln; verbindlich ist der offizielle Programmtext,
// ob gefördert wird, entscheidet die Förderstelle.
// Stand 13.11.2026, geprüft an den Seiten der Fördergeber. Ausgelaufen und
// entfernt: „digital jetzt“ (bis 31.12.2023), „go-digital“ (bis 31.12.2024),
// KMU.DIGITAL und aws Digitalisierung (Österreich).
// Bald veraltet: Österreich-Programme enden am 15.12. bzw. 31.12.2026,
// Mittelstand-Digital wechselt im Januar 2027 auf ein neues Netz,
// BAFA-Anträge ab 01.01.2027 nach neuen Regeln.

export type FoerderLand = "bayern" | "de" | "at" | "ch";
export type FoerderTeamgroesse = "1-2" | "3-99" | "100-249" | "250-499" | "500+";
export type FoerderVorhaben = "beratung" | "umsetzung" | "schulung" | "rollout";

export interface CheckProgram {
    name: string;
    maxLabel: string;
    /** Maximale Fördersumme in € für die "bis zu"-Headline (0 = Kredit/kostenlos/je nach Land) */
    maxEur: number;
    hint: string;
    match: (land: FoerderLand, team: FoerderTeamgroesse, vorhaben: FoerderVorhaben) => boolean;
}

export const CHECK_PROGRAMS: CheckProgram[] = [
    {
        name: "BAFA Beratungsförderung für KMU",
        maxLabel: "bis 2.800 €",
        maxEur: 2800,
        hint: "Je nach Region 50 % bis 1.750 € oder 80 % bis 2.800 € der Beratungskosten. Nicht antragsberechtigt sind Steuer- und Rechtsberatung, Wirtschaftsprüfung und Notare, bei Arzt- und Zahnarztpraxen fördert das BAFA nur Beratung zur Qualitätssicherung. Antrag vor dem Vertrag, Berater beim BAFA registriert",
        match: (land, team, vorhaben) =>
            (land === "de" || land === "bayern") &&
            ["1-2", "3-99", "100-249"].includes(team) &&
            vorhaben === "beratung",
    },
    {
        name: "Digitalbonus Bayern",
        maxLabel: "bis 30.000 €",
        maxEur: 30000,
        hint: "Standard bis 7.500 €, Plus bis 30.000 €, bis 50 %. Nur gewerbliche Unternehmen unter 50 Beschäftigten, freie Berufe und Arztpraxen sind ausgeschlossen. Antrag online bei der Bezirksregierung, bis 31.12.2027",
        match: (land, team, vorhaben) =>
            land === "bayern" &&
            (team === "1-2" || team === "3-99") &&
            vorhaben === "umsetzung",
    },
    {
        name: "KfW ERP-Förderkredit Digitalisierung",
        maxLabel: "Kredit mit Zuschuss",
        maxEur: 0,
        hint: "Kredit über die Hausbank, je nach Stufe mit 3 % oder 5 % Zuschuss, höchstens 200.000 €. 5 % gibt es unter anderem für KI mit eigenen Daten, Standardsoftware mit eingebauter KI zählt nicht. Auch für Freiberufler, Antrag vor Beginn",
        match: (land, _team, vorhaben) =>
            (land === "de" || land === "bayern") && (vorhaben === "rollout" || vorhaben === "umsetzung"),
    },
    {
        name: "Mittelstand-Digital Zentren",
        maxLabel: "kostenlos",
        maxEur: 0,
        hint: "Kostenlos und anbieterneutral, aber kein Geld für eigene Projekte. Das bisherige Netz endet Ende 2026, im Januar 2027 startet ein neues",
        match: (land, _team, vorhaben) =>
            (land === "de" || land === "bayern") && (vorhaben === "beratung" || vorhaben === "schulung"),
    },
    {
        name: "Regionale Programme in Österreich",
        maxLabel: "je nach Land",
        maxEur: 0,
        hint: "Wien: Förderung Digitalisierung (50 %, höchstens 50.000 €). Niederösterreich: digi4Wirtschaft (20 %, höchstens 25.000 €). Kärnten: Umsetzung.KI (30 %, höchstens 10.000 €). Jeweils bis 31.12.2026 und nur, solange Budget vorhanden ist",
        match: (land, _team, vorhaben) => land === "at" && vorhaben !== "schulung",
    },
    {
        name: "FFG Skills Schecks",
        maxLabel: "bis 5.000 € je Person",
        maxEur: 0,
        hint: "50 %, höchstens 5.000 € je Person für Weiterbildung, Einreichung bis 15.12.2026 oder bis die Mittel aufgebraucht sind",
        match: (land, _team, vorhaben) => land === "at" && vorhaben === "schulung",
    },
    {
        name: "Innosuisse Innovationsscheck",
        maxLabel: "bis 15.000 CHF",
        maxEur: 0,
        hint: "Für eine Vorstudie, nur mit Schweizer Forschungspartner, das Geld geht an den Partner. Einen Bundeszuschuss für die Einführung von KI gibt es nicht",
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
