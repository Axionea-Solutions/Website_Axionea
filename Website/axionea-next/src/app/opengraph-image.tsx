import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Axionea — KI-Automatisierung für den Mittelstand";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #070d1a 0%, #0a1628 50%, #0d1f3c 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "80px",
                    fontFamily: "sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Background glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "-100px",
                        right: "-100px",
                        width: "600px",
                        height: "600px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(15,82,186,0.3) 0%, transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-150px",
                        left: "100px",
                        width: "400px",
                        height: "400px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(0,46,219,0.2) 0%, transparent 70%)",
                    }}
                />

                {/* Top badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(15,82,186,0.15)",
                        border: "1px solid rgba(15,82,186,0.3)",
                        borderRadius: "100px",
                        padding: "8px 20px",
                        marginBottom: "32px",
                    }}
                >
                    <span style={{ color: "#4d94ff", fontSize: "14px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase" }}>
                        KI-AUTOMATISIERUNG · LIVE IN 4 WOCHEN · DSGVO-KONFORM
                    </span>
                </div>

                {/* Main headline */}
                <div
                    style={{
                        fontSize: "72px",
                        fontWeight: 800,
                        color: "white",
                        lineHeight: 1.05,
                        marginBottom: "24px",
                        maxWidth: "900px",
                    }}
                >
                    <span style={{ color: "white" }}>Dein Unternehmen.</span>
                    <br />
                    <span
                        style={{
                            background: "linear-gradient(90deg, #4d94ff, #60b8ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Automatisiert.
                    </span>
                </div>

                {/* Subline */}
                <p
                    style={{
                        fontSize: "24px",
                        color: "rgba(255,255,255,0.65)",
                        margin: 0,
                        maxWidth: "700px",
                        lineHeight: 1.5,
                        marginBottom: "48px",
                    }}
                >
                    Ohne IT-Abteilung. Ohne Enterprise-Budget. Ohne versteckte Kosten.
                </p>

                {/* Bottom branding */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            background: "rgba(15,82,186,0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "22px",
                            fontWeight: 800,
                            color: "white",
                        }}
                    >
                        A
                    </div>
                    <span style={{ fontSize: "28px", fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>
                        AXIONEA
                    </span>
                    <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.4)", marginLeft: "4px" }}>
                        axionea.de
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
