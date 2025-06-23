import React from 'react'
import titleName from '../../hooks/useTitle';
//import css
import "./HomePage.css";

//import  icon
import backGroundImg from '../../../assets/pictures/background.jpg';

//import components
import TrendingMovies from './TrendingComponent/TrendingMovies/TrendingMovies';
import TrendingTvShows from './TrendingComponent/TrendingTvShows/TrendingTvShows';
import TheaterMovies from './SliderCardComponents/TheaterMovies/TheaterMovies';
import TvShowsTopRated from './SliderCardComponents/TvShowsTopRated/TvShowsTopRated';
import BackGroudImg from '../../layouts/BackGroundContent/BackGroudImg/BackGroudImg';
import useScrollToTop from '../../hooks/useScrollToTop';
import ScrollToTop from '../../layouts/ScrollToTop/ScrollToTop';
import UpcomingMovies from './SliderCardComponents/UpcomingMovies/UpcomingMovies';
import TopRatedMovies from './SliderCardComponents/TopRatedMovies/TopRatedMovies';
import TvShowsOnTheAir from './SliderCardComponents/TvShowsOnTheAir/TvShowsOnTheAir';
import TvShowsPopular from './SliderCardComponents/TvShowsPopular/TvShowsPopular';

const HomePage = () => {
    const { isVisible } = useScrollToTop();
    titleName('Movies and Tv Shows');
    return (
        <>
            <BackGroudImg image={backGroundImg} />
            <div className='HomePageContent'>
                {isVisible && <ScrollToTop />}
                {/* movie */}
                <TrendingMovies />
                <TheaterMovies />
                <UpcomingMovies />
                <TopRatedMovies />
                {/* movie */}

                {/* tvShow */}
                <TrendingTvShows />
                <TvShowsOnTheAir />
                <TvShowsPopular />
                <TvShowsTopRated />
                {/* tvShow */}
            </div>
        </>
    )
}

export default HomePage