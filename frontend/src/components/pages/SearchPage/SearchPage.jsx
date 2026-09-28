import React, { useState } from 'react'


//import components

import titleName from '../../hooks/useTitle';
import SearchPageLayout from './SearchPageLayout/SearchPageLayout';
import SearchPageTopContent from './SearchPageLayout/SearchPageTopContent/SearchPageTopContent';
import SearchtListContent from './SearchPageLayout/SearchPageMainContentList/SearchtListContent';



const SearchPage = () => {
    titleName('Search Page');

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [activeSearchBtn, setActiveSearchBtn] = useState("movie");

    const [isSearching, setIsSearching] = useState(false);

    return (
        <SearchPageLayout>
            <SearchPageTopContent
                setSearchResults={setSearchResults}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                setIsSearching={setIsSearching}
                isSearching={isSearching}
                activeSearchBtn={activeSearchBtn}
                setActiveSearchBtn={setActiveSearchBtn} />
            <SearchtListContent
                isSearching={isSearching}
                results={searchResults}
                searchValue={searchValue}
                activeSearchBtn={activeSearchBtn} />
        </SearchPageLayout>
    )
}

export default SearchPage
