import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';




import titleName from '../../../hooks/useTitle';
import useFetch from '../../../hooks/useFetch';
import getApiUrl from '../../../hooks/getApiUrl';
import TopContent from '../MovieTvShowsListPageLayouts/TopContent/TopContent';
import MovieTvShowsListContent from '../MovieTvShowsListPageLayouts/MovieTvShowsListContent/MovieTvShowsListContent';


const tvOptions = [
    { filterName: "On the air", title: "On The Air Next 7 Days", apiKey: "on_the_air" },
    { filterName: "Popular", title: "TV Shows Popularity", apiKey: "popular" },
    { filterName: "Top Rated tv", title: "Top Rated TV Shows", apiKey: "top_rated" },
];

const TvShowsListsPage = () => {

    const location = useLocation();

    // Get the 'category' query parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const initialCategory = searchParams.get('category') || tvOptions[0].apiKey;

    const [activeContent, setActiveContent] = useState(initialCategory);
    const [categoryTitle, setCategoryTitle] = useState(
        tvOptions.find(option => option.apiKey === initialCategory)?.title || tvOptions[0].title
    );

    const [apiUrl, setApiUrl] = useState(getApiUrl(`tv/${initialCategory}`));

    useEffect(() => {
        // Update API URL dynamically based on activeContent
        setApiUrl(getApiUrl(`tv/${activeContent}`));

        // Update the category title
        const selectedOption = tvOptions.find(option => option.apiKey === activeContent);
        setCategoryTitle(selectedOption?.title || tvOptions[0].title);
    }, [activeContent]);

    const { data: tvShows, loading, error } = useFetch(apiUrl);

    const handleCategoryChange = (selectedOption) => {
        setActiveContent(selectedOption.apiKey);
    };


    titleName('TvShows List Page');
    return (
        <div className='movieTvListPage'>
            <TopContent
                initialTitle={categoryTitle}
                options={tvOptions}
                onCategoryChange={handleCategoryChange}
            />
            <MovieTvShowsListContent
                items={tvShows?.results}
                loading={loading}
                error={error}
                titleKey="name"
                dateKey="first_air_date"
                type="tv" />
        </div>
    )
}

export default TvShowsListsPage