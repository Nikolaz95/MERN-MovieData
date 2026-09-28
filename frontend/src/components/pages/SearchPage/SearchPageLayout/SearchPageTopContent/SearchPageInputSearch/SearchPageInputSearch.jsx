import React, { useEffect, useRef } from 'react'


//import css
import "./SearchPageInputSearch.css";


const PLACEHOLDERS = {
    movie: "Search for a movie...",
    tv: "Search for a TV show...",
    person: "Search for an actor...",
};

// search field: icon, spinner while searching, X to clear
const SearchPageInputSearch = ({ activeSearchBtn, setSearchValue, searchValue, isSearching }) => {
    const inputRef = useRef(null);

    // focus the field on page load and when switching Movies / TV Shows / Actors
    useEffect(() => {
        inputRef.current?.focus();
    }, [activeSearchBtn]);

    const clearSearch = () => {
        setSearchValue('');
        inputRef.current?.focus();
    };

    return (
        <div className="searchInputForm">
            <svg className="searchInputIcon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
            </svg>
            <input
                ref={inputRef}
                type="search"
                placeholder={PLACEHOLDERS[activeSearchBtn] || "Search"}
                aria-label={PLACEHOLDERS[activeSearchBtn] || "Search"}
                className="searchInputType"
                value={searchValue}
                onKeyDown={(e) => e.key === "Escape" && clearSearch()}
                onChange={(e) => setSearchValue(e.target.value)} />

            <div className="searchInputActions">
                {isSearching && <span className="searchSpinner" aria-label="Searching" />}
                {searchValue && (
                    <button type="button" className="searchClearBtn" onClick={clearSearch} aria-label="Clear search">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchPageInputSearch
