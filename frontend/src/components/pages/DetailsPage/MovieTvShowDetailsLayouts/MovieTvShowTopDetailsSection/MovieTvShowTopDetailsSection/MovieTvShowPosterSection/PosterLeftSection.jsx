import React, { useState } from 'react'

//import css
import "./PosterLeftSection.css";

//import images
import Missing from "../../../../../../../assets/pictures/mising-pic.jpg"
import StreamingImg from "../../../../../../../assets/icons/icon-streaming.png"

//import component
import Button from '../../../../../../layouts/Buttons/Button';
import Modal from '../../../../../../layouts/ModalsComponent/ModalLayoutsComponent/ModalComponent/Modal';
import StreamingModal from '../../../../../../layouts/ModalsComponent/ModalsContent/StreamingModal/StreamingModal';

const PosterLeftSection = ({ data, type }) => {
    // State to track which modal is open
    const [activeModal, setActiveModal] = useState("");

    // Function to close the modal
    const closeModal = () => setActiveModal("");
    return (
        <main className="posterMovieTvSectionLeft">
            <img src={data?.poster_path ? `https://www.themoviedb.org/t/p/w300_and_h450_multi_faces/${data.poster_path}` : Missing} className="MovieDetailsPosterImg" alt="Poster" title={data?.original_title} />
            <div className="streamingContent">
                <Button variant="streaming" onClick={() => setActiveModal("streamingModal")}>
                    <p>Now Streaming on</p>
                    <img src={StreamingImg} alt="Streaming Icon" className="iconBtns" />
                </Button>
            </div>

            {/* Modal for StreamingModal */}
            <Modal isOpen={activeModal === "streamingModal"} onClose={closeModal}>
                <StreamingModal movieInfo={data} type={type} onClose={closeModal} />
            </Modal>
        </main>
    )
}

export default PosterLeftSection