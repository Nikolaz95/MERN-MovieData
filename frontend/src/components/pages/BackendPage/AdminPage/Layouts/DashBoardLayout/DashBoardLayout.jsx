import React, { useEffect, useState } from 'react'
import Sidebar from '../SideBar/Sidebar'

//import css
import "./DashBoardLayout.css";


const DashBoardLayout = ({ children }) => {
    // phones: sidebar is a drawer
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // while the drawer is open: page behind it can't scroll, `Esc` closes it
    useEffect(() => {
        if (!isMobileOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsMobileOpen(false);
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMobileOpen]);

    return (
        <section className="dashLayout">
            <Sidebar isMobileOpen={isMobileOpen} onCloseMobile={() => setIsMobileOpen(false)} />

            {/* dark layer behind the phone drawer - click closes it */}
            <div className={`dashBackdrop ${isMobileOpen ? "show" : ""}`}
                onClick={() => setIsMobileOpen(false)} />

            <main className="dashContent">
                <button type="button" className="dashMobileMenuBtn" onClick={() => setIsMobileOpen(true)}
                    aria-label="Open dashboard menu">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" aria-hidden="true">
                        <path d="M4 6h16M4 12h16M4 18h10" />
                    </svg>
                    Menu
                </button>
                {children}
            </main>
        </section>
    )
}

export default DashBoardLayout
