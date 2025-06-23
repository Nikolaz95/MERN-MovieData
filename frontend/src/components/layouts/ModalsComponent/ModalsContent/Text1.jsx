import React from 'react'

//import css
import "./Text1.css";

import closeBtn from "../../../../assets/icons/icon-cancelPic.png"

const Text1 = ({ onClose }) => {
    return (
        <div className="modallContent">
            <button className="closebtnss" onClick={onClose}>
                <img src={closeBtn} width={20} height={20} alt="" />
            </button>
            <h1>Text1</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, perferendis ab! Sed, provident id. Ratione nemo rem iusto placeat consectetur officiis, quasi perferendis dignissimos, dolorum nisi dolor iste deleniti tenetur?</p>
        </div>
    )
}

export default Text1