import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import titleName from '../../../../hooks/useTitle';

//import css
import "./UserRatingList.css"

//import images
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"

import RemoveFromList from "../../../../../assets/icons/icon-delete-account.png"
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout';
import UserContentLayouts from '../userLayout/UserContentLayouts';
import UserPrivatContent from '../userLayout/UserPrivatContent';
import Button from '../../../../layouts/Buttons/Button';
import Image from '../../../../layouts/ImagesContent/Image';
import UserRating from '../../../../layouts/UserRatingComponent/UserRating';
import Rating from '@mui/material/Rating';
import { useGetAllUserRatingsQuery } from '../../../../../redux/api/ratingApi';


//import components
const UserRatingList = () => {
    const { data, isLoading } = useGetAllUserRatingsQuery(); // 👈 Use correct query
    console.log(data);



    titleName('Rating List');
    return (
        <DashBoardLayout>
            <h1>Rating List : {data?.ratings?.length}</h1>
            <UserContentLayouts>
                {/* rating */}

                {data?.ratings?.map((ratingList) => (
                    <UserPrivatContent key={ratingList.id}>
                        <UserPrivatContent.Top>
                            <NavLink
                                to={`/${ratingList.mediaType === 'movie' ? 'movie' : 'tvShow'}/${ratingList.tmdbId}`}>
                                <Image variant='posterImg' src={ratingList?.posterMedia
                                    ? `https://image.tmdb.org/t/p/w500${ratingList.posterMedia}`
                                    : missingImg}
                                    alt={ratingList.titleName} />
                            </NavLink>
                        </UserPrivatContent.Top>
                        <UserPrivatContent.Bottom>
                            <h3>{ratingList.titleName}</h3>
                            <UserPrivatContent.BottomInfo>
                                <h3>Your Rating:</h3>
                                {/* user Rating */}
                                <Rating
                                    name={`rating-${ratingList.id}`}
                                    value={ratingList?.value}
                                    readOnly
                                    precision={0.5}
                                    size="small"
                                    max={10}
                                />
                                {/* user Rating */}
                                <p>{ratingList?.value} / 10</p>
                            </UserPrivatContent.BottomInfo>
                        </UserPrivatContent.Bottom>
                        <UserPrivatContent.BottomBtns>
                            <Button>
                                Remove
                                <Image variant='iconImg' src={RemoveFromList}
                                    alt="iconImg" />
                                <Image />
                            </Button>
                        </UserPrivatContent.BottomBtns>
                    </UserPrivatContent>
                ))}
            </UserContentLayouts>
        </DashBoardLayout>

    )
}

export default UserRatingList