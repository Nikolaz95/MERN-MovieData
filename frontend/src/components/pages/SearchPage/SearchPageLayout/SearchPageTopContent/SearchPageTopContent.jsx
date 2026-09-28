import React, { useEffect } from 'react'


//import css
import "./SearchPageTopContent.css";


//import components
import SearchPageBtnOptions from './SearchPageBtnOptions/SearchPageBtnOptions';
import getApiUrl from '../../../../hooks/getApiUrl';
import SearchPageInputSearch from './SearchPageInputSearch/SearchPageInputSearch';

// wait until the user stops typing before calling TMDB
const SEARCH_DELAY_MS = 350;

const SearchPageTopContent = ({ setSearchResults, searchValue, setSearchValue, isSearching, setIsSearching, activeSearchBtn, setActiveSearchBtn }) => {



    /* fetch  */
    useEffect(() => {
        const query = searchValue.trim();
        if (!query) {
            setSearchResults([]); // Clear results if search is empty
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        // abort: an older, slower response can't overwrite the results of a newer search
        const controller = new AbortController();

        const timer = setTimeout(async () => {
            const apiUrl = getApiUrl(`search/${activeSearchBtn}`, `&query=${encodeURIComponent(query)}`);
            try {
                const response = await fetch(apiUrl, { signal: controller.signal });
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.results || []);
                } else {
                    console.error('Error fetching data from TMDB API:', response.statusText);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error('Error fetching data from TMDB API: ', error);
                }
            } finally {
                if (!controller.signal.aborted) setIsSearching(false);
            }
        }, SEARCH_DELAY_MS);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [searchValue, activeSearchBtn, setSearchResults, setIsSearching]);


    const handleActiveSearch = (activeSearch) => {
        setActiveSearchBtn(activeSearch);
        setSearchValue(''); // Clear the input field
        setSearchResults([]); // Clear search results
    };


    return (
        <section className='sectionSearchPageTopContent'>
            <div className="searchHero">
                <h1 className="searchHeroTitle">Search</h1>
                <p className="searchHeroSubtitle">Find movies, TV shows and actors</p>
            </div>
            <SearchPageBtnOptions
                activeSearchBtn={activeSearchBtn}
                handleActiveSearch={handleActiveSearch} />
            <SearchPageInputSearch
                activeSearchBtn={activeSearchBtn}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                isSearching={isSearching} />
        </section>
    )
}

export default SearchPageTopContent
