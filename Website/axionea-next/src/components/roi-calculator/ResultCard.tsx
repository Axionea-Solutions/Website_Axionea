"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

interface ResultCardProps {
    title: string;
    valueMin: number;
    valueMax?: number;
    label: string;
    progressPercent: number;
    colorClass: string;
    bgClass: string;
    delay?: number;
}

export function ResultCard({
    title,
    valueMin,
    valueMax,
    label,
    progressPercent,
    colorClass,
    bgClass,
    delay = 0,
}: ResultCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={`rounded-2xl p-6 border border-black/5 dark:border-white/5 flex flex-col justify-between h-full ${bgClass}`}
        >
            <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    {title}
                </h4>
                <div className="mb-2">
                    {valueMax && valueMax > valueMin ? (
                        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-[clamp(1.25rem,2vw,1.75rem)] font-sans font-medium tracking-tight text-foreground">
                            <AnimatedCounter value={valueMin} />
                            <span className="text-xl mx-0.5 font-normal text-muted-foreground">–</span>
                            <AnimatedCounter value={valueMax} />
                            <span className="text-xl ml-0.5 text-muted-foreground">€</span>
                        </div>
                    ) : (
                        <div className="flex items-baseline gap-1 text-[clamp(1.75rem,3vw,2.25rem)] font-sans font-medium tracking-tight text-foreground">
                            <AnimatedCounter value={valueMin} />
                            <span className="text-2xl ml-1 text-muted-foreground">€</span>
                        </div>
                    )}
                </div>
                <div className="text-sm text-foreground/70 font-medium">
                    {label}
                </div>
            </div>

            <div className="mt-8 w-full bg-black/5 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, progressPercent)}%` }}
                    transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
                    className={`h-full rounded-full ${colorClass}`}
                />
            </div>
        </motion.div>
    );
}
