"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Shared IntersectionObserver hook — fires once when the element enters the viewport.
 * Used across all animated sections (WhyChooseUs, ServicesGrid, ProcessSteps, FAQ, etc.).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setIsInView(true); obs.unobserve(el); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, isInView };
}
