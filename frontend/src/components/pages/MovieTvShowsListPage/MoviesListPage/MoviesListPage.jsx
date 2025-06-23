import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


//import  icon
import backGroundImg from '../../../../assets/pictures/slikafilm.jpg';

//import components
import titleName from '../../../hooks/useTitle';
import useFetch from '../../../hooks/useFetch';
import getApiUrl from '../../../hooks/getApiUrl';
import TopContent from '../MovieTvShowsListPageLayouts/TopContent/TopContent';
import MovieTvShowsListContent from '../MovieTvShowsListPageLayouts/MovieTvShowsListContent/MovieTvShowsListContent';
import BackGroudImg from '../../../layouts/BackGroundContent/BackGroudImg/BackGroudImg';


const movieOptions = [
    { filterName: "Theatres movies", title: "Now Playing in Theater", apiKey: "now_playing" },
    { filterName: "Upcoming movies", title: "Upcoming Movies", apiKey: "upcoming" },
    { filterName: "Top Rated movies", title: "Top Rated Movies", apiKey: "top_rated" },
];

const MoviesListPage = () => {
    const location = useLocation();

    // Get the 'category' query parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const initialCategory = searchParams.get('category') || movieOptions[0].apiKey;

    const [activeContent, setActiveContent] = useState(initialCategory);
    const [categoryTitle, setCategoryTitle] = useState(
        movieOptions.find(option => option.apiKey === initialCategory)?.title || movieOptions[0].title
    );

    const [apiUrl, setApiUrl] = useState(getApiUrl(`movie/${initialCategory}`));

    useEffect(() => {
        // Update API URL dynamically based on activeContent
        setApiUrl(getApiUrl(`movie/${activeContent}`));

        // Update the category title
        const selectedOption = movieOptions.find(option => option.apiKey === activeContent);
        setCategoryTitle(selectedOption?.title || movieOptions[0].title);
    }, [activeContent]);

    const { data: movies, loading, error } = useFetch(apiUrl);
    console.log(movies);


    const handleCategoryChange = (selectedOption) => {
        setActiveContent(selectedOption.apiKey);
    };


    titleName('Movies List Page');
    return (
        <>
            <BackGroudImg image={backGroundImg} />
            <TopContent
                initialTitle={categoryTitle}
                options={movieOptions}
                onCategoryChange={handleCategoryChange}
            />

            <MovieTvShowsListContent
                items={movies?.results}
                loading={loading}
                error={error}
                titleKey="title"
                dateKey="release_date"
                type="movie" />
        </>
    )
}

export default MoviesListPage