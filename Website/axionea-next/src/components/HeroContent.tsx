"use client";

import { motion } from 'framer-motion';
import { BookingButton } from './hubspot';

export default function HeroContent() {
    return (
        <div className="relative z-10 w-full min-h-[calc(100vh-8rem)] flex flex-col items-center px-6">

            {/* ─── Smooth Background Glow behind Text ─── */}
            {/* Kein overflow-hidden mehr → Glow fadet natürlich aus, keine harte Kante zur Navbar */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                <div className="w-[900px] h-[700px] bg-sapphire/20 rounded-full blur-[180px] opacity-80 mix-blend-screen translate-y-[-4%]"></div>
            </div>

            {/* ─── Main Content ─── */}
            {/* ─── Centered Content ─── */}
            <div className="flex-1 flex items-center justify-center w-full">
                <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        aria-label="DSGVO-konform und sofort einsetzbar — KI, die dein Geschäft voranbringt"
                        className="font-sans font-medium mb-6 leading-[1.1] md:leading-[1.2] pb-4"
                    >
                        <span
                            className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-normal text-white/95 mb-2 pb-2"
                            style={{
                                textShadow: '0 0 12px rgba(125,211,252,0.65), 0 0 28px rgba(56,189,248,0.45), 0 0 60px rgba(15,82,186,0.35)',
                            }}
                        >
                            DSGVO-konform &amp; sofort einsetzbar
                        </span>
                        <span
                            className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white pb-6"
                            style={{
                                textShadow: '0 0 16px rgba(125,211,252,0.75), 0 0 40px rgba(56,189,248,0.55), 0 0 90px rgba(15,82,186,0.55), 0 0 160px rgba(15,82,186,0.35)',
                            }}
                        >
                            KI, die dein Geschäft voranbringt
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mb-10 leading-relaxed drop-shadow-md font-light tracking-wide"
                    >
                        Wir automatisieren, was dich täglich Zeit kostet — von der Terminbuchung bis zum Backoffice. Ohne eigene IT-Abteilung, ohne versteckte Kosten.
                    </motion.p>

                    {/* Main CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4 mb-10"
                    >
                        {/* Primary CTA — öffnet HubSpot Meetings im Modal */}
                        <BookingButton
                            ariaLabel="Kostenloses Erstgespräch buchen"
                            className="px-8 py-4 rounded-full bg-sapphire text-white font-semibold text-lg hover:bg-sapphire-hover transition-all shadow-[0_0_30px_rgba(15,82,186,0.6)] hover:shadow-[0_0_40px_rgba(15,82,186,0.8)] text-center inline-block cursor-pointer"
                        >
                            Kostenloses Erstgespräch buchen →
                        </BookingButton>
                        {/* Secondary CTA — visuell zurückgenommen */}
                        <a
                            href="#roi"
                            aria-label="ROI-Rechner öffnen"
                            className="px-8 py-4 rounded-full bg-transparent border border-white/25 text-white/90 font-medium text-base hover:bg-white/5 hover:border-white/40 transition-all text-center inline-block"
                        >
                            ROI berechnen
                        </a>
                    </motion.div>

                    {/* Trust Strip — Mobile: 2×2 Grid, Desktop: single pill */}
                    <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        aria-label="Vertrauenssignale"
                        className="list-none grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-8 text-xs sm:text-sm md:text-base font-medium text-gray-400/80 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.2)] w-full max-w-xs sm:max-w-none sm:w-auto"
                    >
                        {[
                            "Standort Deutschland",
                            "DSGVO-konform",
                            "EU AI Act Ready",
                            "BAFA-förderfähig",
                        ].map((label) => (
                            <li key={label} className="flex items-center gap-2 justify-center sm:justify-start">
                                <svg className="w-4 h-4 text-sapphire shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{label}</span>
                            </li>
                        ))}
                    </motion.ul>
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

            {/* Soft fade-out to next section — bridges Hero into IndustryTagsBand */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-[1]"
            />
        </div>
    );
}
