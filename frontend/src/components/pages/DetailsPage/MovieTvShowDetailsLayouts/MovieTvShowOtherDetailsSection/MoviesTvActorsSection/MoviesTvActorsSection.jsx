import React from 'react'


//import css
import "./MoviesTvActorsSection.css";
import SwiperSliderCard from '../../../../../layouts/SwiperComponents/SwiperSliderCard/SwiperSliderCard';
import SliderSwiperMovieTvActorsContent from './SliderSwiperMovieTvActorsContent/SliderSwiperMovieTvActorsContent';
import getApiUrl from '../../../../../hooks/getApiUrl';
import useFetch from '../../../../../hooks/useFetch';

const MoviesTvActorsSection = ({ id, type }) => {
    /* fetch */
    const apiUrl = getApiUrl(`${type}/${id}/credits`);
    const { data, loading, error } = useFetch(apiUrl);
    console.log(data);


    const sliderSettings = {
        320: { slidesPerView: 1, spaceBetween: 10 },
        660: { slidesPerView: 2, spaceBetween: 10 },
        960: { slidesPerView: 3, spaceBetween: 10 },
        1260: { slidesPerView: 4, spaceBetween: 10 },
        1600: { slidesPerView: 4, spaceBetween: 10 },
    };

    // Don't render if no cast data or empty cast array
    if (!data?.cast || data.cast.length === 0) {
        return null;
    }
    return (
        <section className='movieTvActorsSection'>
            <main className='movieTvActorsMainContent'>
                <h1 className='movieTvActorsTitle'>
                    Actors :
                </h1>

                <section className='movieTvActorsSliderSection'>
                    <SwiperSliderCard
                        className="swiperSliderActorsMovie"
                        items={data?.cast || []}
                        sliderSettings={sliderSettings}
                        pagination={true}
                        renderContent={(movie) => <SliderSwiperMovieTvActorsContent data={movie} />} />
                </section>
            </main>
        </section>
    )
}

export default MoviesTvActorsSection