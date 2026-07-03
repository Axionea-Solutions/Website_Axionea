"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/consent";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Read local storage only after mount to prevent hydration errors
        const timer = setTimeout(() => {
            if (!getConsent()) {
                setIsVisible(true);
            }
        }, 1500); // Slight delay for better UX (doesn't block initial render)

        return () => clearTimeout(timer);
    }, []);

    const acceptAll = () => {
        setConsent("all");
        setIsVisible(false);
    };

    const acceptEssential = () => {
        setConsent("essential");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[75] md:max-w-sm"
                >
                    <div className="p-5 md:p-6 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-black/10 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-sapphire/10 flex items-center justify-center shrink-0 border border-sapphire/20">
                                <span className="text-lg">🍪</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                                    Deine Privatsphäre
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Wir nutzen Cookies zur Verbesserung der Website und für Analysen.
                                    <br />
                                    <Link href="/datenschutz" className="text-sapphire hover:underline font-medium">Mehr zum Datenschutz</Link>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
                            <button
                                onClick={acceptAll}
                                className="flex-1 px-4 py-2.5 bg-sapphire text-white text-sm font-semibold rounded-xl hover:bg-sapphire-hover transition-all duration-300"
                            >
                                Alle akzeptieren
                            </button>
                            <button
                                onClick={acceptEssential}
                                className="flex-1 px-4 py-2.5 bg-black/5 dark:bg-white/5 text-foreground text-sm font-semibold rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 border border-black/5 dark:border-white/5"
                            >
                                Essenzielle
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
