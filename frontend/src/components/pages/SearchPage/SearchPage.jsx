import React, { useRef, useState } from 'react'


//import pictures
import backGroundImg from '../../../assets/pictures/slikafilm.jpg';
//import components

import titleName from '../../hooks/useTitle';
import SearchPageLayout from './SearchPageLayout/SearchPageLayout';
import SearchPageTopContent from './SearchPageLayout/SearchPageTopContent/SearchPageTopContent';
import SearchtListContent from './SearchPageLayout/SearchPageMainContentList/SearchtListContent';
import BackGroudImg from '../../layouts/BackGroundContent/BackGroudImg/BackGroudImg';



const SearchPage = () => {
    titleName('Search Page');

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    console.log(searchResults);

    const [activeSearchBtn, setActiveSearchBtn] = useState("movie");

    const [isSearching, setIsSearching] = useState(false);

    return (
        <>
            <BackGroudImg image={backGroundImg} />
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
        </>
    )
}

export default SearchPage