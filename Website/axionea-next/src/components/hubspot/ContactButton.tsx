"use client";

import { useState } from "react";
import Modal from "./Modal";
import HubSpotForm from "./HubSpotForm";

interface ContactButtonProps {
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
    title?: string;
    onOpen?: () => void;
}

export default function ContactButton({
    children,
    className,
    ariaLabel = "Kontaktformular öffnen",
    title = "Kontakt aufnehmen",
    onOpen,
}: ContactButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                aria-label={ariaLabel}
                onClick={() => {
                    onOpen?.();
                    setOpen(true);
                }}
                className={className}
            >
                {children}
            </button>
            <Modal open={open} onClose={() => setOpen(false)} title={title}>
                <HubSpotForm />
            </Modal>
        </>
    );
}
