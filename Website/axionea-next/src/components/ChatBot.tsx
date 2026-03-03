"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);

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
                const errText = await response.text();
                throw new Error(errText || response.statusText);
            }

            // Handle the stream
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                // Add a placeholder assistant message
                const assistantId = (Date.now() + 1).toString();
                setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

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
            }
        } catch (err: any) {
            console.error("Chat error:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white/90 dark:bg-[#070d1a]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="h-16 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 bg-sapphire/5">
                            <div className="flex items-center gap-3">
                                {/* Small Eve Icon for Header */}
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden relative border border-gray-100">
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
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center transition-colors text-gray-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                            {/* Initial Welcome Message */}
                            {messages.length === 0 && (
                                <div className="flex gap-3 justify-start">
                                    <div className="max-w-[80%] rounded-2xl p-3 px-4 bg-gray-100 dark:bg-[#0f172a] text-sm text-gray-800 dark:text-gray-200 rounded-tl-none">
                                        Beep boop! Ich bin Ax, der digitale Assistent von Axionea. Wie kann ich dir heute mit KI und Automatisierung weiterhelfen? ✨
                                    </div>
                                </div>
                            )}

                            {messages.map((m: any) => (
                                <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl p-3 px-4 text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-sapphire text-white rounded-tr-none' : 'bg-gray-100 dark:bg-[#0f172a] text-gray-800 dark:text-gray-200 rounded-tl-none'}`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-3 justify-start">
                                    <div className="max-w-[80%] rounded-2xl p-4 px-4 bg-gray-100 dark:bg-[#0f172a] rounded-tl-none flex items-center gap-1.5">
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
                        <div className="p-4 bg-white dark:bg-[#070d1a] border-t border-gray-100 dark:border-white/10">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    className="flex-1 bg-gray-50 dark:bg-[#0a1628] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sapphire transition-all dark:text-white"
                                    value={input}
                                    placeholder="Frag Ax..."
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-sapphire hover:bg-sapphire-hover text-white rounded-xl w-10 h-10 flex items-center justify-center transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ax Robot Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                animate={{
                    y: [0, -8, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                }}
                className={`relative group w-20 h-24 flex flex-col items-center justify-center focus:outline-none transition-transform hover:scale-105 duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
                aria-label="Chat with Ax"
            >
                {/* Glow behind Ax */}
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl scale-125 pointer-events-none" />

                {/* EVE HEAD */}
                <div className="relative w-14 h-11 bg-white rounded-[40px] rounded-bl-[20px] rounded-br-[20px] shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(0,0,0,0.05)] flex items-center justify-center z-10 overflow-hidden transform group-hover:-rotate-6 transition-transform duration-300">
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
                <div className="w-1.5 h-1.5 bg-gray-300 z-0 my-[-1px]" />

                {/* EVE BODY */}
                <div className="relative w-16 h-12 bg-white rounded-b-[40px] shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_-4px_8px_rgba(0,0,0,0.05)] flex items-start justify-center overflow-hidden z-10">

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
                />

            </motion.button>
        </div>
    );
}
