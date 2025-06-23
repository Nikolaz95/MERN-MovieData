import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import toast from 'react-hot-toast';

//import img
import RemoveRating from "../../../assets/icons/icon-delete-account.png"


//import css
import "./UserRating.css"
import { useSelector } from 'react-redux';
import { useAddRatingMutation, useDeleteRatingMutation, useGetRatingQuery, useUpdateRatingMutation } from '../../../redux/api/ratingApi';
import Image from '../ImagesContent/Image';

const UserRating = ({ movieData, mediaType }) => {
    const [addRating] = useAddRatingMutation();
    const [updateRating] = useUpdateRatingMutation();
    const [deleteRating] = useDeleteRatingMutation();
    const { data: existingRating, isLoading, isError } = useGetRatingQuery(movieData.id);

    const { user } = useSelector((state) => state.auth);
    const [ratingValue, setRatingValue] = useState(null);
    const [prevRatingValue, setPrevRatingValue] = useState(null);
    console.log("You rate movie with", ratingValue);

    // Fetch the existing rating when the component mounts or when the user logs in
    useEffect(() => {
        if (existingRating) {
            setRatingValue(existingRating.rating.value); // Set rating if available
        }
    }, [existingRating]);

    // Handle rating change
    const handleRatingChange = async (event, newValue) => {
        if (!user) {
            toast.error("Please log in to rate this.");
            return;
        }

        setRatingValue(newValue);
        setPrevRatingValue(ratingValue);

        const movieId = movieData.id || movieData.tmdbId;

        const title =
            movieData.title ||
            movieData.original_title ||
            movieData.name ||
            movieData.original_name ||
            movieData.titleName;

        try {
            if (existingRating) {
                // If rating already exists, update it
                await updateRating({
                    tmdbId: movieId,
                    mediaType,
                    titleName: title,
                    value: newValue,
                }).unwrap();
                toast.success("Rating updated!");
            } else {
                // Otherwise, add a new rating
                await addRating({
                    tmdbId: movieId,
                    mediaType,
                    titleName: title,
                    value: newValue,
                }).unwrap();
                toast.success("Rating submitted!");
            }
        } catch (err) {
            toast.error(err?.data?.message || "Failed to rate");
        }
    };

    // Handle rating removal
    const handleRatingRemove = async () => {
        if (!user) {
            toast.error("Please log in to delete your rating.");
            return;
        }

        const movieId = movieData.id || movieData.tmdbId;
        try {
            await deleteRating({
                tmdbId: movieId,
                mediaType
            }).unwrap(); // Call the deleteRating mutation
            setRatingValue(null); // Remove the rating from state
            toast.success("Rating deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete rating");
        }
    };

    return (
        <section className="usersRating-content">
            <h3 className="usersRating-title">User Rating :</h3>
            <div className="usersVoting-content">
                <div className="usersRating">
                    <Rating precision={0.5} max={10}
                        value={ratingValue}
                        onChange={handleRatingChange} />
                </div>
                {ratingValue !== null && (
                    <div className="UserRate">
                        <p>{ratingValue}</p>
                        <Image variant='iconImg'
                            src={RemoveRating}
                            title="Remove your rating"
                            alt="removeRating"
                            onClick={handleRatingRemove} />
                    </div>
                )}
            </div>
        </section>
    )
}

export default UserRating