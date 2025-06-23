import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { useSelector } from 'react-redux'
import { useAddToFavoritActorListMutation, useGetUserFavoritActorListQuery, useRemoveFromFavoritActorListMutation } from '../../../../redux/api/favoritActorsListApi'
import toast from 'react-hot-toast';

//import images
import DefaultFav from "../../../../assets/icons/not-favoritIcon.png"
import AddFavoritList from "../../../../assets/icons/icon-like.png"

const AddFavActorBtn = ({ actorData, mediaType = "person" }) => {
    const { user } = useSelector((state) => state.auth);

    const [addToFavoritActorList] = useAddToFavoritActorListMutation();
    const [removeFromFavoritActorList] = useRemoveFromFavoritActorListMutation()

    const [isFavorite, setIsFavorite] = useState(false);

    const { data: favoritActorListData, refetch } = useGetUserFavoritActorListQuery()
    console.log("watchList list", favoritActorListData);

    // check if item exists in watchlist
    useEffect(() => {
        if (favoritActorListData && actorData) {
            // Handle both cases: actorData from PersonDetails and from Favorites list
            const actorId = actorData.id || actorData.actorId;
            const exists = favoritActorListData.favoritActorsList?.some(
                (item) => Number(item.actorId) === Number(actorId)
            );
            setIsFavorite(!!exists);
        }
    }, [favoritActorListData, actorData]);

    const handleAddToFavoritList = async () => {
        if (!user) {
            toast.error("You have to log in.");
            return;
        }
        try {
            const actorId = Number(actorData.id || actorData.actorId);

            if (isFavorite) {
                await removeFromFavoritActorList({
                    actorId: actorId,
                    mediaType
                }).unwrap();
                toast.success("Removed from Favorit actor List!");
            } else {
                await addToFavoritActorList({
                    actorId,
                    mediaType,
                    actorName: actorData.name || actorData.actorName,
                    actorPoster: actorData.profile_path || actorData.actorPoster
                }).unwrap();
                toast.success("Added to Favorite actor List!");
            }
            // Immediately update UI state
            /*  setIsFavorite(!isFavorite); */
        } catch (error) {
            toast.error(error.message || "Something went wrong.");
            console.error("Favorite actor error:", error);
        }
    };

    return (
        <Button onClick={handleAddToFavoritList}
            variant={isFavorite ? 'removeWatchList' : 'addWatchList'}
            icon={isFavorite ? AddFavoritList : DefaultFav}>
            <p>{isFavorite ? 'on Favorit Actor List' : 'Add to Favorit Actor List'}</p>
        </Button>
    )
}

export default AddFavActorBtn