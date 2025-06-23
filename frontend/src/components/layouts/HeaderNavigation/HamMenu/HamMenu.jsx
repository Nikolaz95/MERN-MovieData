import React from 'react'

//import css
import "./HamMenu.css";

const HamMenu = ({ toggleSideMenu, isSideMenuOpen }) => {
    return (
        <div onClick={toggleSideMenu} className={`ham-menu ${isSideMenuOpen === true ? "active" : null} ${isSideMenuOpen === false ? "close" : null}`}>
            <span className="bar1"></span>
            <span className="bar2"></span>
            <span className="bar3"></span>
        </div>
    )
}

export default HamMenu