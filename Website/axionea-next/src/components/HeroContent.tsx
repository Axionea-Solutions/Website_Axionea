"use client";

import { motion } from 'framer-motion';

export default function HeroContent() {
    return (
        <div className="relative z-10 w-full min-h-[calc(100vh-4rem)] flex flex-col items-center px-6">

            {/* ─── Smooth Background Glow behind Text ─── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <div className="w-[800px] h-[600px] bg-sapphire/20 rounded-full blur-[150px] opacity-80 mix-blend-screen translate-y-[-10%]"></div>
            </div>

            {/* ─── Main Content ─── */}
            {/* ─── Centered Content ─── */}
            <div className="flex-1 flex items-center justify-center w-full">
                <div className="relative z-10 flex flex-col items-center text-center max-w-5xl pointer-events-none">

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-sans font-medium mb-6 leading-[1.1] md:leading-[1.2] pb-4"
                    >
                        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-normal text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300 drop-shadow-sm mb-2 pb-2">
                            Dein Unternehmen
                        </span>
                        <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-sapphire via-blue-400 to-sky-200 drop-shadow-sm pb-8">
                            KI-gesteuert
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mb-12 leading-relaxed drop-shadow-md font-light tracking-wide"
                    >
                        Maßgeschneiderte KI-Lösungen für Arztpraxen, Kieferorthopäden & Immobilienmakler — DSGVO-konform, praxiserprobt, sofort einsetzbar.
                    </motion.p>

                    {/* Main CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4 mb-10"
                    >
                        <button
                            onClick={() => {
                                // @ts-ignore
                                if (window.Calendly) {
                                    // @ts-ignore
                                    window.Calendly.initPopupWidget({ url: '[CALENDLY-LINK EINFÜGEN]' });
                                }
                            }}
                            className="px-8 py-4 rounded-full bg-sapphire text-white font-semibold text-lg hover:bg-sapphire-hover transition-all shadow-[0_0_30px_rgba(15,82,186,0.6)] hover:shadow-[0_0_40px_rgba(15,82,186,0.8)] text-center inline-block cursor-pointer"
                        >
                            Kostenloses Erstgespräch buchen →
                        </button>
                        <a href="#roi" className="px-8 py-4 rounded-full bg-white/10 border-2 border-white/20 text-white font-semibold text-lg hover:bg-white hover:text-sapphire hover:border-white transition-all text-center inline-block">
                            Jetzt Potenzialanalyse starten
                        </a>
                    </motion.div>

                    {/* Trust Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm md:text-base font-medium text-gray-400/80 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                    >
                        <span className="flex items-center gap-2"><svg className="w-4 h-4 text-sapphire" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Standort Deutschland</span>
                        <span className="flex items-center gap-2"><svg className="w-4 h-4 text-sapphire" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> DSGVO-konform</span>
                        <span className="flex items-center gap-2"><svg className="w-4 h-4 text-sapphire" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> EU AI Act Ready</span>
                        <span className="flex items-center gap-2"><svg className="w-4 h-4 text-sapphire" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Gegründet 2025</span>
                    </motion.div>
                </div>
            </div>

            {/* Bottom: Mehr erfahren + Scroll Arrow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="pb-6 z-20 flex flex-col items-center gap-1 pointer-events-auto"
            >
                <a href="#warum" className="text-gray-500 text-xs font-medium tracking-widest uppercase hover:text-gray-300 transition-colors">
                    Mehr erfahren
                </a>
                <a href="#warum" className="block animate-[pulse-arrow_2.5s_ease-in-out_infinite]">
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
