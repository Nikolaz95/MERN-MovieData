import React from 'react'

//import css
import "./TrailerBtn.css";

//import components
import Button from '../Button';
import getApiUrl from '../../../hooks/getApiUrl';
import useFetch from '../../../hooks/useFetch';
import { useModal } from '../../../context/ModalContext/ModalContext';

// best video first: official trailer -> trailer -> teaser -> any youtube video
const pickTrailer = (videos = []) => {
    const youtube = videos.filter((video) => video.site === "YouTube");
    return youtube.find((video) => video.type === "Trailer" && video.official)
        || youtube.find((video) => video.type === "Trailer")
        || youtube.find((video) => video.type === "Teaser")
        || youtube[0];
};

// id can also be a season path ("1399/season/2") -> trailer of that season
const TrailerBtn = ({ id, type, title }) => {
    const { openTrailerModal } = useModal();

    /* fetch - "null" also gives videos without a language set (many season trailers) */
    const apiUrl = getApiUrl(`${type}/${id}/videos`, "&include_video_language=en,null");
    const { data } = useFetch(apiUrl);
    const trailer = pickTrailer(data?.results);

    // no trailer on youtube -> no button
    if (!trailer) {
        return null;
    }

    return (
        <Button variant="trailer" onClick={() => openTrailerModal(trailer, title)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14z" />
            </svg>
            <p>Play Trailer</p>
        </Button>
    )
}

export default TrailerBtn
