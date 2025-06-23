import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';


//import css
import "./SwiperSliderCard.css";



const SwiperSliderCard = ({ items, sliderSettings, renderContent, pagination = true, className }) => {
    return (
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10} slidesPerView={5}
            navigation
            pagination={pagination ? { clickable: true } : false}
            loop
            breakpoints={sliderSettings}
            className={className} /* importujem clasname da bi mogo pojedinacno odredjivat kakav ocu swiper content */
            /* className='swiperSliderContent' */>
            {items && items.map((item) => (
                <SwiperSlide key={item.id}>
                    {renderContent(item)}
                </SwiperSlide>))}
        </Swiper>
    )
}

export default SwiperSliderCard