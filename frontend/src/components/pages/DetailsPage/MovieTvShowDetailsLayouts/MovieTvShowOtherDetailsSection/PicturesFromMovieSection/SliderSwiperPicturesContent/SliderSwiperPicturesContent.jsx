import React from 'react'


//import css
import "./SliderSwiperPicturesContent.css";

//import images
import missingImg from "../../../../../../../assets/pictures/mising-pic.jpg"

//import components
import { useModal } from '../../../../../../context/ModalContext/ModalContext';

const SliderSwiperPicturesContent = ({ data }) => {
    const { openPictureModal } = useModal();

    return (
        <div>
            <img src={data.file_path ? `https://image.tmdb.org/t/p/w500${data.file_path}` : missingImg} alt={data.title} className="pitcutreOfMovieImg" onClick={() => openPictureModal(data)} />
        </div>
    )
}

export default SliderSwiperPicturesContent