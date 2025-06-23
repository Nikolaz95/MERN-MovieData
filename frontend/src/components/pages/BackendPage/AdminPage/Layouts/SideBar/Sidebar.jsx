import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useLazyLogoutQuery } from '../../../../../../redux/api/authApi';
import toast from 'react-hot-toast';

//import css
import "./Sidebar.css"

//import data
import dataSideBarContent from "../../Layouts/SideBar/SidebarData";


//import images
import openMenu from "../../../../../../assets/icons/icon-open-button.png"
import avatarDefault from "../../../../../../assets/pictures/avatar-profile.jpg"
import LogOut from "../../../../../../assets/icons/icon-logout2.png"

//import components
import Image from '../../../../../layouts/ImagesContent/Image'
import Button from '../../../../../layouts/Buttons/Button';



const Sidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [curOpenDropdown, setCurOpenDropdown] = useState(null);
    const [logout] = useLazyLogoutQuery();

    const handleToggle = (id) => {
        setCurOpenDropdown(curOpenDropdown === id ? null : id);
    };


    const [sideIsOpen, setSideIsOpen] = useState(false);

    // Toggle function to open/close the sidebar
    const toggleSidebar = () => {
        setSideIsOpen(!sideIsOpen);
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
        <aside className={`dashBoardSideBarSection ${sideIsOpen ? 'open' : 'closed'}`}>
            <nav className='dashBoardSideBNav'>
                <div className="sideNavBarTop">
                    <Button variant="openBtn">
                        <Image src={openMenu} variant="iconImg" onClick={toggleSidebar} />
                    </Button>
                    <Image src={user?.avatar ? user?.avatar?.url : avatarDefault}
                        variant="userProfileImgDashBoard" />
                    {user?.name}
                </div>
                <div className="sideNavMainContent">
                    {filteredSidebarData.map((sidebar) => (
                        <div key={sidebar.id} className={sideIsOpen ? 'active' : 'close'}>
                            <div className="sideNavLink"
                                onClick={() => handleToggle(sidebar.id)}>
                                <Image src={sidebar.icon} variant="iconSideNavLink" />
                                {sideIsOpen && <span className="navText">{sidebar.titleName}</span>}
                            </div>
                            {curOpenDropdown === sidebar.id && (
                                <div className={`dashBoardDropdownSideBar ${sideIsOpen ? 'open' : 'closed'}`}>
                                    <ul>
                                        {sidebar.dropDownList?.map((dropdownItem) => (
                                            <li key={dropdownItem.title}>
                                                <NavLink to={dropdownItem.path}>
                                                    <Image src={dropdownItem.icon} variant="iconDropDown" />
                                                    {sideIsOpen && <span>{dropdownItem.title}</span>}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className='sideNavLinklogOut'>
                        <Button variant="logOutBtn" onClick={handleLogOut}>
                            <Image src={LogOut} variant="iconLogOut" />
                            {sideIsOpen && <span className="navText">Log Out</span>}
                        </Button>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar