"use client";

/* ============================================================
   KFO Praxis-Grafiken — animierte Service-Illustrationen.
   Portiert aus den gelieferten Karten, Akzent auf Sapphire
   umgefärbt, ohne Kundennamen. Keyframes liegen in globals.css.
   Inline-Styles bewusst beibehalten (originalgetreuer Port
   komplexer SVG/CSS-Animationen, wie im bestehenden ServicesGrid).
   ============================================================ */

import type { CSSProperties, ReactNode } from "react";

const C = {
    blue: "#0F52BA",
    blueD: "#0B3D8A",
    blueL: "#E1ECF9",
    blueLL: "#F0F6FC",
    cyan: "#1A6AE8",
    navy: "#0A1628",
    navy2: "#1A2A4A",
    slate: "#475569",
    slateM: "#64748B",
    slateL: "#94A3B8",
    border: "#EEF2F7",
    borderM: "#E2E8F0",
    green: "#10B981",
    graphicBg: "#FBFCFE",
};

const FONT = '"Inter", Calibri, "Segoe UI", "Helvetica Neue", Arial, sans-serif';

/* ── Stage: positionierter Rahmen, in dem jede Grafik lebt ── */
function Stage({ children }: { children: ReactNode }) {
    return (
        <div
            className="relative w-full h-64 flex items-center justify-center overflow-hidden"
            style={{ background: C.graphicBg }}
        >
            {children}
        </div>
    );
}

/* ── Icon-Primitive ── */
const Stroke: CSSProperties = {
    stroke: C.blue,
    strokeWidth: 2,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

function IconBox({ size = 68, children, ring }: { size?: number; children: ReactNode; ring?: boolean }) {
    return (
        <div
            style={{
                width: size,
                height: size,
                background: "#fff",
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.blue,
                position: "relative",
                zIndex: 2,
                boxShadow: ring ? `0 0 0 6px ${C.blueLL}` : "none",
            }}
        >
            {children}
        </div>
    );
}

function IconWave() {
    return (
        <svg width="34" height="34" viewBox="0 0 24 24" style={Stroke}>
            <path d="M3 12h2.5L8 6l3 12 3-9 2.5 6H21" />
        </svg>
    );
}
function IconDiamond() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" style={Stroke}>
            <path d="M12 3l9 9-9 9-9-9 9-9z" />
        </svg>
    );
}
function IconSparkle({ size = 14, color = C.cyan }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" style={{ fill: color }}>
            <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
        </svg>
    );
}
function IconCheck() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" style={{ ...Stroke, stroke: "#fff", strokeWidth: 3 }}>
            <polyline points="5 12 10 17 19 7" />
        </svg>
    );
}
function IconEuro() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" style={Stroke}>
            <path d="M18 7a7 7 0 100 10M4 10h10M4 14h10" />
        </svg>
    );
}
function IconCalendar() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" style={Stroke}>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="8" y1="3" x2="8" y2="7" />
            <line x1="16" y1="3" x2="16" y2="7" />
        </svg>
    );
}

/* ============================================================
   1) CALL AGENT — Waveform + pulsierende Ringe
   ============================================================ */
function GraphicCall() {
    return (
        <Stage>
            <div style={{ position: "relative", width: 220, height: 220 }}>
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            inset: -i * 30 + 40,
                            border: `1.5px dashed ${C.blue}`,
                            borderRadius: "50%",
                            opacity: 0.35 - i * 0.08,
                            animation: `axRingPulse 3s ease-out ${i * 0.6}s infinite`,
                        }}
                    />
                ))}
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                    <IconBox size={84} ring>
                        <IconWave />
                    </IconBox>
                </div>
            </div>
        </Stage>
    );
}

/* ============================================================
   2) WEBSITE CHATBOT — Chat-UI-Fragment
   ============================================================ */
function GraphicChatbot() {
    return (
        <Stage>
            <div
                style={{
                    position: "absolute",
                    left: 28,
                    right: 28,
                    top: 24,
                    bottom: 24,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    gap: 10,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -8,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 160,
                        height: 20,
                        borderRadius: "0 0 999px 999px",
                        background: C.blue,
                    }}
                />
                <div
                    className="ax-r2"
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        background: "#fff",
                        color: C.navy,
                        alignSelf: "flex-start",
                        padding: "12px 14px",
                        borderRadius: 14,
                        borderTopLeftRadius: 4,
                        fontSize: 12.5,
                        lineHeight: 1.4,
                        maxWidth: "85%",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                        border: `1px solid ${C.border}`,
                    }}
                >
                    <span
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            background: C.blueLL,
                            color: C.blue,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: 800,
                            flexShrink: 0,
                            marginTop: 1,
                        }}
                    >
                        A
                    </span>
                    Hier ist dein optimierter Terminplan für KW&nbsp;13. Soll ich Pufferzeiten einbauen?
                </div>
                <div
                    className="ax-r4"
                    style={{
                        background: C.blue,
                        color: "#fff",
                        alignSelf: "flex-end",
                        padding: "10px 14px",
                        borderRadius: 14,
                        borderTopRightRadius: 4,
                        fontSize: 12.5,
                        lineHeight: 1.4,
                        maxWidth: "85%",
                    }}
                >
                    Ja, 15 Minuten zwischen Terminen.
                </div>
                <div className="ax-r6" style={{ display: "flex", alignItems: "flex-start", gap: 8, alignSelf: "flex-start" }}>
                    <span
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            background: C.blueLL,
                            color: C.blue,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: 800,
                            flexShrink: 0,
                            marginTop: 5,
                        }}
                    >
                        A
                    </span>
                    <div
                        style={{
                            background: "#fff",
                            padding: "10px 14px",
                            borderRadius: 14,
                            borderTopLeftRadius: 4,
                            display: "flex",
                            gap: 4,
                            alignItems: "center",
                            border: `1px solid ${C.border}`,
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                style={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: C.slateM,
                                    animation: `axTypeDot 1.2s ${i * 0.15}s infinite`,
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        marginTop: 6,
                        background: "#fff",
                        borderRadius: 8,
                        padding: "10px 14px",
                        fontSize: 12,
                        color: C.slateM,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        border: `1px solid ${C.borderM}`,
                    }}
                >
                    <span style={{ flex: 1 }}>Nachricht eingeben</span>
                    <span style={{ width: 1.5, height: 14, background: C.navy, animation: "axCaret 1s steps(2) infinite" }} />
                </div>
            </div>
        </Stage>
    );
}

/* ============================================================
   3) WISSENSDATENBANK (RAG) — Generator-Liste mit Highlight
   ============================================================ */
function RAGOption({ text, idx }: { text: string; idx: 0 | 1 | 2 }) {
    return (
        <div
            style={{
                padding: "12px 16px",
                borderRadius: 8,
                border: `1px solid ${C.borderM}`,
                background: "#fff",
                color: C.navy,
                fontSize: 13.5,
                fontWeight: 500,
                animation: `axRagH${idx} 12s infinite`,
            }}
        >
            {text}
        </div>
    );
}
function GraphicRAG() {
    const options: { t: string; i: 0 | 1 | 2 }[] = [
        { t: "Behandlungen erklären", i: 0 },
        { t: "Preise & GOZ-Codes", i: 1 },
        { t: "FAQ beantworten", i: 2 },
    ];
    return (
        <Stage>
            <div style={{ position: "absolute", left: 36, right: 36, top: 30, bottom: 30, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${C.borderM}`, flexShrink: 0 }} />
                    <div
                        style={{
                            flex: 1,
                            height: 32,
                            borderRadius: 8,
                            border: `1px solid ${C.borderM}`,
                            background: "#fff",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 12px",
                        }}
                    >
                        <span style={{ width: 1.5, height: 14, background: C.navy, animation: "axCaret 1s steps(2) infinite" }} />
                    </div>
                    <div
                        style={{
                            padding: "7px 14px",
                            background: "#fff",
                            border: `1px solid ${C.borderM}`,
                            borderRadius: 8,
                            fontSize: 12,
                            color: C.navy,
                            fontWeight: 600,
                        }}
                    >
                        Generieren
                    </div>
                </div>
                {options.map((o) => (
                    <RAGOption key={o.i} text={o.t} idx={o.i} />
                ))}
            </div>
        </Stage>
    );
}

/* ============================================================
   4) AGENTS SETUP — zentraler Engine-Chip mit Flow
   ============================================================ */
function GraphicEngine() {
    const inputs = [
        { y: 70, label: "Anrufe" },
        { y: 130, label: "E-Mails" },
        { y: 190, label: "Chat" },
    ];
    const outputs = [
        { y: 70, label: "Termine" },
        { y: 130, label: "Recall" },
        { y: 190, label: "Report" },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 400 260" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                {inputs.map((p, i) => (
                    <g key={"in" + i}>
                        <path d={`M40 ${p.y} Q120 ${p.y} 180 130`} fill="none" stroke={C.blue} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.5" />
                        <circle r="3" fill={C.cyan} opacity="0">
                            <animateMotion dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" path={`M40 ${p.y} Q120 ${p.y} 180 130`} keyPoints="0;1" keyTimes="0;1" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                        </circle>
                    </g>
                ))}
                {outputs.map((p, i) => (
                    <g key={"out" + i}>
                        <path d={`M220 130 Q280 ${p.y} 360 ${p.y}`} fill="none" stroke={C.blue} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.5" />
                        <circle r="3" fill={C.cyan} opacity="0">
                            <animateMotion dur="3s" begin={`${1.2 + i * 0.4}s`} repeatCount="indefinite" path={`M220 130 Q280 ${p.y} 360 ${p.y}`} keyPoints="0;1" keyTimes="0;1" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin={`${1.2 + i * 0.4}s`} repeatCount="indefinite" />
                        </circle>
                    </g>
                ))}
                {inputs.map((p, i) => (
                    <g key={"inl" + i}>
                        <rect x="-6" y={p.y - 14} width="80" height="28" rx="14" fill="#fff" stroke={C.border} strokeWidth="1" />
                        <text x="34" y={p.y + 4} fontSize="11" fill={C.slate} textAnchor="middle" fontFamily={FONT} fontWeight="500">
                            {p.label}
                        </text>
                    </g>
                ))}
                {outputs.map((p, i) => (
                    <g key={"outl" + i}>
                        <rect x="332" y={p.y - 14} width="80" height="28" rx="14" fill="#fff" stroke={C.border} strokeWidth="1" />
                        <text x="372" y={p.y + 4} fontSize="11" fill={C.slate} textAnchor="middle" fontFamily={FONT} fontWeight="500">
                            {p.label}
                        </text>
                    </g>
                ))}
                <g>
                    <rect x="160" y="100" width="80" height="80" rx="14" fill={C.navy} stroke={C.cyan} strokeWidth="1.5" />
                    <rect x="160" y="100" width="80" height="80" rx="14" fill="none" stroke={C.cyan} strokeWidth="1.5" opacity="0.3">
                        <animate attributeName="stroke-width" values="1.5;3;1.5" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite" />
                    </rect>
                    <g transform="translate(187 117)" stroke={C.cyan} strokeWidth="1.6" fill="none" strokeLinecap="round">
                        <rect x="6" y="6" width="14" height="14" rx="2" />
                        <rect x="9" y="9" width="8" height="8" rx="1" />
                        <line x1="9" y1="2" x2="9" y2="6" />
                        <line x1="17" y1="2" x2="17" y2="6" />
                        <line x1="9" y1="20" x2="9" y2="24" />
                        <line x1="17" y1="20" x2="17" y2="24" />
                        <line x1="2" y1="9" x2="6" y2="9" />
                        <line x1="2" y1="17" x2="6" y2="17" />
                        <line x1="20" y1="9" x2="24" y2="9" />
                        <line x1="20" y1="17" x2="24" y2="17" />
                    </g>
                    <text x="200" y="166" fontSize="9" fill={C.cyan} textAnchor="middle" fontFamily={FONT} fontWeight="700" letterSpacing="2">
                        AGENT
                    </text>
                </g>
            </svg>
        </Stage>
    );
}

/* ============================================================
   5) E-MAIL AGENT — Inbox-Karte mit KI-Vorschlag
   ============================================================ */
function GraphicEmail() {
    return (
        <Stage>
            <div style={{ position: "absolute", left: 30, right: 30, top: 26, bottom: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                    style={{
                        background: "#fff",
                        border: `1px solid ${C.borderM}`,
                        borderRadius: 10,
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: C.blueLL,
                            color: C.blue,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                            fontSize: 12,
                            flexShrink: 0,
                        }}
                    >
                        FB
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 2 }}>Familie Becker</div>
                        <div style={{ fontSize: 11, color: C.slateM, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            Termin für Tochter (8 J.) …
                        </div>
                    </div>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue }} />
                </div>
                <div
                    style={{
                        background: C.blueLL,
                        border: `1.5px solid ${C.blue}`,
                        borderRadius: 10,
                        padding: "14px",
                        position: "relative",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: -8,
                            left: 12,
                            padding: "3px 8px",
                            background: C.blue,
                            color: "#fff",
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: "0.12em",
                            borderRadius: 4,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        <IconSparkle size={10} color="#fff" /> KI-VORSCHLAG
                    </div>
                    <div className="ax-r1" style={{ height: 7, background: C.blue, opacity: 0.85, borderRadius: 2, width: "60%" }} />
                    <div className="ax-r2" style={{ height: 6, background: C.slateL, opacity: 0.45, borderRadius: 2, width: "100%" }} />
                    <div className="ax-r3" style={{ height: 6, background: C.slateL, opacity: 0.45, borderRadius: 2, width: "92%" }} />
                    <div className="ax-r4" style={{ height: 6, background: C.slateL, opacity: 0.45, borderRadius: 2, width: "75%" }} />
                    <div className="ax-r5" style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                        {["Di 14:00", "Mi 16:30", "Fr 11:00"].map((t) => (
                            <div
                                key={t}
                                style={{
                                    padding: "4px 9px",
                                    background: "#fff",
                                    borderRadius: 5,
                                    border: `1px solid ${C.blue}`,
                                    color: C.blue,
                                    fontSize: 10,
                                    fontWeight: 700,
                                }}
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                    <div
                        className="ax-r6"
                        style={{
                            alignSelf: "flex-start",
                            marginTop: "auto",
                            padding: "7px 14px",
                            background: C.blue,
                            color: "#fff",
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <IconCheck /> Senden
                    </div>
                </div>
            </div>
        </Stage>
    );
}

/* ============================================================
   6) ABRECHNUNG — Behandlungsnotiz → GOZ-Codes
   ============================================================ */
function GraphicBilling() {
    const rows = [
        { code: "GOZ 6100", desc: "Beratung", val: "23,40 €" },
        { code: "GOZ 6020", desc: "OPG", val: "36,80 €" },
        { code: "GOZ 6040", desc: "Abformung", val: "24,30 €" },
        { code: "GOZ 6080", desc: "Modellanalyse", val: "52,60 €" },
    ];
    return (
        <Stage>
            <div
                style={{
                    position: "absolute",
                    left: 28,
                    right: 28,
                    top: 24,
                    bottom: 24,
                    display: "flex",
                    flexDirection: "column",
                    background: "#fff",
                    borderRadius: 10,
                    border: `1px solid ${C.borderM}`,
                    overflow: "hidden",
                }}
            >
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                        style={{
                            width: 26,
                            height: 26,
                            borderRadius: 6,
                            background: C.blueLL,
                            color: C.blue,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconEuro />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>Rechnung · Entwurf</div>
                    <div style={{ flex: 1 }} />
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.blue, letterSpacing: "0.1em" }}>R-0584</div>
                </div>
                {rows.map((r, i) => (
                    <div
                        key={i}
                        className={`ax-r${i + 1}`}
                        style={{
                            padding: "10px 16px",
                            borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 10,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: C.blue,
                                background: C.blueLL,
                                padding: "3px 7px",
                                borderRadius: 4,
                            }}
                        >
                            {r.code}
                        </span>
                        <span style={{ fontSize: 12, color: C.navy, fontWeight: 500, flex: 1 }}>{r.desc}</span>
                        <span style={{ fontSize: 12, color: C.navy, fontWeight: 700 }}>{r.val}</span>
                        <span
                            style={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                background: C.green,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <IconCheck />
                        </span>
                    </div>
                ))}
                <div style={{ marginTop: "auto", padding: "10px 16px", background: C.navy, color: "#fff", display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: C.slateL }}>Summe</span>
                    <div style={{ flex: 1 }} />
                    <span style={{ fontSize: 15, fontWeight: 800 }}>137,10 €</span>
                </div>
            </div>
        </Stage>
    );
}

/* ============================================================
   7) RECALL — Mini-Kalender + Reminder
   ============================================================ */
function GraphicRecall() {
    return (
        <Stage>
            <div style={{ position: "absolute", left: 30, right: 30, top: 26, bottom: 26, display: "flex", flexDirection: "column", gap: 14 }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: "#fff",
                        border: `1px solid ${C.borderM}`,
                        borderRadius: 10,
                        padding: "8px 12px",
                    }}
                >
                    <div
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: C.blueLL,
                            color: C.blue,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconCalendar />
                    </div>
                    <div style={{ fontSize: 12, color: C.navy, fontWeight: 600 }}>Recall fällig</div>
                    <div style={{ flex: 1 }} />
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", background: "#D1FAE5", color: "#065F46", borderRadius: 4 }}>
                        ✓ GEBUCHT
                    </span>
                </div>
                <div style={{ background: "#fff", border: `1px solid ${C.borderM}`, borderRadius: 10, padding: 12, flex: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 6 }}>
                        {["M", "D", "M", "D", "F", "S", "S"].map((d, i) => (
                            <div key={i} style={{ textAlign: "center", fontSize: 9, fontWeight: 700, color: C.slateL }}>
                                {d}
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
                        {Array.from({ length: 28 }, (_, i) => {
                            const d = i + 1;
                            const highlighted = d === 14;
                            const dim = d > 22;
                            return (
                                <div
                                    key={i}
                                    style={{
                                        aspectRatio: "1",
                                        borderRadius: 5,
                                        background: highlighted ? C.blue : "transparent",
                                        color: highlighted ? "#fff" : dim ? C.slateL : C.navy,
                                        fontSize: 10,
                                        fontWeight: highlighted ? 700 : 500,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        animation: highlighted ? "axCellPulse 2.4s ease-in-out infinite" : "none",
                                    }}
                                >
                                    {d}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Stage>
    );
}

/* ============================================================
   8) KPI DASHBOARD — Zwei Nodes + Flow + Bars
   ============================================================ */
function GraphicKPI() {
    return (
        <Stage>
            <div style={{ position: "relative", width: 320, height: 200, transform: "scale(0.95)" }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} viewBox="0 0 320 200">
                    <line x1="80" y1="100" x2="240" y2="100" stroke={C.blue} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
                    <circle r="4" fill={C.cyan}>
                        <animateMotion dur="2.4s" repeatCount="indefinite" path="M80 100 L240 100" />
                    </circle>
                </svg>
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "#fff",
                        border: `1px solid ${C.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: C.blue,
                        boxShadow: `0 0 0 6px ${C.blueLL}`,
                    }}
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" style={Stroke}>
                        <line x1="6" y1="20" x2="6" y2="14" className="ax-bar" style={{ transformOrigin: "6px 20px" }} />
                        <line x1="12" y1="20" x2="12" y2="8" className="ax-bar" style={{ transformOrigin: "12px 20px", animationDelay: "0.3s" }} />
                        <line x1="18" y1="20" x2="18" y2="11" className="ax-bar" style={{ transformOrigin: "18px 20px", animationDelay: "0.6s" }} />
                    </svg>
                </div>
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "#fff",
                        border: `1px solid ${C.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: C.blue,
                        boxShadow: `0 0 0 6px ${C.blueLL}`,
                    }}
                >
                    <IconDiamond />
                </div>
                <div
                    className="ax-r3"
                    style={{
                        position: "absolute",
                        left: -10,
                        bottom: 0,
                        padding: "4px 9px",
                        background: C.blue,
                        color: "#fff",
                        borderRadius: 5,
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                    }}
                >
                    + 142 h
                </div>
                <div
                    className="ax-r5"
                    style={{
                        position: "absolute",
                        right: -10,
                        bottom: 0,
                        padding: "4px 9px",
                        background: C.cyan,
                        color: "#fff",
                        borderRadius: 5,
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                    }}
                >
                    28 400 €
                </div>
            </div>
        </Stage>
    );
}

export type GraphicKey = "call" | "chatbot" | "rag" | "engine" | "email" | "billing" | "recall" | "kpi";

export const PRAXIS_GRAPHICS: Record<GraphicKey, () => React.ReactElement> = {
    call: GraphicCall,
    chatbot: GraphicChatbot,
    rag: GraphicRAG,
    engine: GraphicEngine,
    email: GraphicEmail,
    billing: GraphicBilling,
    recall: GraphicRecall,
    kpi: GraphicKPI,
};
