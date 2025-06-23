import React from 'react'


//import css
import "./SearchPageInputSearch.css";


//import components

const SearchPageInputSearch = ({ activeSearchBtn, setSearchValue, searchValue }) => {
    let placeholderText;

    switch (activeSearchBtn) {
        case "movie":
            placeholderText = "Search Movie...";
            break;
        case "tv":
            placeholderText = "Search Tv Shows...";
            break;
        case "person":
            placeholderText = "Search for the Actor...";
            break;
        default:
            placeholderText = "Search";
            break;
    }

    return (
        <div className="searchInputForm">
            <input
                type="text"
                placeholder={placeholderText}
                className="searchInputType"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} />
        </div>
    )
}

export default SearchPageInputSearch