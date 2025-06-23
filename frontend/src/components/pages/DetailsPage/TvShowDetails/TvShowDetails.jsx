import React from 'react'
import { useParams } from 'react-router-dom';


//import css
import "./TvShowDetails.css";
//import components
import getApiUrl from '../../../hooks/getApiUrl';
import useFetch from '../../../hooks/useFetch';
import TitleName from '../../../hooks/TitleName/TitleName';
import MovieTvShowTopDetailsLayout from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsLayout';
import TopBackGroundPoster from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/TopBackGroundPoster/TopBackGroundPoster';
import MovieTvShowPosterLayout from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/Layout/MovieTvShowPosterLayout';
import PosterLeftSection from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/PosterLeftSection';
import PosterRightSection from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/PosterRightSection';
import OtherDetailsSectionLayouts from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/OtherDetailsSectionLayouts';
import ReviewsSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/ReviewsSection/ReviewsSection';
import MoviesTvActorsSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/MoviesTvActorsSection/MoviesTvActorsSection';
import PicturesFromMovieSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/PicturesFromMovieSection/PicturesFromMovieSection';
import MoviesTvRecommendationsSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/MoviesTvRecommendationsSection/MoviesTvRecommendationsSection';
import useScrollToTop from '../../../hooks/useScrollToTop';
import ScrollToTop from '../../../layouts/ScrollToTop/ScrollToTop';


const TvShowDetails = () => {
    const { isVisible } = useScrollToTop();
    /* fetch */
    const { id, slug, params } = useParams();
    const apiUrl = getApiUrl(`tv/${id}`);
    const { data, loading, error } = useFetch(apiUrl);
    console.log(data);
    console.log(data.name);
    return (
        <>
            <TitleName title={data?.original_name} />
            <section className="movieTvDetailsPageContent">
                {isVisible && <ScrollToTop />}
                {/* top background pic  */}
                <MovieTvShowTopDetailsLayout>
                    <TopBackGroundPoster data={data} />
                </MovieTvShowTopDetailsLayout>
                {/* top background pic  */}

                {/*Poster Details  */}
                <MovieTvShowPosterLayout>
                    <PosterLeftSection data={data} type="tv" />
                    <PosterRightSection data={data} type="tv" />
                </MovieTvShowPosterLayout>
                {/*Poster Details  */}

                <section className='movieTvOtherDetailsContent'>
                    <OtherDetailsSectionLayouts>
                        <ReviewsSection data={data} type="tv" />
                        <MoviesTvActorsSection id={id} type="tv" />
                        <PicturesFromMovieSection id={id} type="tv" />
                        <MoviesTvRecommendationsSection id={id} type="tv" />
                    </OtherDetailsSectionLayouts>
                </section>
            </section>
        </>
    )
}

export default TvShowDetails