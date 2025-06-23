import React from 'react'

//import css
import "./UpcomingMovies.css";

//import components

import getApiUrl from '../../../../hooks/getApiUrl';
import useFetch from '../../../../hooks/useFetch';
import TitleOverHomePage from '../../../../layouts/TitlesOverComponents/TitleOverHomePage';
import SwiperSliderCard from '../../../../layouts/SwiperComponents/SwiperSliderCard/SwiperSliderCard';
import SliderCardMovieTvShowsContent from '../SliderCardContent/SliderCardMovieTvShowsContent';

const UpcomingMovies = () => {
    const apiUrl = getApiUrl('movie/upcoming');
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
            title="Upcoming Movies :"
            linkPath="/moviesPage?category=upcoming">

            <section className='upcomingSlider'>

                <SwiperSliderCard
                    items={data.results}
                    sliderSettings={sliderSettings}
                    className='swiperSliderHomePg'
                    renderContent={(movie) => <SliderCardMovieTvShowsContent data={movie} />} />
            </section>
        </TitleOverHomePage>
    )
}

export default UpcomingMovies