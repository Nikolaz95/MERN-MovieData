import React from 'react'

//import css
import "./OtherDetailsSectionLayouts.css";

const OtherDetailsSectionLayouts = ({ children }) => {
    return (
        <section className="otherMovieTvDetailsSection">
            {children}
        </section>
    )
}

export default OtherDetailsSectionLayouts