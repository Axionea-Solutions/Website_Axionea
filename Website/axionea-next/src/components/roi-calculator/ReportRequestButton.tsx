"use client";

import { useState } from "react";
import Modal from "../hubspot/Modal";
import HubSpotForm from "../hubspot/HubSpotForm";
import { CalculatorResults } from "./roi-calculator.utils";

interface ReportRequestButtonProps {
    industryName: string;
    teamSize: number;
    results: CalculatorResults;
}

// Formatiert die Kontextwerte als URL-Parameter: HubSpot speichert die
// Conversion-URL jeder Einsendung — so kommt der Lead qualifiziert im CRM an,
// ohne dass das Formular selbst angepasst werden muss.
function buildRoiParams(industryName: string, teamSize: number, results: CalculatorResults): string {
    const params = new URLSearchParams({
        roi_branche: industryName,
        roi_team: String(teamSize),
        roi_potenzial: `${Math.round(results.savingsPotentialMin)}-${Math.round(results.savingsPotentialMax)}€/Monat`,
        roi_amortisation: results.paybackMonths > 0 ? `Monat ${results.paybackMonths}` : "n/a",
    });
    return params.toString();
}

export default function ReportRequestButton({ industryName, teamSize, results }: ReportRequestButtonProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        const query = buildRoiParams(industryName, teamSize, results);
        window.history.replaceState(null, "", `${window.location.pathname}?${query}#roi`);
        setOpen(true);
    };

    const handleClose = () => {
        window.history.replaceState(null, "", `${window.location.pathname}#roi`);
        setOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleOpen}
                aria-label="ROI-Ergebnis als Report per E-Mail anfordern"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-sapphire/30 text-sapphire font-semibold text-base transition-all duration-300 hover:bg-sapphire/5 hover:border-sapphire/50"
            >
                Ergebnis als Report per E-Mail
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            </button>

            <Modal open={open} onClose={handleClose} title="Deinen ROI-Report anfordern">
                <div className="mb-5 rounded-xl bg-tint-blue dark:bg-blue-900/10 border border-black/5 p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900 mb-1">Deine Berechnung</p>
                    <p>
                        {industryName} · {teamSize} Mitarbeitende · Einsparpotenzial ≈{" "}
                        {Math.round(results.savingsPotentialMin).toLocaleString("de-DE")}–
                        {Math.round(results.savingsPotentialMax).toLocaleString("de-DE")} €/Monat
                        {results.paybackMonths > 0 && <> · Amortisation ab Monat {results.paybackMonths}</>}
                    </p>
                    <p className="mt-2 text-slate-500">
                        Trag deine Kontaktdaten ein — du bekommst die ausführliche Auswertung inklusive
                        der Studienquellen für deine Branche per E-Mail.
                    </p>
                </div>
                <HubSpotForm />
            </Modal>
        </>
    );
}
