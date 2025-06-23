import React from 'react'
import { NavLink } from 'react-router-dom'

//import css
import "./Logo.css";


//import img
import Logoimg from "../../../assets/pictures/logo.gif"

const Logo = () => {
    return (
        <NavLink to="/" className="no-underline">
            <img src={Logoimg} className="logo" alt="Logo" />
        </NavLink>
    )
}

export default Logo
