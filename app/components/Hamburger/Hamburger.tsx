"use client";

import { useState } from "react";
import './Hamburger.scss'

interface HamburgerProps {
    onToggle?: (state: boolean) => void;
}

export default function Hamburger({ onToggle }: HamburgerProps) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        if (onToggle) onToggle(!isActive);
    };

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
