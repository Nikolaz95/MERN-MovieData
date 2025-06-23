import React from 'react'



//import css
import "./PicturesFromMovieSection.css";
import getApiUrl from '../../../../../hooks/getApiUrl';
import useFetch from '../../../../../hooks/useFetch';
import SwiperSliderCard from '../../../../../layouts/SwiperComponents/SwiperSliderCard/SwiperSliderCard';
import SliderSwiperPicturesContent from './SliderSwiperPicturesContent/SliderSwiperPicturesContent';


const PicturesFromMovieSection = ({ id, type }) => {
    /* fetch */
    const apiUrl = getApiUrl(`${type}/${id}/images`);
    const { data, loading, error } = useFetch(apiUrl);
    console.log(data);


    const sliderSettings = {
        320: { slidesPerView: 1, spaceBetween: 10 },
        660: { slidesPerView: 1, spaceBetween: 10 },
        960: { slidesPerView: 1, spaceBetween: 10 },
        1260: { slidesPerView: 2, spaceBetween: 10 },
        1600: { slidesPerView: 3, spaceBetween: 10 },
    };



    return (
        <section className='movieTvPicturesSection'>
            <h1 className='movieTvPicturesTitle'>Pictures from Movies :</h1>
            <section className='movieTvPicturesContent'>
                <main className='movieTvPicturesSlider'>
                    <SwiperSliderCard
                        className="swiperSliderPicturesMovie"
                        items={data?.backdrops || []}
                        sliderSettings={sliderSettings}
                        pagination={false}
                        renderContent={(movie) => <SliderSwiperPicturesContent data={movie} />} />
                </main>
            </section>
        </section>
    )
}

export default PicturesFromMovieSection