"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ChatMarkdown, { ChatAction } from './ChatMarkdown';
import Modal from './hubspot/Modal';
import HubSpotForm from './hubspot/HubSpotForm';
import HubSpotMeetings from './hubspot/HubSpotMeetings';

const WELCOME_MESSAGE =
    "Hi! Ich bin **Ax**, der digitale Assistent von Axionea. Frag mich zu Services oder Datenschutz, lass dir dein Einsparpotenzial berechnen oder mach den Förder-Check — tippen oder einfach über das Mikrofon sprechen.\n\n[[roi]] [[termin]]";

// Web Speech API: minimale Typen (nicht vollständig in lib.dom enthalten)
interface SpeechRecognitionEventLike {
    results: ArrayLike<ArrayLike<{ transcript: string }>>;
}
interface SpeechRecognitionLike {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    onresult: ((e: SpeechRecognitionEventLike) => void) | null;
    onend: (() => void) | null;
    onerror: (() => void) | null;
    start(): void;
    stop(): void;
    abort(): void;
}
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
    if (typeof window === "undefined") return null;
    const w = window as unknown as {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [meetingOpen, setMeetingOpen] = useState(false);

    // Aktions-Buttons aus Bot-Nachrichten ([[roi]] / [[termin]] / [[kontakt]])
    const handleAction = (action: ChatAction) => {
        if (action === "roi") {
            setIsOpen(false);
            setIsExpanded(false);
            if (window.location.pathname === "/") {
                document.getElementById("roi")?.scrollIntoView({ behavior: "smooth" });
            } else {
                window.location.href = "/#roi";
            }
        } else if (action === "termin") {
            setMeetingOpen(true);
        } else {
            setContactOpen(true);
        }
    };

    // Native chat state instead of ai/react to fix Next.js 16 Turbopack module resolution
    const [messages, setMessages] = useState<{ id: string, role: string, content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { id: Date.now().toString(), role: 'user', content: input };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput("");
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });

            if (!response.ok) {
                let errorMessage = response.statusText;
                try {
                    // Clone the response so we can safely attempt multiple reads
                    const errData = await response.clone().json();
                    if (errData.error) {
                        errorMessage = errData.error;
                        if (errData.details) errorMessage += ` (${errData.details})`;
                    }
                } catch {
                    // Fallback if response is not JSON — read from original response
                    try {
                        const errText = await response.text();
                        if (errText) errorMessage = errText;
                    } catch {
                        // Body already consumed or unreadable, use statusText
                    }
                }
                throw new Error(errorMessage);
            }

            // Handle the stream
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                // Add a placeholder assistant message
                const assistantId = (Date.now() + 1).toString();
                setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

                try {
                    let done = false;
                    while (!done) {
                        const { value, done: readerDone } = await reader.read();
                        done = readerDone;
                        if (value) {
                            const chunk = decoder.decode(value, { stream: true });
                            setMessages(prev => {
                                const updated = [...prev];
                                const lastIndex = updated.length - 1;
                                // Ensure we only update the latest assistant message
                                if (updated[lastIndex].role === 'assistant') {
                                    updated[lastIndex] = {
                                        ...updated[lastIndex],
                                        content: updated[lastIndex].content + chunk
                                    };
                                }
                                return updated;
                            });
                        }
                    }
                } catch (streamErr: unknown) {
                    console.error("Stream read error:", streamErr);
                    throw streamErr instanceof Error ? streamErr : new Error("Verbindung zum Server unterbrochen.");
                } finally {
                    reader.releaseLock();
                }
            }
        } catch (err: unknown) {
            console.error("Chat error:", err);
            setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
            setIsLoading(false);
        }
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Spracheingabe (Web Speech API) — Button erscheint nur, wenn der Browser sie kann
    const [isListening, setIsListening] = useState(false);
    const [voiceSupported, setVoiceSupported] = useState(false);
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

    useEffect(() => {
        setVoiceSupported(getSpeechRecognition() !== null);
    }, []);

    // Erkennung stoppen, wenn der Chat geschlossen wird
    useEffect(() => {
        if (!isOpen && recognitionRef.current) {
            recognitionRef.current.abort();
            recognitionRef.current = null;
            setIsListening(false);
        }
    }, [isOpen]);

    const toggleVoice = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            return;
        }
        const SR = getSpeechRecognition();
        if (!SR) return;
        const recognition = new SR();
        recognition.lang = "de-DE";
        recognition.interimResults = true;
        recognition.continuous = false;
        recognition.onresult = (e) => {
            let transcript = "";
            for (let i = 0; i < e.results.length; i++) {
                transcript += e.results[i][0].transcript;
            }
            setInput(transcript);
        };
        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;
            inputRef.current?.focus();
        };
        recognition.onerror = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };
        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
    };

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // ESC schließt den Chat, Fokus geht zurück auf den Trigger-Button
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                triggerRef.current?.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen]);

    // Beim Öffnen Fokus in den Dialog bewegen (a11y: aria-modal verlangt das).
    // Desktop: direkt ins Eingabefeld; Mobile: aufs Panel, damit die
    // Bildschirmtastatur nicht ungefragt aufspringt.
    useEffect(() => {
        if (!isOpen) return;
        const t = setTimeout(() => {
            if (window.innerWidth >= 640) {
                inputRef.current?.focus();
            } else {
                panelRef.current?.focus();
            }
        }, 60);
        return () => clearTimeout(t);
    }, [isOpen]);

    // iOS/Android: Wenn die Bildschirmtastatur aufgeht, schrumpft der visualViewport,
    // aber nicht immer das Layout. Panel-Höhe daran klemmen, damit das Eingabefeld
    // sichtbar bleibt.
    useEffect(() => {
        if (!isOpen) return;
        const vv = window.visualViewport;
        if (!vv) return;
        const panel = panelRef.current;
        const clampHeight = () => {
            if (!panel) return;
            // Nur auf Mobile (Bottom-Sheet) eingreifen
            if (window.innerWidth >= 640) {
                panel.style.maxHeight = "";
                return;
            }
            panel.style.maxHeight = `${Math.round(vv.height * 0.85)}px`;
        };
        clampHeight();
        vv.addEventListener("resize", clampHeight);
        return () => {
            vv.removeEventListener("resize", clampHeight);
            if (panel) panel.style.maxHeight = "";
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop: Mobile immer; Desktop nur im vergrößerten Modus (dunkler + stärker geblurrt) */}
            {isOpen && (
                <div
                    className={`fixed inset-0 z-[65] ${isExpanded ? "bg-black/60 backdrop-blur-md" : "bg-black/20 backdrop-blur-sm sm:hidden"}`}
                    onClick={() => {
                        setIsOpen(false);
                        setIsExpanded(false);
                    }}
                    aria-hidden="true"
                />
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Chat mit Ax, dem Axionea-Assistenten"
                        tabIndex={-1}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`fixed z-[70] flex flex-col overflow-hidden bg-white/90 dark:bg-navy-900/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl inset-x-0 bottom-0 rounded-t-3xl h-[85vh] max-h-[85dvh] sm:rounded-2xl ${
                            isExpanded
                                ? "sm:inset-x-0 sm:mx-auto sm:top-[6dvh] sm:bottom-auto sm:h-[88dvh] sm:max-h-none sm:w-[min(780px,calc(100vw-4rem))]"
                                : "sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-[min(600px,calc(100dvh-3rem))] sm:w-[min(420px,calc(100vw-3rem))]"
                        }`}
                    >
                        {/* Header */}
                        <div className="h-16 shrink-0 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 bg-sapphire/5">
                            <div className="flex items-center gap-3">
                                {/* Small Eve Icon for Header */}
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden relative border border-gray-100" aria-hidden="true">
                                    <div className="w-[80%] h-[50%] bg-black rounded-full flex items-center justify-center gap-[2px] mt-[-2px]">
                                        <div className="w-2 h-[2px] bg-blue-500 rounded-full" />
                                        <div className="w-2 h-[2px] bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-syne)" }}>Ax</h3>
                                    <p className="text-[10px] text-green-500 font-medium tracking-wide uppercase">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsExpanded((v) => !v)}
                                    aria-label={isExpanded ? "Chat verkleinern" : "Chat vergrößern"}
                                    aria-pressed={isExpanded}
                                    className="hidden sm:flex w-11 h-11 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 items-center justify-center transition-colors text-gray-500"
                                >
                                    {isExpanded ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" /></svg>
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsExpanded(false);
                                        triggerRef.current?.focus();
                                    }}
                                    aria-label="Chat schließen"
                                    className="w-11 h-11 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center transition-colors text-gray-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                            {/* Initial Welcome Message — läuft durch denselben Renderer wie Bot-Antworten */}
                            {messages.length === 0 && (
                                <div className="flex gap-3 justify-start">
                                    <div className="max-w-[80%] rounded-2xl p-3 px-4 bg-gray-100 dark:bg-navy-800 text-sm text-gray-800 dark:text-gray-200 rounded-tl-none">
                                        <ChatMarkdown content={WELCOME_MESSAGE} onAction={handleAction} />
                                    </div>
                                </div>
                            )}

                            {messages.map((m) => (
                                <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl p-3 px-4 text-sm ${m.role === 'user' ? 'bg-sapphire text-white rounded-tr-none whitespace-pre-wrap' : 'bg-gray-100 dark:bg-navy-800 text-gray-800 dark:text-gray-200 rounded-tl-none'}`}>
                                        {m.role === 'assistant'
                                            ? <ChatMarkdown content={m.content} onAction={handleAction} />
                                            : m.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-3 justify-start">
                                    <div className="max-w-[80%] rounded-2xl p-4 px-4 bg-gray-100 dark:bg-navy-800 rounded-tl-none flex items-center gap-1.5">
                                        <motion.div className="w-1.5 h-1.5 bg-sapphire/50 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                                        <motion.div className="w-1.5 h-1.5 bg-sapphire/50 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                                        <motion.div className="w-1.5 h-1.5 bg-sapphire/50 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="flex gap-3 justify-center">
                                    <div className="text-xs text-red-500 bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-500/20">
                                        Ax meldet ein Problem: {error.message}
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 shrink-0 bg-white dark:bg-navy-900 border-t border-gray-100 dark:border-white/10 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-4">
                            <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
                                <input
                                    ref={inputRef}
                                    className="flex-1 min-h-[44px] bg-gray-50 dark:bg-navy-700 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-sapphire transition-all dark:text-white"
                                    value={input}
                                    placeholder="Frag Ax..."
                                    aria-label="Deine Nachricht an Ax"
                                    onChange={handleInputChange}
                                    onFocus={() => {
                                        // iOS: Eingabefeld über der Tastatur halten
                                        setTimeout(() => {
                                            inputRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
                                        }, 250);
                                    }}
                                    disabled={isLoading}
                                />
                                {voiceSupported && (
                                    <button
                                        type="button"
                                        onClick={toggleVoice}
                                        aria-label={isListening ? "Spracheingabe stoppen" : "Spracheingabe starten"}
                                        aria-pressed={isListening}
                                        className={`rounded-xl w-11 h-11 flex items-center justify-center transition-colors shrink-0 border ${
                                            isListening
                                                ? "bg-red-500 border-red-500 text-white animate-pulse"
                                                : "bg-gray-50 dark:bg-navy-700 border-gray-200 dark:border-white/10 text-gray-500 hover:text-sapphire hover:border-sapphire/40"
                                        }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                            <line x1="12" x2="12" y1="19" y2="22" />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    aria-label="Nachricht senden"
                                    className="bg-sapphire hover:bg-sapphire-hover text-white rounded-xl w-11 h-11 flex items-center justify-center transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                </button>
                            </form>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center leading-tight">
                                Bitte gib keine sensiblen Daten ein. Die Nutzung erfolgt gemäß unserer{" "}
                                <Link href="/datenschutz" className="underline hover:text-sapphire transition-colors">
                                    Datenschutzerklärung
                                </Link>
                                .
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ax Robot Trigger Button */}
            <motion.button
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                animate={{
                    y: [0, -8, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                }}
                className={`fixed bottom-6 right-6 z-[40] group w-20 h-24 flex flex-col items-center justify-center focus:outline-none transition-transform hover:scale-105 duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
                aria-label="Chat mit Ax öffnen"
                aria-expanded={isOpen}
                // Unsichtbarer Trigger (opacity-0) darf kein Tab-Stop sein
                tabIndex={isOpen ? -1 : 0}
            >
                {/* Glow behind Ax */}
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl scale-125 pointer-events-none" aria-hidden="true" />

                {/* EVE HEAD */}
                <div className="relative w-14 h-11 bg-white rounded-[40px] rounded-bl-[20px] rounded-br-[20px] shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(0,0,0,0.05)] flex items-center justify-center z-10 overflow-hidden transform group-hover:-rotate-6 transition-transform duration-300" aria-hidden="true">
                    {/* Black Visor */}
                    <div className="w-[85%] h-[60%] bg-black rounded-[30px] rounded-bl-[15px] rounded-br-[15px] mt-1 relative overflow-hidden flex items-center justify-center gap-1.5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]">

                        {/* Left Eye */}
                        <div className="relative w-[30%] h-[30%] bg-blue-500 rounded-full blur-[1px] opacity-90 overflow-hidden mt-[-2px]">
                            {/* Scanning lines effect on eyes */}
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.5)_1px,rgba(0,0,0,0.5)_2px)] opacity-50" />
                        </div>

                        {/* Right Eye */}
                        <div className="relative w-[30%] h-[30%] bg-blue-500 rounded-full blur-[1px] opacity-90 overflow-hidden mt-[-2px]">
                            {/* Scanning lines effect on eyes */}
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.5)_1px,rgba(0,0,0,0.5)_2px)] opacity-50" />
                        </div>

                        {/* Visor Glare */}
                        <div className="absolute top-0 left-[10%] w-[30%] h-[40%] bg-white/20 rounded-full blur-[2px] transform -rotate-45" />
                    </div>
                </div>

                {/* EVE NECK JOINT */}
                <div className="w-1.5 h-1.5 bg-gray-300 z-0 my-[-1px]" aria-hidden="true" />

                {/* EVE BODY */}
                <div className="relative w-16 h-12 bg-white rounded-b-[40px] shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_-4px_8px_rgba(0,0,0,0.05)] flex items-start justify-center overflow-hidden z-10" aria-hidden="true">

                    {/* Status Light */}
                    <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1"
                    >
                        <div className="w-1 h-1 bg-green-500 rounded-full shadow-[0_0_4px_rgba(34,197,94,0.8)]" />
                    </motion.div>

                    {/* Subtle panel lines */}
                    <div className="w-[80%] h-[1px] bg-gray-100 mt-5 opacity-50" />
                </div>

                {/* Float Shadow */}
                <motion.div
                    animate={{
                        scale: [1, 0.8, 1],
                        opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-4 w-10 h-2 bg-black/20 rounded-[100%] blur-[2px]"
                    aria-hidden="true"
                />

            </motion.button>

            {/* Modals für Chat-Aktionen ([[termin]] / [[kontakt]]) — Modal liegt auf z-80, über dem Chat-Panel (70) */}
            <Modal open={meetingOpen} onClose={() => setMeetingOpen(false)} title="Kostenloses Erstgespräch buchen">
                <HubSpotMeetings />
            </Modal>
            <Modal open={contactOpen} onClose={() => setContactOpen(false)} title="Kontakt aufnehmen">
                <HubSpotForm />
            </Modal>
        </>
    );
}
