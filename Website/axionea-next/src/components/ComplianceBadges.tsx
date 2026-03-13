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
      title: "Enterprise-Grade Security",
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
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                    Trust & Compliance
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    Sicherheit und Datenschutz stehen bei uns an erster Stelle. Unsere KI-Lösungen erfüllen die höchsten Standards für den europäischen Markt.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {badges.map((badge, idx) => (
                    <div 
                        key={idx}
                        className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm border border-black/5 hover:border-sapphire/30 hover:shadow-md transition-all duration-300"
                    >
                        <div className="mb-4 p-4 rounded-full bg-sapphire/10 border border-sapphire/20 group-hover:scale-110 transition-transform duration-300">
                            {badge.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                            {badge.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
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
