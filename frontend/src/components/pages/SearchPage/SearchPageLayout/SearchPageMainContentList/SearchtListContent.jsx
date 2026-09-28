import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'



//import css
import "./SearchtListContent.css";

//import pictures
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"
import Rating from '../../../../layouts/RatingComponent/Rating';

// how many results are shown at first / added by "Show more"
const PAGE_SIZE = 8;

const ROUTES = { movie: "/movie", tv: "/tvShow", person: "/person" };

const LABELS = { movie: "movies", tv: "TV shows", person: "actors" };

const SearchtListContent = ({ results, isSearching, searchValue, activeSearchBtn }) => {
    const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

    // new search -> start again from the first results
    useEffect(() => {
        setDisplayCount(PAGE_SIZE);
    }, [searchValue, activeSearchBtn]);

    const query = searchValue.trim();
    const remainingResults = results.length - displayCount;

    // nothing typed yet
    if (!query) {
        return (
            <div className="searchState">
                <div className="searchStateIcon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M2 9h20M7 4v5M12 4v5M17 4v5" />
                    </svg>
                </div>
                <p className="searchStateTitle">Start typing to search {LABELS[activeSearchBtn]}</p>
                <p className="searchStateText">Results show up while you type.</p>
            </div>
        );
    }

    // first results are loading
    if (isSearching && results.length === 0) {
        return (
            <main className='searchListContent' aria-hidden="true">
                {Array.from({ length: PAGE_SIZE }, (_, i) => (
                    <div key={i} className="searchResCard skeleton">
                        <div className="searchSkeletonPoster" />
                        <div className="searchSkeletonLine" />
                    </div>
                ))}
            </main>
        );
    }

    // No Results Message
    if (!isSearching && results.length === 0) {
        return (
            <div className="searchState">
                <div className="searchStateIcon empty">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5M8.5 8.5l5 5M13.5 8.5l-5 5" />
                    </svg>
                </div>
                <p className="searchStateTitle noResultsText">No results for “{query}”</p>
                <p className="searchStateText">Check the spelling or try another word.</p>
            </div>
        );
    }

    return (
        <section className='sectionSearchList'>
            <p className="searchResultsCount">
                <strong>{results.length}</strong> {LABELS[activeSearchBtn]} found for “{query}”
            </p>

            <main className={`searchListContent ${isSearching ? "updating" : ""}`}>
                {results.slice(0, displayCount).map((item, i) => {
                    const name = item.title || item.name;
                    const picture = item.poster_path || item.profile_path;
                    const year = (item.release_date || item.first_air_date)?.slice(0, 4);
                    const isPerson = activeSearchBtn === "person";
                    const knownFor = item.known_for?.map((k) => k.title || k.name).filter(Boolean).slice(0, 2).join(", ");

                    return (
                        // --i: cards come in one after another (also the ones added by "Show more")
                        <NavLink key={item.id} to={`${ROUTES[activeSearchBtn] || ""}/${item.id}`}
                            className={`searchResCard ${isPerson ? "person" : ""}`} style={{ "--i": i % PAGE_SIZE }}>
                            <div className="searchCardTop">
                                <img src={picture ? `https://image.tmdb.org/t/p/w342${picture}` : missingImg}
                                    alt={name} className="searchCardPoster" loading="lazy" />
                                {year && <span className="searchCardYear">{year}</span>}
                            </div>
                            <div className="searchCardBottom">
                                <h2 className='searchContentTitle'>{name}</h2>
                                {isPerson ? (
                                    <>
                                        {item.known_for_department && (
                                            <span className="searchCardDepartment">{item.known_for_department}</span>
                                        )}
                                        {knownFor && <p className="searchCardKnownFor">{knownFor}</p>}
                                    </>
                                ) : (
                                    item.vote_count > 0 && <div className="searchCardRating"><Rating movie={item} /></div>
                                )}
                            </div>
                        </NavLink>
                    );
                })}
            </main>

            {remainingResults > 0 && (
                <div className="loadMoreBtnContent">
                    <button type="button" className="searchShowMoreBtn"
                        onClick={() => setDisplayCount((prevCount) => prevCount + PAGE_SIZE)}>
                        Show more
                        <span className="searchShowMoreCount">{remainingResults} left</span>
                    </button>
                </div>
            )}
        </section>
    )
}

export default SearchtListContent
