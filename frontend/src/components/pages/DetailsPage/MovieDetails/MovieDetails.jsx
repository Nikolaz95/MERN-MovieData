import React from 'react'
import { useParams } from 'react-router-dom';

//import css
import "./MovieDetails.css";

//import components
import useFetch from '../../../hooks/useFetch';
import getApiUrl from '../../../hooks/getApiUrl';
import TitleName from '../../../hooks/TitleName/TitleName';

import MovieTvShowTopDetailsLayout from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsLayout';
import TopBackGroundPoster from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/TopBackGroundPoster/TopBackGroundPoster';
import MovieTvShowPosterLayout from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/Layout/MovieTvShowPosterLayout';
import PosterLeftSection from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/PosterLeftSection';
import PosterRightSection from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/PosterRightSection';
import OtherDetailsSectionLayouts from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/OtherDetailsSectionLayouts';
import Button from '../../../layouts/Buttons/Button';
import ReviewsSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/ReviewsSection/ReviewsSection';
import useScrollToTop from '../../../hooks/useScrollToTop';
import ScrollToTop from '../../../layouts/ScrollToTop/ScrollToTop';
import PicturesFromMovieSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/PicturesFromMovieSection/PicturesFromMovieSection';
import MoviesTvRecommendationsSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/MoviesTvRecommendationsSection/MoviesTvRecommendationsSection';
import MoviesTvActorsSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/MoviesTvActorsSection/MoviesTvActorsSection';



const MovieDetails = () => {
    const { isVisible } = useScrollToTop();
    /* fetch */
    const { id, slug, params } = useParams();
    const apiUrl = getApiUrl(`movie/${id}`);
    const { data, loading, error } = useFetch(apiUrl);
    console.log(data);
    return (
        <>
            <TitleName title={data?.original_title} />
            <section className="movieTvDetailsPageContent">
                {isVisible && <ScrollToTop />}
                {/* top background pic  */}
                <MovieTvShowTopDetailsLayout>
                    <TopBackGroundPoster data={data} />
                </MovieTvShowTopDetailsLayout>
                {/* top background pic  */}

                {/*Poster Details  */}
                <MovieTvShowPosterLayout>
                    <PosterLeftSection data={data} type="movie" />
                    <PosterRightSection data={data} type="movie" />
                </MovieTvShowPosterLayout>
                {/*Poster Details  */}

                <section className='movieTvOtherDetailsContent'>
                    <OtherDetailsSectionLayouts>
                        <ReviewsSection data={data} type="movie" />
                        <MoviesTvActorsSection id={id} type="movie" />
                        <PicturesFromMovieSection id={id} type="movie" />
                        <MoviesTvRecommendationsSection id={id} type="movie" />
                    </OtherDetailsSectionLayouts>
                </section>
            </section >
        </>
    )
}

export default MovieDetails