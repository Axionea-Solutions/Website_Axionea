"use client";

import { useState } from "react";
import Modal from "./Modal";
import HubSpotMeetings from "./HubSpotMeetings";

interface BookingButtonProps {
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
    title?: string;
    onOpen?: () => void;
}

export default function BookingButton({
    children,
    className,
    ariaLabel = "Beratungsgespräch buchen",
    title = "Kostenloses Erstgespräch buchen",
    onOpen,
}: BookingButtonProps) {
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
                <HubSpotMeetings />
            </Modal>
        </>
    );
}
