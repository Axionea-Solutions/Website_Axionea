"use client";

export default function WorkflowDiagram() {
    return (
        <section id="workflow" className="py-16 md:py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 block">ARCHITEKTUR</span>
                    <h2
                        className="text-[clamp(28px,6vw,56px)] font-bold tracking-tight leading-tight mb-4 break-words hyphens-auto"
                        style={{ fontFamily: 'var(--font-syne)' }}
                    >
                        So arbeitet dein KI-System
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Daten rein, Ergebnisse raus — vollautomatisch, rund um die Uhr
                    </p>
                </div>

                {/* Workflow Diagram */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 max-w-[900px] mx-auto py-10">

                    {/* Input nodes (left) */}
                    <div className="flex flex-col gap-5 z-[2] shrink-0">
                        <WorkflowNode
                            icon={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>}
                            label="Kundenanfragen"
                        />
                        <WorkflowNode
                            icon={<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>}
                            label="Termine"
                        />
                        <WorkflowNode
                            icon={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>}
                            label="Dokumente"
                        />
                    </div>

                    {/* Left SVG Lines */}
                    <div className="hidden md:block w-[100px] h-[200px] shrink-0 z-[1]">
                        <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible">
                            {/* Static base lines */}
                            <path d="M 0,33 C 50,33 50,100 100,100" className="workflow-line-base" />
                            <path d="M 0,100 C 50,100 50,100 100,100" className="workflow-line-base" />
                            <path d="M 0,167 C 50,167 50,100 100,100" className="workflow-line-base" />
                            {/* Animated glow lines */}
                            <path d="M 0,33 C 50,33 50,100 100,100" className="workflow-line-glow" />
                            <path d="M 0,100 C 50,100 50,100 100,100" className="workflow-line-glow" style={{ animationDelay: '0.5s' }} />
                            <path d="M 0,167 C 50,167 50,100 100,100" className="workflow-line-glow" style={{ animationDelay: '1s' }} />
                        </svg>
                    </div>

                    {/* Center: Axionea AI Core */}
                    <div className="z-[2] shrink-0">
                        <div className="workflow-core-wrapper relative">
                            {/* Pulse ring */}
                            <div className="absolute -inset-2 rounded-3xl border border-sapphire/20 animate-core-pulse" />
                            <div className="w-[120px] h-[120px] rounded-2xl border-2 border-sapphire bg-card flex flex-col items-center justify-center gap-1 relative">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-sapphire">
                                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                                    <rect x="9" y="9" width="6" height="6" />
                                    <line x1="9" y1="1" x2="9" y2="4" />
                                    <line x1="15" y1="1" x2="15" y2="4" />
                                    <line x1="9" y1="20" x2="9" y2="23" />
                                    <line x1="15" y1="20" x2="15" y2="23" />
                                    <line x1="20" y1="9" x2="23" y2="9" />
                                    <line x1="20" y1="14" x2="23" y2="14" />
                                    <line x1="1" y1="9" x2="4" y2="9" />
                                    <line x1="1" y1="14" x2="4" y2="14" />
                                </svg>
                                <span className="text-sm font-bold text-sapphire" style={{ fontFamily: 'var(--font-syne)' }}>Axionea</span>
                                <span className="text-[10px] text-muted-foreground">KI-Engine</span>
                            </div>
                        </div>
                    </div>

                    {/* Right SVG Lines */}
                    <div className="hidden md:block w-[100px] h-[200px] shrink-0 z-[1]">
                        <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible">
                            {/* Static base lines */}
                            <path d="M 0,100 C 50,100 50,70 100,70" className="workflow-line-base" />
                            <path d="M 0,100 C 50,100 50,130 100,130" className="workflow-line-base" />
                            {/* Animated glow lines */}
                            <path d="M 0,100 C 50,100 50,70 100,70" className="workflow-line-glow" style={{ animationDelay: '1.5s' }} />
                            <path d="M 0,100 C 50,100 50,130 100,130" className="workflow-line-glow" style={{ animationDelay: '2s' }} />
                        </svg>
                    </div>

                    {/* Output nodes (right) */}
                    <div className="flex flex-col gap-5 z-[2] shrink-0">
                        <WorkflowNode
                            icon={<><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>}
                            label="Dashboard"
                        />
                        <WorkflowNode
                            icon={<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>}
                            label="Benachrichtigungen"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function WorkflowNode({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-card min-w-[160px] hover:border-sapphire/40 transition-all duration-300">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-sapphire shrink-0"
            >
                {icon}
            </svg>
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}
