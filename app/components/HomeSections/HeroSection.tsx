"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
                video.play();
            }
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, []);

    return (
        <motion.div
            className="hero-section"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <motion.div
                className="hero-container"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
                {!isMobile && (
                    <>
                        <motion.img
                            src="https://static.massimodutti.net/assets/public/079f/05c9/03ea4932b3fd/befd83527c35/BLOQUE6-CAMISAS-SIN-MARGEN/BLOQUE6-CAMISAS-SIN-MARGEN.jpg?ts=1757503198048"
                            alt="desktop 2"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        />
                        <motion.img
                            src="https://static.massimodutti.net/assets/public/f84c/fdd6/cd9f4d4e9863/c0220bb25a7d/MENU/MENU.jpg"
                            alt="desktop 1"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.9 }}
                        />
                    </>
                )}

                {isMobile && (
                    <motion.img
                        src="https://static.massimodutti.net/assets/public/079f/05c9/03ea4932b3fd/befd83527c35/BLOQUE6-CAMISAS-SIN-MARGEN/BLOQUE6-CAMISAS-SIN-MARGEN.jpg?ts=1757503198048"
                        alt="mobile"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    />
                )}
            </motion.div>

            <motion.div
                className="hero-video"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
            >
                <video
                    ref={videoRef}
                    src="_LEATHER.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video-element"
                />
            </motion.div>
        </motion.div>
    );
}
