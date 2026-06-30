"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    // open startet immer false und wird nur client-seitig per Klick true,
    // daher rendert das Portal nie während SSR — kein mounted-State nötig.
    if (!open || typeof document === "undefined") return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={title ?? "Dialog"}
            onClick={onClose}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative flex flex-col w-full max-w-3xl max-h-[94vh] rounded-2xl bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] border border-slate-200"
            >
                <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 shrink-0 rounded-t-2xl">
                    <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-syne)" }}>
                        {title ?? ""}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Schließen"
                        className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
            </div>
        </div>,
        document.body
    );
}
