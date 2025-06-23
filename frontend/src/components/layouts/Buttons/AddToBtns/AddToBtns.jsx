import React from 'react'
import toast from 'react-hot-toast';

//import components
import AddToWatchListBtn from '../AddToWatchListBtn/AddToWatchListBtn';
import AddToFavListBtn from '../AddToFavListBtn/AddToFavListBtn';

//import components


const AddToBtns = ({ movieData, mediaType }) => {
    return (
        <>
            <AddToWatchListBtn movieData={movieData} mediaType={mediaType} />
            <AddToFavListBtn movieData={movieData} mediaType={mediaType} />
        </>
    )
}

export default AddToBtns