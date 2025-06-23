import React, { useRef } from 'react'

//swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//import css
import "./SwiperAutoPlay.css";

const SwiperAutoPlay = ({ items, renderSlide, className, autoplayDelay = 2500 }) => {
    /* const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const handleAutoplayTimeLeft = (s, time, progress) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty('--progress', 1 - progress);
        }
        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    }; */
    return (
        <Swiper spaceBetween={30} effect={'fade'} navigation={false}
            /* autoplay={{ delay: autoplayDelay, disableOnInteraction: false, }} */
            loop={true}
            /* onAutoplayTimeLeft={handleAutoplayTimeLeft} */
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            className={className}>
            {items?.map((item) => (
                <SwiperSlide key={item.id}>
                    {renderSlide(item)}
                </SwiperSlide>
            ))}
            {/* swiper auto play progress*/}
            {/* <div className="autoplayProgress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
            </div> */}
        </Swiper>

    )
}

export default SwiperAutoPlay