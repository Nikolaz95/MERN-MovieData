import React from 'react'
import ReactDOM from "react-dom";


//import css
import "./ModalOverlay.css";

const ModalOverlay = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <div className="modalOverlay" onClick={onClose}>
            {children}
        </div>,
        document.body
    );
}

export default ModalOverlay