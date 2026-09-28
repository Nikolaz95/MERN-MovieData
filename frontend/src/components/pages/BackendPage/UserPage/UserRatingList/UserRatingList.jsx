import React from 'react'
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import titleName from '../../../../hooks/useTitle';

//import css
import "./UserRatingList.css"

//import images
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"

//import components
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout';
import UserContentLayouts from '../userLayout/UserContentLayouts';
import UserPrivatContent from '../userLayout/UserPrivatContent';
import { PageHeader, EmptyState, PrimaryButton } from '../userLayout/DashboardUI';
import Rating from '@mui/material/Rating';
import getApiUrl from '../../../../hooks/getApiUrl';
import useFetch from '../../../../hooks/useFetch';
import { useDeleteRatingMutation, useGetAllUserRatingsQuery } from '../../../../../redux/api/ratingApi';


// ratings are saved without a poster -> get it from TMDB
const RatingPoster = ({ tmdbId, mediaType, title }) => {
    const { data } = useFetch(getApiUrl(`${mediaType === 'movie' ? 'movie' : 'tv'}/${tmdbId}`));
    return (
        <img src={data?.poster_path ? `https://image.tmdb.org/t/p/w342${data.poster_path}` : missingImg}
            alt={title} loading="lazy" />
    );
};


const UserRatingList = () => {
    titleName('Rating List');
    const { data, isLoading } = useGetAllUserRatingsQuery();
    const [deleteRating, { isLoading: isRemoving }] = useDeleteRatingMutation();
    const ratings = data?.ratings || [];

    const handleRemove = async (rating) => {
        try {
            await deleteRating({ tmdbId: rating.tmdbId, mediaType: rating.mediaType }).unwrap();
            toast.success("Rating removed");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to remove rating");
        }
    };

    return (
        <DashBoardLayout>
            <PageHeader title="Rating List" count={ratings.length}
                subtitle="Everything you have rated" />

            {!isLoading && ratings.length === 0 ? (
                <EmptyState
                    icon={<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" /></svg>}
                    title="You haven't rated anything yet"
                    text="Open a movie or show and pick your stars under “User Rating”.">
                    <PrimaryButton as={NavLink} to="/moviesPage">Browse movies</PrimaryButton>
                </EmptyState>
            ) : (
                <UserContentLayouts>
                    {/* rating */}
                    {ratings.map((ratingList, i) => (
                        <UserPrivatContent key={ratingList._id || `${ratingList.mediaType}-${ratingList.tmdbId}`} index={i}>
                            <UserPrivatContent.Top>
                                <NavLink
                                    to={`/${ratingList.mediaType === 'movie' ? 'movie' : 'tvShow'}/${ratingList.tmdbId}`}>
                                    <RatingPoster tmdbId={ratingList.tmdbId} mediaType={ratingList.mediaType}
                                        title={ratingList.titleName} />
                                </NavLink>
                                <span className="userRatingBadge">★ {ratingList?.value}</span>
                            </UserPrivatContent.Top>
                            <UserPrivatContent.Bottom>
                                <h3>{ratingList.titleName}</h3>
                                <UserPrivatContent.BottomInfo>
                                    {/* user Rating */}
                                    <Rating
                                        name={`rating-${ratingList._id}`}
                                        value={ratingList?.value}
                                        readOnly
                                        precision={0.5}
                                        size="small"
                                        max={10}
                                    />
                                    <p className="userRatingValue">{ratingList?.value} / 10</p>
                                </UserPrivatContent.BottomInfo>
                                <UserPrivatContent.BottomBtns>
                                    <button type="button" className="userRatingRemoveBtn"
                                        disabled={isRemoving}
                                        onClick={() => handleRemove(ratingList)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" />
                                        </svg>
                                        Remove rating
                                    </button>
                                </UserPrivatContent.BottomBtns>
                            </UserPrivatContent.Bottom>
                        </UserPrivatContent>
                    ))}
                </UserContentLayouts>
            )}
        </DashBoardLayout>

    )
}

export default UserRatingList
