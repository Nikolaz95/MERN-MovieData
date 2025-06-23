import React from 'react'

//import css
import "./StreamingModal.css";

//import img
import CloseIcon from "../../../../../assets/icons/icon-cancelPic.png"
import Missing from "../../../../../assets/pictures/mising-pic.jpg"
import MoviePoster from "../../../../../assets/pictures/poster1.jpg"
import streamingImg from "../../../../../assets/pictures/poster5.jpg"

//import components
import Button from '../../../Buttons/Button';
import { useParams } from 'react-router-dom';
import getApiUrl from '../../../../hooks/getApiUrl';
import useFetch from '../../../../hooks/useFetch';
import FreeProviders from './ProviderSection/FreeProviders/FreeProviders';
import ProviderSection from './ProviderSection/StreamingProviders/ProviderSection';

const StreamingModal = ({ movieInfo, onClose, type }) => {

    /* fetch */
    const { id, slug, params } = useParams();
    const apiUrl = getApiUrl(`${type}/${id}/watch/providers`);
    const { data, loading, error } = useFetch(apiUrl);
    console.log(data);

    // Extract 'flatrate' providers (adjust region code if needed)
    const streamingProviders = data?.results?.SE?.flatrate || [];
    console.log(streamingProviders);

    const freeProviders = data?.results?.SE?.free || [];
    console.log(freeProviders);

    const hasAnyProviders = freeProviders.length > 0 || streamingProviders.length > 0;


    return (
        <div className="streamingModal">
            <Button onClick={onClose}
                variant="modalCloseX">
                <img src={CloseIcon} alt="" className="iconBtns" />
            </Button>
            <div className="streamingModalContent" >
                <div className="streamingModalLeft">
                    <img src={movieInfo?.poster_path ? `https://www.themoviedb.org/t/p/w300_and_h450_multi_faces/${movieInfo.poster_path}` : Missing}
                        alt={movieInfo.title}
                        title={movieInfo.title}
                        className='streamingModalPosterImg' />
                </div>

                <div className="streamingModalRight">
                    {hasAnyProviders ? (
                        <>
                            <FreeProviders freeProviders={freeProviders} />

                            <ProviderSection streamingProviders={streamingProviders} />
                        </>
                    ) : (
                        <p className="streamingModalNoContentText">No streaming providers available</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StreamingModal