import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


//import css
import "./HeaderNavigation.css";

//import icon
import Movies from "../../../assets/icons/icon-movies.png";
import TvShows from "../../../assets/icons/icon-tvs.png";
import SingIn from "../../../assets/icons/icon-login.png";
import SearchImg from "../../../assets/icons/icon-search.png";
import avatarDefault from "../../../assets/icons/avatar-profile.jpg";
import { useOutsideClick } from '../../hooks/useOutSideClick';
import { useGetMeQuery } from '../../../redux/api/userApi';
import { useSelector } from 'react-redux';
import { useLazyLogoutQuery } from '../../../redux/api/authApi';


// import  components


const HeaderNavigation = ({ isSideMenuOpen, closeSideMenu }) => {

    const navigate = useNavigate();
    const { isLoading } = useGetMeQuery();
    const [logout] = useLazyLogoutQuery();
    const { user } = useSelector((state) => state.auth);

    /* const [isLoggedIn, setIsLoggedIn] = useState(false); */
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isSideMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isSideMenuOpen]);

    const handleLogOut = async () => {
        try {
            await logout().unwrap();
            localStorage.removeItem('token');
            navigate("/", { replace: true }); // Replace in history
            window.location.reload(); // Force full reset if needed
        } catch (err) {
            toast.error(err?.data?.message || "Logout failed");
        }
    };


    // Toggle dropdown menu
    const handleDropdownToggle = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleNavLinkClick = () => {
        setIsDropdownOpen(false); // Close dropdown menu
        if (isSideMenuOpen) closeSideMenu(); // Close side menu if open
    };

    // Ref on the whole user item (button + dropdown) - click / tap outside closes the dropdown
    const dropdownRef = useOutsideClick(() => setIsDropdownOpen(false), isDropdownOpen);

    // close dropdown on `Esc`
    useEffect(() => {
        if (!isDropdownOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsDropdownOpen(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isDropdownOpen]);


    return (
        <nav className={`navigationSection ${isSideMenuOpen ? "active" : "close"}`}>
            <ul className="navigationList">
                <li className="navigationListItem">
                    <NavLink to="/moviesPage" className="navigationLink" onClick={handleNavLinkClick}>
                        <img src={Movies} alt="Movies" className="iconNavigation" />
                        <p className="textNavigation">Movies</p>
                    </NavLink>
                </li>
                <li className="navigationListItem">
                    <NavLink to="/tvShowsPage" className="navigationLink" onClick={handleNavLinkClick}>
                        <img src={TvShows} alt="TV Shows" className="iconNavigation" />
                        <p className="textNavigation">TV Shows</p>
                    </NavLink>
                </li>
                <li className="navigationListItem">
                    <NavLink to="/searchPage" className="navigationLink" onClick={handleNavLinkClick}>
                        <img src={SearchImg} alt="Search" className="iconNavigation" />
                        <p className="textNavigation">Search</p>
                    </NavLink>
                </li>
                {user ? (
                    <li className="navigationListItem userDropdownContainer" ref={dropdownRef}>
                        <div className="userIconWrapper navigationLink"
                            onClick={handleDropdownToggle}
                            role="button" tabIndex={0} aria-expanded={isDropdownOpen}
                            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), handleDropdownToggle())}
                        >
                            <img
                                src={
                                    user?.avatar ? user?.avatar?.url : avatarDefault
                                }
                                alt={user.name}
                                className="userIconLogIn"
                            />
                            <p className="textNavigation">{user.name}</p>
                        </div>
                        {isDropdownOpen && (
                            <ul className="dropdownMenu">
                                {user?.role === "admin" && (
                                    <li className="dropdownItem">
                                        <NavLink to="/admin/dashBoard" className="dropdownLink"
                                            onClick={handleNavLinkClick}>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                )}
                                <li className="dropdownItem">
                                    <NavLink to="/user/settings-Profile" onClick={handleNavLinkClick} className="dropdownLink">
                                        Profile
                                    </NavLink>
                                </li>
                                <li className="dropdownItem">
                                    <button className="dropdownLink logoutButton" to="/"
                                        onClick={handleLogOut}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                ) : (
                    !isLoading && (
                        <li className="navigationListItem">
                            <NavLink to="/signIn" className="navigationLink" onClick={handleNavLinkClick}>
                                <img src={SingIn} alt="Sign In" className="iconNavigation" />
                                <p className="textNavigation">
                                    Sign In
                                </p>
                            </NavLink>
                        </li>
                    )
                )}
            </ul>
        </nav>
    )
}

export default HeaderNavigation