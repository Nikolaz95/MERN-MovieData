import React, { useEffect, useState } from 'react'
import Button from '../Button'
import toast from 'react-hot-toast';

//import images
import DefaultAdd from "../../../../assets/icons/icon-add.png"
import AddWatchList from "../../../../assets/icons/icon-check.png"
import { useAddToWatchlistMutation, useGetWatchlistQuery, useRemoveFromWatchlistMutation } from '../../../../redux/api/watchlistApi';
import { useSelector } from 'react-redux';

const AddToWatchListBtn = ({ movieData, mediaType }) => {
    const { user } = useSelector((state) => state.auth);
    const [addToWatchlist] = useAddToWatchlistMutation();
    const [removeFromWatchlist] = useRemoveFromWatchlistMutation()
    const [isOnWatchList, setIsOnWatchList] = useState(false);
    const { data: watchlistData, refetch } = useGetWatchlistQuery()
    console.log("watchList list", watchlistData);

    // check if item exists in watchlist
    useEffect(() => {
        if (watchlistData && movieData) {
            const movieId = movieData.id || movieData.tmdbId;
            const exists = watchlistData.watchlist?.find(
                (item) => item.tmdbId === movieId && item.mediaType === mediaType);
            setIsOnWatchList(!!exists);
        }
    }, [watchlistData, movieData, mediaType]);




    const handleWatchList = async () => {
        if (!user) {
            toast.error("You have to log in.");
            return;
        }
        try {
            const movieId = movieData.id || movieData.tmdbId;  // ✅ centralize this value
            const posterPath = movieData.poster_path || movieData.posterMedia;
            const title =
                movieData.title ||
                movieData.original_title ||
                movieData.name ||
                movieData.original_name ||
                movieData.titleName;

            if (isOnWatchList) {
                await removeFromWatchlist({
                    tmdbId: movieId,  // ✅ now always correct
                    mediaType,
                }).unwrap();
                toast.success("Removed from Watchlist!");
            } else {
                const watchlistItem = {
                    tmdbId: movieId,
                    mediaType,
                    titleName: title,
                    posterMedia: posterPath,
                };
                await addToWatchlist(watchlistItem).unwrap();
                toast.success("Added to Watchlist!");
            }

            refetch();
        } catch (error) {
            toast.error("Something went wrong.");
            console.error(error);
        }
    };



    return (
        <Button onClick={handleWatchList}
            variant={isOnWatchList ? 'removeWatchList' : 'addWatchList'}
            icon={isOnWatchList ? AddWatchList : DefaultAdd}>
            <p>{isOnWatchList ? 'on WatchList' : 'Add to WatchList'}</p>
        </Button>
    )
}

export default AddToWatchListBtn