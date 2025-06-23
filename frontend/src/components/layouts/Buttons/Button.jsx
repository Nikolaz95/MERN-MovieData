import React from 'react'

//import css
import './Button.css';

const Button = ({ onClick, children, variant, icon, active }) => {
    return (
        <button
            onClick={onClick}
            className={`button ${variant} ${active ? 'active' : 'notActive'}`}>
            {icon && <img src={icon} className="iconBtns" alt="icon" />}
            {children}
        </button>
    )
}

export default Button