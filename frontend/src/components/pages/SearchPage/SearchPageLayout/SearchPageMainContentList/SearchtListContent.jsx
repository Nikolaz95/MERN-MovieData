import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'



//import css
import "./SearchtListContent.css";

//import pictures
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"
import Button from '../../../../layouts/Buttons/Button';


const SearchtListContent = ({ results, isSearching, searchValue, activeSearchBtn }) => {
    const [displayCount, setDisplayCount] = useState(8);

    const loadMoreSearchResultat = () => {
        setDisplayCount(prevCount => prevCount + 4); // increase display limit by 3
    };
    // Calculate remaining results to be shown
    const remainingResults = results.length - displayCount;

    const route = results.map(item => ({
        id: item.id,
        path:
            activeSearchBtn === 'movie' ? `/movie/${item.id}` :
                activeSearchBtn === 'tv' ? `/tvShow/${item.id}` :
                    activeSearchBtn === 'person' ? `/person/${item.id}` :
                        '/'
    }));

    return (
        <>
            <section className='sectionSearchList'>
                {/* No Results Message */}
                {!isSearching && results.length === 0 && searchValue.trim() !== "" && (
                    <p className="noResultsText">No results found.</p>
                )}
                <main className='searchListContent'>

                    {results.slice(0, displayCount).map((item) => (
                        <div key={item.id} className="searchResCard">
                            <div className="searchCardTop">
                                <NavLink to={route.find(r => r.id === item.id)?.path || '/'}>
                                    <img src={item.poster_path || item.profile_path ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}` : missingImg} alt={item.title || item.name} className="searchCardPoster" />
                                </NavLink>
                            </div>
                            <div className="searchCardBottom">
                                <h1 className='searchContentTitle'>{item.title || item.name}</h1>
                            </div>
                        </div>
                    ))}
                </main>
            </section>

            {results.length > displayCount && remainingResults > 0 && (
                <div className="loadMoreBtnContent">
                    <Button variant="loadMore" onClick={loadMoreSearchResultat}>
                        Load 4 More of {remainingResults}
                    </Button>
                </div>
            )}
        </>
    )
}

export default SearchtListContent