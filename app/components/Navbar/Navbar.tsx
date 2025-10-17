"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Hamburger from "../Hamburger/Hamburger";
import styles from "./Navbar.module.scss";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoginModal, setIsLoginModal] = useState(false);
    const [isSearchModal, setIsSearchModal] = useState(false);
    const [resetHamburger, setResetHamburger] = useState(false);
    const [gender, setGender] = useState<"man" | "woman" | undefined>(undefined);


    // scroll bağlama
    useEffect(() => {
        document.body.style.overflow = isOverlayOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOverlayOpen]);

    // resize və initial check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 992);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // overlay bağlama funksiyası
    const handleOverlayClose = () => {
        setIsOverlayOpen(false);
        setResetHamburger(true); // hamburger-i bağla
        setTimeout(() => setResetHamburger(false), 0); // reset flag silinsin
    };

    return (
        <>
            {/* {!isOverlayOpen && (
                <div className={styles.toolbar}>
                    <marquee scrollamount="10" direction="left">
                        Welcome to Vendora! Big discounts available now — check our stores
                    </marquee>
                </div>
            )} */}

            <nav className={`${styles.navbar} ${isOverlayOpen ? styles.navbarDark : ""}`}>
                <div style={{ display: "flex" }}>
                    {!isMobile && <Hamburger onToggle={setIsOverlayOpen} reset={resetHamburger} />}

                    {/* Left menu */}
                    <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
                        <li><Link href="#">ABOUT</Link></li>
                        <li><Link href="#">STORES</Link></li>
                        <li className={styles.special}><Link href="#">SPECIAL PRICE</Link></li>
                    </ul>
                </div>

                {/* Logo */}
                <div className={styles.logo}>
                    <Link href="/">VENDORA</Link>
                </div>

                {/* Right menu */}
                <ul className={styles.rightLinks}>
                    {!isMobile && <li className={styles.childLinks}><Link href="#">LOGIN/REGISTRAZIONE</Link></li>}
                    {!isMobile && <li className={styles.childLinks}><Link href="#">SEARCH</Link></li>}
                    {!isMobile && <li className={styles.bag}><Link href="#">BAG<span>0</span></Link></li>}

                    {isMobile && (
                        <>
                            <li className={styles.userIcon}>
                                {!isOverlayOpen && (
                                    <button onClick={() => setIsLoginModal(true)}>👤</button>
                                )}
                            </li>
                            <p onClick={() => setIsSearchModal(true)}>🔍</p>
                            <li className={styles.bag}><Link href="#">BAG<span>0</span></Link></li>
                            <li className={styles.hamburgerWrapper}>
                                <Hamburger onToggle={setIsOverlayOpen} reset={resetHamburger} />
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            {/* Login Modal */}
            {isLoginModal && (
                <div className={styles.modalOverlay} onClick={() => setIsLoginModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>Login</h2>
                        <p>Burada login form olacaq</p>
                        <button onClick={() => setIsLoginModal(false)}>Close</button>
                    </div>
                </div>
            )}

            {isSearchModal && (
                <>
                    <div style={{ backgroundColor: "yellow" }}>Search</div>
                    <button onClick={() => setIsSearchModal(false)}>Close</button>
                </>
            )}

            {/* Overlay */}
            <div className={`${styles.overlay} ${isOverlayOpen ? styles.show : ""}`}>
                <ul>
                    <li><Link href="/category/woman" onClick={handleOverlayClose}><span> WOMAN</span></Link></li>
                    <li><Link href="/category/man" onClick={handleOverlayClose}><span>MAN</span></Link></li>
                    <li><Link href="/category/womanaccessories" onClick={handleOverlayClose}><span>WOMAN ACCESSORIES</span></Link></li>
                    <li><Link href="/category/manaccessories" onClick={handleOverlayClose}><span>MAN ACCESSORIES</span></Link></li>
                    <li><Link href="/category/brand" onClick={handleOverlayClose}><span>BRAND</span></Link></li>
                </ul>
            </div>
        </>
    );
}
