"use client"

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
    const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);


    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 992);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);


    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const stopTime = video.duration - 10;
            if (video.currentTime >= stopTime) {
                video.currentTime = 0;
                video.play;
            }
        }

        video.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate)
        };
    }, []);

    return (
        <>
            <div className="hero-section">
                <div className="hero-container">
                    {!isMobile && (
                        <>
                            <img src="https://static.massimodutti.net/assets/public/079f/05c9/03ea4932b3fd/befd83527c35/BLOQUE6-CAMISAS-SIN-MARGEN/BLOQUE6-CAMISAS-SIN-MARGEN.jpg?ts=1757503198048" alt="desktop 2" />
                            <img src="https://static.massimodutti.net/assets/public/f84c/fdd6/cd9f4d4e9863/c0220bb25a7d/MENU/MENU.jpg" alt="desktop 1" />
                        </>
                    )}

                    {isMobile && (
                        <img src="https://static.massimodutti.net/assets/public/079f/05c9/03ea4932b3fd/befd83527c35/BLOQUE6-CAMISAS-SIN-MARGEN/BLOQUE6-CAMISAS-SIN-MARGEN.jpg?ts=1757503198048" alt="mobile" />
                    )}
                </div>
                <div className="hero-video">
                    <video
                        ref={videoRef}
                        src="_LEATHER.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="hero-video-element"
                    />
                </div>
            </div>
        </>
    );
}
