import React, { useEffect, useState } from 'react'
import Button from '../Button'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useAddToFavoritListMutation, useGetUserFavoritListQuery, useRemoveFromFavoritListMutation } from '../../../../redux/api/favoritListApi';

//import images
import DefaultFav from "../../../../assets/icons/not-favoritIcon.png"
import AddFavoritList from "../../../../assets/icons/icon-like.png"

const AddToFavListBtn = ({ movieData, mediaType }) => {
    const { user } = useSelector((state) => state.auth);
    const [addToFavoritList] = useAddToFavoritListMutation();
    const [removeFromFavoritList] = useRemoveFromFavoritListMutation()
    const [isOnFavoritList, setIsOnFavoritList] = useState(false);

    const { data: favoritListData, refetch } = useGetUserFavoritListQuery();
    console.log("favorit list", favoritListData);

    // check if item exists in watchlist
    useEffect(() => {
        if (favoritListData && movieData) {
            const movieId = movieData.id || movieData.tmdbId;
            const exists = favoritListData.favoritList?.find(
                (item) =>
                    item.tmdbId === movieId && item.mediaType === mediaType
            );
            setIsOnFavoritList(!!exists);
        }
    }, [favoritListData, movieData, mediaType]);


    const handleAddToFavoritList = async () => {
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

            if (isOnFavoritList) {
                await removeFromFavoritList({
                    tmdbId: movieId,  // ✅ now always correct
                    mediaType,
                }).unwrap();
                toast.success("Removed from Favorit List!");
            } else {
                const favoritListItem = {
                    tmdbId: movieId,
                    mediaType,
                    titleName: title,
                    posterMedia: posterPath,
                };
                await addToFavoritList(favoritListItem).unwrap();
                toast.success("Added to Favorit List!");
            }

            refetch();
        } catch (error) {
            toast.error("Something went wrong.");
            console.error(error);
        }
    }
    return (
        <Button onClick={handleAddToFavoritList}
            variant={isOnFavoritList ? 'removeFavList' : 'addFavList'}
            icon={isOnFavoritList ? AddFavoritList : DefaultFav}>
            <p>{isOnFavoritList ? 'on FavoritList' : 'Add to Favorit List'}</p>
        </Button>
    )
}

export default AddToFavListBtn