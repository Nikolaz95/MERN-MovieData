import React from 'react'

//import css
import "./PosterLeftSection.css";

//import images
import Missing from "../../../../../../../assets/pictures/mising-pic.jpg"
import StreamingImg from "../../../../../../../assets/icons/icon-streaming.png"

//import component
import Button from '../../../../../../layouts/Buttons/Button';
import { useModal } from '../../../../../../context/ModalContext/ModalContext';

const PosterLeftSection = ({ data, type }) => {
    const { openStreamingModal } = useModal();

    return (
        <main className="posterMovieTvSectionLeft">
            <img src={data?.poster_path ? `https://www.themoviedb.org/t/p/w300_and_h450_multi_faces/${data.poster_path}` : Missing} className="MovieDetailsPosterImg" alt="Poster" title={data?.original_title} />
            <div className="streamingContent">
                <Button variant="streaming" onClick={() => openStreamingModal(data, type)}>
                    <p>Now Streaming on</p>
                    <img src={StreamingImg} alt="Streaming Icon" className="iconBtns" />
                </Button>
            </div>
        </main>
    )
}

export default PosterLeftSection