import React from 'react'

//import css
import "./TrailerModal.css";

const TrailerModal = ({ trailer, title, onClose }) => {
    if (!trailer) {
        return null;
    }

    return (
        <div className="trailerModal" role="dialog" aria-label={`${title} trailer`}>
            <header className="trailerModalHeader">
                <h2 className="trailerModalTitle">{title} <span className="trailerModalType">{trailer.type}</span></h2>
                <button type="button" className="trailerModalClose" onClick={onClose} aria-label="Close">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            </header>

            {/* closing the modal removes the iframe, so the video stops */}
            <div className="trailerModalVideo">
                <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                    title={trailer.name}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen />
            </div>
        </div>
    )
}

export default TrailerModal
