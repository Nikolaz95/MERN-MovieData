import React from 'react'

import "./MovieTvShowPictureModal.css";

//import images
import missingImg from "../../../../assets/pictures/mising-pic.jpg"


const MovieTvShowPictureModal = ({ isOpen, onClose, data }) => {
    return (
        <div className="movieTvShowPictureModalContent">
            <img
                src={data.file_path ? `https://image.tmdb.org/t/p/original${data.file_path}` : missingImg}
                alt="Here should be a picture"
                className="modalPictureImg" />
        </div>
    )
}

export default MovieTvShowPictureModal