import React, { useEffect, useState } from 'react'

//import css
import "./Header.css";



// import  components
import Logo from '../Logo/Logo';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import HamMenu from '../HeaderNavigation/HamMenu/HamMenu';


const Header = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(null);
    // stronger background + shadow once the page is scrolled
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleSideMenu = (e) => {
        e?.stopPropagation?.();
        setIsSideMenuOpen((prevSideMenuOpen) => !prevSideMenuOpen);
    }

    const closeSideMenu = () => setIsSideMenuOpen(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // close side menu on `Esc`
    useEffect(() => {
        if (!isSideMenuOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeSideMenu();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isSideMenuOpen]);

    return (
        <header className={`siteHeader ${isScrolled ? "scrolled" : ""}`}>
            <section className="contentHeader">
                <Logo />
                <HeaderNavigation isSideMenuOpen={isSideMenuOpen} closeSideMenu={closeSideMenu} />
                <HamMenu toggleSideMenu={toggleSideMenu} isSideMenuOpen={isSideMenuOpen} />
            </section>

            {/* dark layer behind the mobile side menu - click closes the menu */}
            <div className={`sideMenuBackdrop ${isSideMenuOpen ? "show" : ""}`}
                onClick={closeSideMenu} />
        </header>
    )
}

export default Header
