"use client";

interface InputSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onChange: (value: number) => void;
}

export function InputSlider({
    label,
    value,
    min,
    max,
    step = 1,
    unit = "",
    onChange,
}: InputSliderProps) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-900 max-w-[80%] text-left leading-tight">
                    {label}
                </label>
                <span className="text-sm font-bold text-sapphire tabular-nums bg-sapphire/10 px-3 py-1 rounded-full border border-sapphire/20">
                    {value}{unit}
                </span>
            </div>
            <div className="relative pt-1">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="roi-slider w-full"
                />
            </div>
        </div>
    );
}
