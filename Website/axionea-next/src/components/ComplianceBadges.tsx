"use client";

import React from 'react';
import { Shield, Lock, CheckCircle } from 'lucide-react';

export default function ComplianceBadges() {
  const badges = [
    {
      title: "100% DSGVO Konform",
      description: "Hosting & Datenverarbeitung in Europa nach strengsten Standards.",
      icon: <Lock className="w-6 h-6 text-sapphire" />,
    },
    {
      title: "EU AI Act Ready",
      description: "Transparente KI-Modelle gemäß den neuesten EU-Richtlinien.",
      icon: <Shield className="w-6 h-6 text-sapphire" />,
    },
    {
      title: "Höchste Datensicherheit",
      description: "Höchste Datensicherheit für sensible Geschäftsdaten.",
      icon: <CheckCircle className="w-6 h-6 text-sapphire" />,
    }
  ];

  return (
    <section className="relative py-16 px-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-sapphire/5 blur-[120px] rounded-[100%] pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-[clamp(28px,6vw,52px)] font-bold tracking-tight leading-tight mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                    Sicherheit & Compliance
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    Sicherheit und Datenschutz stehen bei uns an erster Stelle. Unsere KI-Lösungen erfüllen die höchsten Standards für den europäischen Markt.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {badges.map((badge, idx) => (
                    <div 
                        key={idx}
                        className="group relative flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_2px_24px_-4px_rgba(0,0,0,0.3)] hover:border-sapphire/30 hover:shadow-[0_20px_60px_-15px_rgba(15,82,186,0.2)] transition-all duration-300"
                    >
                        <div className="mb-4 p-4 rounded-full bg-sapphire/10 border border-sapphire/20 group-hover:shadow-[0_0_20px_rgba(15,82,186,0.3)] transition-all duration-300">
                            {badge.icon}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                            {badge.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {badge.description}
                        </p>
                        
                        {/* Hover Gradient line at bottom */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-sapphire to-transparent group-hover:w-full transition-all duration-500" />
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
