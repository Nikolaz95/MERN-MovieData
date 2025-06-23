import React, { useEffect, useState } from 'react'


//import css
import "./SearchPageTopContent.css";


//import components
import SearchPageBtnOptions from './SearchPageBtnOptions/SearchPageBtnOptions';
import getApiUrl from '../../../../hooks/getApiUrl';
import useFetch from '../../../../hooks/useFetch';
import SearchPageInputSearch from './SearchPageInputSearch/SearchPageInputSearch';

const SearchPageTopContent = ({ setSearchResults, searchValue, setSearchValue, handleInputFocus, isSearching, setIsSearching, activeSearchBtn, setActiveSearchBtn }) => {



    /* fetch  */
    useEffect(() => {
        const searchMovies = async () => {
            if (!searchValue.trim()) {
                setSearchResults([]); // Clear results if search is empty
                return;
            }

            setIsSearching(true);
            const apiUrl = getApiUrl(`search/${activeSearchBtn}`, `&query=${searchValue}`);
            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.results);

                } else {
                    console.error('Error fetching data from TMDB API:', response.statusText);
                }

            } catch (error) {
                console.error('Error fetching data from TMDB API: ', error);
            }
            finally {
                setIsSearching(false);
            }
        };
        searchMovies();
    }, [searchValue, activeSearchBtn]);


    const handleActiveSearch = (activeSearch) => {
        setActiveSearchBtn(activeSearch);
        setSearchValue(''); // Clear the input field when clicking outside
        setSearchResults([]); // Clear search results
    };


    return (
        <section className='sectionSearchPageTopContent'>
            <SearchPageBtnOptions
                activeSearchBtn={activeSearchBtn}
                handleActiveSearch={handleActiveSearch}
                handleInputFocus={handleInputFocus} />
            <SearchPageInputSearch
                activeSearchBtn={activeSearchBtn}
                setSearchValue={setSearchValue}
                searchValue={searchValue} />
        </section>
    )
}

export default SearchPageTopContent