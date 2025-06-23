import React from 'react'


//import css
import "./MoviesTvRecommendationsSection.css";
import SwiperSliderCard from '../../../../../layouts/SwiperComponents/SwiperSliderCard/SwiperSliderCard';
import getApiUrl from '../../../../../hooks/getApiUrl';
import useFetch from '../../../../../hooks/useFetch';
import SliderCardMovieTvShowsContent from '../../../../HomePage/SliderCardComponents/SliderCardContent/SliderCardMovieTvShowsContent';

const MoviesTvRecommendationsSection = ({ id, type }) => {
    const apiUrl = getApiUrl(`${type}/${id}/recommendations`);
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
        <section className='movieTvRecommendationsSection'>
            <main className='movieTvRecommendationsMainContent'>
                <h1 className='movieTvRecommendationsTitle'>
                    Recommendations :
                </h1>

                <section className='movieTvRecommendationsSlider'>
                    <SwiperSliderCard
                        className="swiperSliderRecommendationsMovie"
                        items={data?.results || []}
                        sliderSettings={sliderSettings}
                        pagination={true}
                        renderContent={(movie) => <SliderCardMovieTvShowsContent data={movie} />} />
                </section>
            </main>
        </section>
    )
}

export default MoviesTvRecommendationsSection