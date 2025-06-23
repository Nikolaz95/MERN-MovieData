import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

//import css
import "./Header.css";



// import  components
import Logo from '../Logo/Logo';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import HamMenu from '../HeaderNavigation/HamMenu/HamMenu';


const Header = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const toggleSideMenu = (e) => {
        e.stopPropagation();
        setIsSideMenuOpen((prevSideMenuOpen) => !prevSideMenuOpen);
    }
    return (
        <header>
            <section className="contentHeader">
                <Logo />
                <HeaderNavigation isSideMenuOpen={isSideMenuOpen} toggleSideMenu={toggleSideMenu} />
                <HamMenu toggleSideMenu={toggleSideMenu} isSideMenuOpen={isSideMenuOpen} />
            </section>

        </header>
    )
}

export default Header