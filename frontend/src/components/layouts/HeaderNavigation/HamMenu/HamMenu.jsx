import React from 'react'

//import css
import "./HamMenu.css";

const HamMenu = ({ toggleSideMenu, isSideMenuOpen }) => {
    return (
        <button type="button" onClick={toggleSideMenu}
            aria-label={isSideMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={!!isSideMenuOpen}
            className={`ham-menu ${isSideMenuOpen ? "active" : ""}`}>
            <span className="bar1"></span>
            <span className="bar2"></span>
            <span className="bar3"></span>
        </button>
    )
}

export default HamMenu
