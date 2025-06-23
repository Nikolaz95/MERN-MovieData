import React from 'react'

//import css
import "./TopRatedMovies.css";

//import components
import getApiUrl from '../../../../hooks/getApiUrl';
import useFetch from '../../../../hooks/useFetch';
import SwiperSliderCard from '../../../../layouts/SwiperComponents/SwiperSliderCard/SwiperSliderCard';
import SliderCardMovieTvShowsContent from '../SliderCardContent/SliderCardMovieTvShowsContent';
import TitleOverHomePage from '../../../../layouts/TitlesOverComponents/TitleOverHomePage';



const TopRatedMovies = () => {
    const apiUrl = getApiUrl('movie/top_rated');
    const { data, loading, error } = useFetch(apiUrl);
    console.log(data);

    const sliderSettings = {
        320: { slidesPerView: 1, spaceBetween: 10 },
        660: { slidesPerView: 2, spaceBetween: 10 },
        960: { slidesPerView: 3, spaceBetween: 10 },
        1260: { slidesPerView: 4, spaceBetween: 10 },
        1600: { slidesPerView: 5, spaceBetween: 10 },
    };
    return (
        <TitleOverHomePage
            title="Top Rated Movies :"
            linkPath="/moviesPage?category=top_rated">
            <section className='topRatedSlider'>
                <SwiperSliderCard
                    items={data.results}
                    sliderSettings={sliderSettings}
                    className='swiperSliderHomePg'
                    renderContent={(movie) => <SliderCardMovieTvShowsContent data={movie} />} />
            </section>
        </TitleOverHomePage>
    )
}

export default TopRatedMovies