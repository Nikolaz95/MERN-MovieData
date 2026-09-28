import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useLazyLogoutQuery } from '../../../../../../redux/api/authApi';
import toast from 'react-hot-toast';

//import css
import "./Sidebar.css"

//import data
import dataSideBarContent from "../../Layouts/SideBar/SidebarData";


//import images
import avatarDefault from "../../../../../../assets/pictures/avatar-profile.jpg"
import LogOut from "../../../../../../assets/icons/icon-logout2.png"


// desktop: collapsed (icons only) is remembered in this browser
const COLLAPSED_STORAGE_KEY = "dashSidebarCollapsed";

const loadCollapsed = () => {
    try {
        return localStorage.getItem(COLLAPSED_STORAGE_KEY) === "true";
    } catch {
        return false;
    }
};


// isMobileOpen / onCloseMobile: phones - the sidebar is a drawer opened from DashBoardLayout
const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const [logout] = useLazyLogoutQuery();
    const [isCollapsed, setIsCollapsed] = useState(loadCollapsed);

    // close the phone drawer after going to another page
    useEffect(() => {
        onCloseMobile?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const toggleCollapsed = () => {
        setIsCollapsed((prev) => {
            try {
                localStorage.setItem(COLLAPSED_STORAGE_KEY, String(!prev));
            } catch {
                // storage blocked - just not remembered
            }
            return !prev;
        });
    };

    const filteredSidebarData = dataSideBarContent.filter(item => {
        // If no roles specified, show to everyone
        if (!item.roles) return true;
        // Otherwise check if user's role is included
        return item.roles.includes(user?.role);
    });


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


    return (
        <aside className={`dashSidebar ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "mobileOpen" : ""}`}
            aria-label="Dashboard menu">

            {/* user card */}
            <div className="dashSidebarProfile">
                <img src={user?.avatar?.url || avatarDefault} alt="" className="dashSidebarAvatar" />
                <div className="dashSidebarProfileText">
                    <p className="dashSidebarName">{user?.name}</p>
                    <span className={`dashRoleBadge ${user?.role === "admin" ? "admin" : ""}`}>
                        {user?.role === "admin" ? "Admin" : "User"}
                    </span>
                </div>
            </div>

            {/* links, grouped */}
            <nav className='dashSidebarNav'>
                {filteredSidebarData.map((group) => (
                    <div key={group.id} className="dashNavGroup">
                        <p className="dashNavGroupTitle">{group.titleName}</p>
                        <ul className="dashNavList">
                            {group.dropDownList?.map((item) => (
                                <li key={item.path}>
                                    <NavLink to={item.path} className="dashNavLink"
                                        title={isCollapsed ? item.title : undefined}>
                                        <img src={item.icon} alt="" className="dashNavIcon" />
                                        <span className="dashNavText">{item.title}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>

            <div className="dashSidebarFooter">
                <button type="button" className="dashNavLink dashLogout" onClick={handleLogOut}
                    title={isCollapsed ? "Log Out" : undefined}>
                    <img src={LogOut} alt="" className="dashNavIcon" />
                    <span className="dashNavText">Log Out</span>
                </button>

                <button type="button" className="dashCollapseBtn" onClick={toggleCollapsed}
                    aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
                    title={isCollapsed ? "Expand menu" : "Collapse menu"}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
