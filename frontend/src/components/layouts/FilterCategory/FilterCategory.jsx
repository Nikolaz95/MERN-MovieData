import React, { useEffect, useState } from 'react'

//import css
import "./FilterCategory.css";

//import components
import { useOutsideClick } from '../../hooks/useOutSideClick';


// category dropdown - closes on click outside, Esc, or after choosing
const FilterCategory = ({ options, activeTitle, handleCategoryChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useOutsideClick(() => setIsOpen(false), isOpen);

    const activeOption = options.find((option) => option.title === activeTitle);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const selectOption = (option) => {
        handleCategoryChange(option);
        setIsOpen(false);
    };

    return (
        <section className='sectionFilterCategory' ref={dropdownRef}>
            <button type="button" className="categoryFilterButton"
                aria-haspopup="menu" aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 5h18M6 12h12M10 19h4" />
                </svg>
                <span className="categoryFilterLabel">{activeOption?.filterName || "Category"}</span>
                <svg className={`categoryFilterChevron ${isOpen ? "rotated" : ""}`} width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <ul className="dropDownCategory" role="menu">
                    {options.map((option) => {
                        const isActive = option.title === activeTitle;
                        return (
                            <li key={option.title} role="none">
                                <button type="button" role="menuitemradio" aria-checked={isActive}
                                    className={`dropDownOption ${isActive ? "active" : ""}`}
                                    onClick={() => selectOption(option)}>
                                    <span>{option.filterName}</span>
                                    {isActive && (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    )
}

export default FilterCategory
