import { useEffect, useRef } from "react";
import { useInView, motion, animate } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export function AnimatedCounter({
    value,
    duration = 1,
    className = "",
    prefix = "",
    suffix = "",
    decimals = 0,
}: AnimatedCounterProps) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView || !nodeRef.current) return;

        const controls = animate(0, value, {
            duration,
            ease: "easeOut",
            onUpdate(cur) {
                if (nodeRef.current) {
                    nodeRef.current.textContent = `${prefix}${cur.toLocaleString("de-DE", {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals,
                    })}${suffix}`;
                }
            },
        });

        return controls.stop;
    }, [value, duration, isInView, prefix, suffix, decimals]);

    return <motion.span ref={nodeRef} className={className} />;
}
