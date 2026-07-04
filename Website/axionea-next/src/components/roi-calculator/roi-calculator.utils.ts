import roiDataRaw from '@/data/roi-factors.json';

// --- Type Definitions ---
export interface ROIPrimarySource {
    name: string;
    date: string;
    url: string;
    key_finding: string;
}

export interface ROIIndustryFactor {
    id: string;
    name_de: string;
    name_en: string;
    automation_min: number;
    automation_max: number;
    confidence: "high" | "medium" | "low";
    icon: string;
    color_accent: string;
    primary_source: ROIPrimarySource;
    additional_facts: string[];
}

export interface ROIDataSchema {
    meta: Record<string, unknown>;
    constants: {
        weeks_per_month: number;
        realization_rate_without_help: number;
        realization_rate_without_help_source: string;
        realization_rate_with_axionea: number;
        realization_rate_with_axionea_source: string;
        revenue_realization_without_help: number;
        revenue_realization_source: string;
        check_investment_eur: number;
        pilot_investment_min_eur: number;
        pilot_investment_max_eur: number;
        investment_scale_factor: number;
        investment_note: string;
    };
    industries: Record<string, ROIIndustryFactor>;
    global_facts: Record<string, unknown>;
    sources_registry: Record<string, unknown>[];
}

// Strongly typed cast of the imported JSON
export const roiData = roiDataRaw as ROIDataSchema;
export const ROI_CONSTANTS = roiData.constants;
export const ROI_INDUSTRIES = roiData.industries;

export interface CalculatorInput {
    industryId: string | null;
    teamSize: number;
    hourlyCost: number;
    weeklyHours: number;
}

export interface CalculatorResults {
    monthlyRepetitiveCost: number;
    savingsPotentialMin: number;
    savingsPotentialMax: number;
    savingsPotentialMid: number;
    realizationWithout: number;
    realizationWith: number;
    annualLossMin: number;
    annualLossMax: number;
    monthlyNetGain: number;
    paybackMonths: number;
    industryFactor: ROIIndustryFactor | null;
}

/**
 * Calculates the ROI metrics based on user unputs and the JSON data factors.
 */
export function calculateROI(input: CalculatorInput): CalculatorResults {
    const defaults: CalculatorResults = {
        monthlyRepetitiveCost: 0,
        savingsPotentialMin: 0,
        savingsPotentialMax: 0,
        savingsPotentialMid: 0,
        realizationWithout: 0,
        realizationWith: 0,
        annualLossMin: 0,
        annualLossMax: 0,
        monthlyNetGain: 0,
        paybackMonths: 0,
        industryFactor: null,
    };

    if (!input.industryId || !ROI_INDUSTRIES[input.industryId]) {
        return defaults;
    }

    const factor = ROI_INDUSTRIES[input.industryId];

    // 1. Monthly cost of repetitive work
    // Default calculation assumes 4.33 weeks per month
    const monthlyRepetitiveCost = input.teamSize * input.weeklyHours * ROI_CONSTANTS.weeks_per_month * input.hourlyCost;

    if (monthlyRepetitiveCost === 0) return { ...defaults, industryFactor: factor };

    // 2. Savings Potential (min, max, mid)
    const savingsPotentialMin = monthlyRepetitiveCost * factor.automation_min;
    const savingsPotentialMax = monthlyRepetitiveCost * factor.automation_max;
    const savingsPotentialMid = (savingsPotentialMin + savingsPotentialMax) / 2;

    // 3. Realization WITHOUT help (McKinsey benchmark 25%)
    const realizationWithout = savingsPotentialMid * ROI_CONSTANTS.realization_rate_without_help;

    // 4. Realization WITH Axionea (70%)
    const realizationWith = savingsPotentialMid * ROI_CONSTANTS.realization_rate_with_axionea;

    // 5. Annual Loss (by doing nothing)
    const annualLossMin = savingsPotentialMin * 12;
    const annualLossMax = savingsPotentialMax * 12;

    // 6. Amortization / Payback
    // Investment = Check + Pilot; Pilotumfang skaliert mit der Einsparung,
    // geklemmt auf die reale Projektspanne (Beträge nur intern, nie im UI)
    const pilotInvestment = Math.min(
        Math.max(realizationWith * ROI_CONSTANTS.investment_scale_factor, ROI_CONSTANTS.pilot_investment_min_eur),
        ROI_CONSTANTS.pilot_investment_max_eur
    );
    const axioneaInvestment = ROI_CONSTANTS.check_investment_eur + pilotInvestment;
    const monthlyNetGain = realizationWith - realizationWithout;

    // Guard against divide by zero (should not happen if inputs > 0)
    const paybackMonths = monthlyNetGain > 0 ? Math.min(360, Math.ceil(axioneaInvestment / monthlyNetGain)) : 0;

    return {
        monthlyRepetitiveCost,
        savingsPotentialMin,
        savingsPotentialMax,
        savingsPotentialMid,
        realizationWithout,
        realizationWith,
        annualLossMin,
        annualLossMax,
        monthlyNetGain,
        paybackMonths,
        industryFactor: factor,
    };
}
