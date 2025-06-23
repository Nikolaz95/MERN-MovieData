import React from 'react'

//import css
import "./BackGroudImg.css";

const BackGroudImg = ({ image }) => {
    return (
        <div className="bgPictureContent" >
            <img className="bgPicture" src={image} alt="Background" />
        </div>
    )
}

export default BackGroudImg