import React from 'react'

//import css
import "./SearchPageBtnOptions.css";

//import icons (same as in the header)
import MoviesIcon from "../../../../../../assets/icons/icon-movies.png";
import TvShowsIcon from "../../../../../../assets/icons/icon-tvs.png";
import ActorsIcon from "../../../../../../assets/icons/icons-actor.png";

const SEARCH_TYPES = [
    { key: "movie", label: "Movies", icon: MoviesIcon },
    { key: "tv", label: "TV Shows", icon: TvShowsIcon },
    { key: "person", label: "Actors", icon: ActorsIcon },
];

// segmented tabs - the white pill slides to the active tab
const SearchPageBtnOptions = ({ handleActiveSearch, activeSearchBtn }) => {
    const activeIndex = Math.max(0, SEARCH_TYPES.findIndex((t) => t.key === activeSearchBtn));

    return (
        <div className="searchPageBtns" role="tablist" aria-label="What to search"
            style={{ "--active": activeIndex, "--count": SEARCH_TYPES.length }}>
            <span className="searchTabIndicator" aria-hidden="true" />
            {SEARCH_TYPES.map((type) => (
                <button key={type.key} type="button" role="tab"
                    aria-selected={activeSearchBtn === type.key}
                    className={`searchTab ${activeSearchBtn === type.key ? "active" : ""}`}
                    onClick={() => handleActiveSearch(type.key)}>
                    <img src={type.icon} alt="" className="searchTabIcon" />
                    <span>{type.label}</span>
                </button>
            ))}
        </div>
    )
}

export default SearchPageBtnOptions
