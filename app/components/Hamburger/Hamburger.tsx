"use client";

import { useState, useEffect } from "react";
import './Hamburger.scss'

interface HamburgerProps {
    onToggle?: (state: boolean) => void;
    reset?: boolean; // əlavə reset prop
}

export default function Hamburger({ onToggle, reset }: HamburgerProps) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        const newState = !isActive;
        setIsActive(newState);
        if (onToggle) onToggle(newState);
    };

    // reset gələndə bağlansın
    useEffect(() => {
        if (reset) {
            setIsActive(false);
        }
    }, [reset]);

    return (
        <div
            className={`hamburger ${isActive ? "is-active" : ""}`}
            onClick={handleClick}
        >
            <div className="hamburger__container">
                <div className="hamburger__inner"></div>
                <div className="hamburger__hidden"></div>
            </div>
        </div>
    );
}
