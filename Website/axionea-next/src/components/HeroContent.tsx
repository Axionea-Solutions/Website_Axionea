"use client";

import { motion } from 'framer-motion';

export default function HeroContent() {
    return (
        <div className="relative z-10 w-full min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center px-6">

            {/* ─── Smooth Background Glow behind Text ─── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <div className="w-[800px] h-[600px] bg-sapphire/20 rounded-full blur-[150px] opacity-80 mix-blend-screen translate-y-[-10%]"></div>
            </div>

            {/* ─── Main Content ─── */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mt-[-4rem] pointer-events-none">

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="font-sans font-medium mb-6 leading-[1.05]"
                >
                    <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-normal text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300 drop-shadow-sm mb-2">
                        Dein Unternehmen
                    </span>
                    <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-sapphire via-blue-400 to-sky-200 drop-shadow-sm">
                        Automatisiert
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mb-12 leading-relaxed drop-shadow-md font-light tracking-wide"
                >
                    KI-Automatisierung für den Mittelstand — ohne IT-Abteilung, ohne Technik-Kenntnisse, ohne versteckte Kosten
                </motion.p>

                {/* Main CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="pointer-events-auto"
                >
                    <a href="#roi" className="px-8 py-4 rounded-full bg-sapphire text-white font-semibold text-lg hover:bg-sapphire-hover transition-all hover:scale-[1.03] shadow-[0_0_30px_rgba(15,82,186,0.6)] text-center inline-block">
                        Jetzt Potenzialanalyse starten
                    </a>
                </motion.div>
            </div>

            {/* Bottom elements: Mehr erfahren & Blinking Scroll Arrow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 pointer-events-auto"
            >
                <a href="#warum" className="px-6 py-2.5 rounded-full bg-white/5 text-gray-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-all border border-white/10 text-center backdrop-blur-md">
                    Mehr erfahren
                </a>

                <a href="#warum" className="block animate-[pulse-arrow_2.5s_ease-in-out_infinite] mt-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 40"
                        fill="none"
                        stroke="#0F52BA"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-[80px] h-auto opacity-70 hover:stroke-sapphire-hover transition-colors"
                    >
                        <path d="M5 5 L 50 25 L 95 5" />
                    </svg>
                </a>
            </motion.div>
        </div>
    );
}
