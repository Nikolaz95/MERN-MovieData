import React from 'react'


//import css
import "./SearchPageLayout.css";

const SearchPageLayout = ({ children }) => {
    return (
        <section className='sectionSearchPage'>
            {children}
        </section>
    )
}

export default SearchPageLayout