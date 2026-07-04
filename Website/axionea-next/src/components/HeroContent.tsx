"use client";

import { motion } from 'framer-motion';
import { BookingButton } from './hubspot';

export default function HeroContent() {
    return (
        <div className="relative z-10 w-full min-h-[calc(100vh-8rem)] flex flex-col items-center px-6">

            {/* ─── Smooth Background Glow behind Text ─── */}
            {/* Kein overflow-hidden mehr → Glow fadet natürlich aus, keine harte Kante zur Navbar */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center md:justify-end">
                <div className="w-[900px] h-[700px] bg-sapphire/20 rounded-full blur-[180px] opacity-80 mix-blend-screen translate-y-[-4%] md:translate-x-[15%]"></div>
            </div>

            {/* ─── Main Content — linksbündig (Layout wie OG-Image) ─── */}
            <div className="flex-1 flex items-center w-full">
                <div className="relative z-10 flex flex-col items-start text-left w-full max-w-6xl mx-auto">

                    {/* Eyebrow-Badge */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[3px] uppercase text-[#4d94ff] mb-6 bg-sapphire/15 px-5 py-2.5 rounded-full border border-sapphire/30"
                    >
                        KI-Automatisierung · Sofort einsetzbar · DSGVO-konform
                    </motion.span>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-sans font-medium mb-6 leading-[1.05] pb-2"
                    >
                        <span
                            className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white"
                            style={{
                                textShadow: '0 0 16px rgba(125,211,252,0.75), 0 0 40px rgba(56,189,248,0.55), 0 0 90px rgba(15,82,186,0.55), 0 0 160px rgba(15,82,186,0.35)',
                            }}
                        >
                            KI, die dein Geschäft
                            <br />
                            voranbringt
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 leading-relaxed drop-shadow-md font-light tracking-wide"
                    >
                        Wir automatisieren, was dich täglich Zeit kostet — von der Terminbuchung bis zum Backoffice. Ohne eigene IT-Abteilung, ohne versteckte Kosten.
                    </motion.p>

                    {/* Main CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="pointer-events-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 w-full sm:w-auto"
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

                    {/* Trust Strip — Mobile: 2×2 Grid, Desktop: single pill, linksbündig */}
                    <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        aria-label="Vertrauenssignale"
                        className="list-none grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-8 text-xs sm:text-sm md:text-base font-medium text-gray-400/80 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.2)] w-full max-w-xs sm:max-w-none sm:w-auto"
                    >
                        {[
                            { label: "Standort Deutschland" },
                            { label: "DSGVO-konform", href: "#hosting" },
                            { label: "EU AI Act Ready", href: "#hosting" },
                            { label: "BAFA-förderfähig" },
                        ].map(({ label, href }) => (
                            <li key={label} className="flex items-center gap-2 justify-center sm:justify-start">
                                <svg className="w-4 h-4 text-sapphire shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                                {href ? (
                                    <a href={href} className="hover:text-gray-200 underline decoration-transparent hover:decoration-gray-400 underline-offset-4 transition-all">
                                        {label}
                                    </a>
                                ) : (
                                    <span>{label}</span>
                                )}
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </div>

            {/* Soft fade-out to next section — bridges Hero into IndustryTagsBand */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-[1]"
            />
        </div>
    );
}
