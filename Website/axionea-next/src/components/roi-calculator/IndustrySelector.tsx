"use client";

import { ROI_INDUSTRIES } from "./roi-calculator.utils";
import { ChevronDown } from "lucide-react";

interface IndustrySelectorProps {
    selectedId: string | null;
    onChange: (id: string) => void;
}

export function IndustrySelector({ selectedId, onChange }: IndustrySelectorProps) {
    return (
        <div className="w-full relative">
            <label className="block text-sm font-medium text-slate-900 mb-3 text-left">
                In welcher Branche bist du tätig?
            </label>
            <div className="relative">
                <select
                    value={selectedId || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none bg-black/[0.02] border border-slate-200 text-slate-900 text-sm sm:text-base rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-sapphire focus:border-transparent transition-all cursor-pointer"
                >
                    <option value="" disabled className="text-slate-500 bg-white">
                        -- Bitte wählen --
                    </option>
                    {Object.values(ROI_INDUSTRIES).map((industry) => (
                        <option key={industry.id} value={industry.id} className="bg-white text-slate-900">
                            {industry.name_de}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <ChevronDown className="w-5 h-5 text-sapphire" />
                </div>
            </div>
        </div>
    );
}
