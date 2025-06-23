import React, { useState } from 'react'


//import css
import "./SliderSwiperPicturesContent.css";

//import images
import missingImg from "../../../../../../../assets/pictures/mising-pic.jpg"

//import components
import Modal from '../../../../../../layouts/ModalsComponent/ModalLayoutsComponent/ModalComponent/Modal';
import MovieTvShowPictureModal from '../../../../../../layouts/ModalsComponent/ModalsContent/MovieTvShowPictureModal';

const SliderSwiperPicturesContent = ({ data }) => {
    // State to track which modal is open
    const [activeModal, setActiveModal] = useState("");

    // Function to close the modal
    const closeModal = () => setActiveModal("");
    return (
        <>
            <div>
                <img src={data.file_path ? `https://image.tmdb.org/t/p/w500${data.file_path}` : missingImg} alt={data.title} className="pitcutreOfMovieImg" onClick={() => setActiveModal("text1")} />
            </div>

            {/* Modal for Text 1 */}
            <Modal isOpen={activeModal === "text1"} onClose={closeModal}>
                <MovieTvShowPictureModal data={data} />
            </Modal>
        </>
    )
}

export default SliderSwiperPicturesContent