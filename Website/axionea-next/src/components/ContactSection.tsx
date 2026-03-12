"use client";

import { useState, useRef, useEffect } from "react";
import { LetterReveal } from "./ui/LetterReveal";

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsInView(true); obs.disconnect(); } }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, isInView };
}

const contactInfo = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
        label: "Mail",
        value: "info@axionea-solutions.de",
        href: "mailto:info@axionea-solutions.de",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        ),
        label: "Telefon (Nico)",
        value: "+49 173 1726939",
        href: "tel:+491731726939",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        ),
        label: "Telefon (Maxi)",
        value: "+49 176 44428884",
        href: "tel:+4917644428884",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
        ),
        label: "Standort",
        value: "Deutschland",
        href: null,
    },
];

export default function ContactSection() {
    const { ref, isInView } = useInView(0.1);
    const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: "", company: "", email: "", message: "" });
            setTimeout(() => setSubmitted(false), 4000);
        }, 1500);
    };

    return (
        <section id="kontakt" className="py-16 md:py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10 md:mb-14">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        KONTAKT
                    </span>
                    <h2
                        className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight leading-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        <LetterReveal text="Kontakt" />
                    </h2>
                </div>

                <div
                    ref={ref}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                    style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "translateY(0)" : "translateY(20px)",
                        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    {/* Left: Contact Info Cards */}
                    <div className="flex flex-col gap-4">
                        {contactInfo.map((info, i) => (
                            <div
                                key={i}
                                className="group rounded-2xl border border-gray-200 bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] p-6 transition-all duration-300 hover:border-sapphire/30"
                            >
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-center text-slate-600 mb-3 group-hover:text-sapphire transition-colors duration-300">
                                    {info.icon}
                                </div>
                                <p className="text-sm font-bold text-sapphire mb-1">{info.label}</p>
                                {info.href ? (
                                    <a href={info.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                        {info.value}
                                    </a>
                                ) : (
                                    <p className="text-sm text-slate-600">{info.value}</p>
                                )}
                            </div>
                        ))}

                        {/* Book a Call */}
                        <a
                            href="#"
                            className="group rounded-2xl border border-sapphire/20 bg-sapphire/5 p-6 flex items-center gap-4 transition-all duration-300 hover:bg-sapphire/10 hover:border-sapphire/30 cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-xl bg-sapphire/15 border border-sapphire/20 flex items-center justify-center text-sapphire shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-sapphire">Book a Call</p>
                                <p className="text-xs text-slate-500">Kostenloses 15-Min Erstgespräch buchen</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-sapphire ml-auto group-hover:translate-x-1 transition-transform">
                                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Max Mustermann"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-sapphire/40 focus:ring-1 focus:ring-sapphire/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">Firma</label>
                                <input
                                    type="text"
                                    placeholder="Muster GmbH"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-sapphire/40 focus:ring-1 focus:ring-sapphire/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">E-Mail</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="max@firma.de"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-sapphire/40 focus:ring-1 focus:ring-sapphire/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">Nachricht</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Wie kann Axionea dir helfen?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-sapphire/40 focus:ring-1 focus:ring-sapphire/20 transition-all resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-sapphire text-white font-semibold text-sm transition-all duration-300 hover:bg-sapphire-hover hover:shadow-[0_8px_32px_rgba(15,82,186,0.3)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : submitted ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Nachricht gesendet!
                                    </>
                                ) : (
                                    <>
                                        Nachricht senden
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
