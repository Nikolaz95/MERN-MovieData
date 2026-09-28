import React, { useEffect, useRef, useState } from 'react'

//import css
import "./Modal.css";




//import components
import ModalOverlay from '../ModalOverlay/ModalOverlay';


// must match animation duration in Modal.css / ModalOverlay.css
const CLOSE_ANIMATION_MS = 200;

const Modal = ({ children, isOpen, onClose, className }) => {
    // keep modal rendered after isOpen=false so the close animation can play
    const [isMounted, setIsMounted] = useState(isOpen);
    // closeModal clears modalData right away, so show the last content while closing
    const lastChildren = useRef(children);
    if (isOpen) lastChildren.current = children;

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            return;
        }
        const timer = setTimeout(() => setIsMounted(false), CLOSE_ANIMATION_MS);
        return () => clearTimeout(timer);
    }, [isOpen]);

    // Close modal on `Esc` key press
    useEffect(() => {
        // GlobalModals renders all modals at once, so closed modals must not touch body scroll
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        // Prevent scrolling when modal is open
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto"; // Restore scrolling when modal is closed
        };
    }, [isOpen, onClose]);

    if (!isOpen && !isMounted) return null;

    const isClosing = !isOpen;

    return (
        <ModalOverlay onClose={onClose} isClosing={isClosing}>
            <div className={`modalBox ${className ?? ""}`} onClick={(e) => e.stopPropagation()}
            // Prevent closing modal when clicking inside content
            >
                {isOpen ? children : lastChildren.current}
            </div>
        </ModalOverlay>
    )
}

export default Modal
