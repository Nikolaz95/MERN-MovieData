import React from 'react'

//import css
import "./FilterCategory.css";

//import components
import Button from '../Buttons/Button';


const FilterCategory = ({ handleOpenDropDown, showDropdown, handleCategoryChange, options }) => {
    return (
        <>
            <section className='sectionFilterCategory'>
                <Button onClick={handleOpenDropDown} variant="categoryFilter">Category</Button>
                {showDropdown && (
                    <div className="dropDownCategory">
                        {options.map((option) => (
                            <option key={option.title} className='dropDownOption'
                                onClick={() => handleCategoryChange(option)} >
                                {option.filterName}
                            </option>
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}

export default FilterCategory