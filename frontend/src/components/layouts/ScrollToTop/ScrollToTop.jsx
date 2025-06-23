import React from 'react'

//import css
import "./ScrollToTop.css"
//import icon
import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Add smooth scrolling behavior
        });
    };
    return (
        <button className='btn-scrTop' onClick={handleClick}>
            <div className="content-scrTop">
                <p>Scroll to Top <FaArrowAltCircleUp className='icon-scrTop' /></p>
            </div>
        </button>
    )
}

export default ScrollToTop