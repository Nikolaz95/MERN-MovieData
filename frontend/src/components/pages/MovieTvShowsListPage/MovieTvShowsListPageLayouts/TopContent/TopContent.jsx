import React, { useState } from 'react'

//import css
import "./TopContent.css";

//import components
import FilterCategory from '../../../../layouts/FilterCategory/FilterCategory';

const TopContent = ({ initialTitle, options, onCategoryChange }) => {

    const [title, setTitle] = useState(initialTitle);

    const handleCategoryChange = (selectedOption) => {
        setTitle(selectedOption.title);
        onCategoryChange(selectedOption);
    };

    return (
        <section className='sectionOverMovieTvShows'>
            <div className='overMovieTvShowsContent'>
                {/* key: title animates in again when the category changes */}
                <h1 className='categoryTitleName' key={title}>{title}</h1>
                <FilterCategory
                    options={options}
                    activeTitle={title}
                    handleCategoryChange={handleCategoryChange} />
            </div>
        </section>
    )
}

export default TopContent
