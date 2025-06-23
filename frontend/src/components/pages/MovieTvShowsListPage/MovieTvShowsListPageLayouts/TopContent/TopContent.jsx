import React, { useState } from 'react'

//import css
import "./TopContent.css";

//import components
import FilterCategory from '../../../../layouts/FilterCategory/FilterCategory';

const TopContent = ({ initialTitle, options, onCategoryChange }) => {

    const [title, setTitle] = useState(initialTitle);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleOpenDropDown = () => {
        setShowDropdown(!showDropdown)
    }

    const handleCategoryChange = (selectedOption) => {
        setTitle(selectedOption.title);
        onCategoryChange(selectedOption);
        setShowDropdown(false);
    };

    return (
        <>
            <section className='sectionOverMovieTvShows'>
                <div className='overMovieTvShowsContent'>
                    <h1 className='categoryTitleName'>{title} :</h1>
                    <FilterCategory
                        options={options}
                        handleOpenDropDown={handleOpenDropDown}
                        handleCategoryChange={handleCategoryChange}
                        showDropdown={showDropdown} />
                </div>
            </section>
        </>
    )
}

export default TopContent