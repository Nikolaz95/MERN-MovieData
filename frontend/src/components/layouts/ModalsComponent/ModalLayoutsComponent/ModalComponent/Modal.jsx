import React, { useEffect } from 'react'

//import css
import "./Modal.css";




//import components
import ModalOverlay from '../ModalOverlay/ModalOverlay';



const Modal = ({ children, isOpen, onClose, className }) => {
    // Close modal on `Esc` key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            // Prevent scrolling when modal is open
            document.body.style.overflow = "hidden";
        } else {
            // Restore scrolling when modal is closed
            document.body.style.overflow = "auto";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto"; // Clean up on unmount
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;


    return (
        <ModalOverlay onClose={onClose}>
            <div className={className} onClick={(e) => e.stopPropagation()}
            // Prevent closing modal when clicking inside content
            >
                {children}
            </div>
        </ModalOverlay>
    )
}

export default Modal