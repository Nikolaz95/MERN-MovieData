import React from 'react'

//import css
import "./SearchPageBtnOptions.css";

//import components
import Button from '../../../../../layouts/Buttons/Button';

const SearchPageBtnOptions = ({ handleActiveSearch, activeSearchBtn }) => {
    return (
        <div className="searchPageBtns">
            <Button variant="searchTypeBtn"
                active={activeSearchBtn === "movie"}
                onClick={() => handleActiveSearch('movie')}>
                <p>Search Movie</p>
            </Button>
            <Button variant="searchTypeBtn"
                active={activeSearchBtn === "tv"}
                onClick={() => handleActiveSearch('tv')}>
                <p>Search TvShows</p>
            </Button>
            <Button variant="searchTypeBtn"
                active={activeSearchBtn === "person"}
                onClick={() => handleActiveSearch('person')}>
                <p>Search Actors</p>
            </Button>
        </div>
    )
}

export default SearchPageBtnOptions