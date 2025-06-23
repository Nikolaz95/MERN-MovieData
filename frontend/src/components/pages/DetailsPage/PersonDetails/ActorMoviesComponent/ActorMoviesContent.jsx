import React from 'react'

//import css
import "./ActorMoviesContent.css";

//import pictures
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"

//import component
import SwiperSliderCard from '../../../../layouts/SwiperComponents/SwiperSliderCard/SwiperSliderCard';
import SliderCardMovieTvShowsContent from '../../../HomePage/SliderCardComponents/SliderCardContent/SliderCardMovieTvShowsContent';
import getApiUrl from '../../../../hooks/getApiUrl';
import useFetch from '../../../../hooks/useFetch';


//import components

const ActorMoviesContent = ({ id }) => {
    const apiUrl = getApiUrl(`person/${id}/movie_credits`);
    const { data, loading, error } = useFetch(apiUrl);

    const sliderSettings = {
        320: { slidesPerView: 1, spaceBetween: 10 },
        660: { slidesPerView: 2, spaceBetween: 10 },
        960: { slidesPerView: 3, spaceBetween: 10 },
        1260: { slidesPerView: 4, spaceBetween: 10 },
        1600: { slidesPerView: 5, spaceBetween: 10 },
    };

    return (
        <section className='actorMoviesSection'>
            <main className='actorMoviesMainContent'>
                <h1 className='actorMoviesTitle'>
                    Movies : ({data?.cast?.length || 0})
                </h1>

                <section className='actorMoviesSlider'>
                    <SwiperSliderCard
                        className="swiperSliderAcorsMovie"
                        items={data?.cast || []}
                        sliderSettings={sliderSettings}
                        pagination={false}
                        renderContent={(movie) => <SliderCardMovieTvShowsContent data={movie} />} />
                </section>
            </main>
        </section>
    )
}

export default ActorMoviesContent