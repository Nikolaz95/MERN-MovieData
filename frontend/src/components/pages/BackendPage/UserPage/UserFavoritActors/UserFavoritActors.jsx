import React, { useState } from 'react'
import titleName from '../../../../hooks/useTitle';
import { NavLink } from 'react-router-dom';

//import images
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"

//import css
import "./UserFavoritActors.css"
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout';
import UserContentLayouts from '../userLayout/UserContentLayouts';
import UserPrivatContent from '../userLayout/UserPrivatContent';
import Image from '../../../../layouts/ImagesContent/Image';
import { useGetUserFavoritActorListQuery } from '../../../../../redux/api/favoritActorsListApi';
import AddFavActorBtn from '../../../../layouts/Buttons/AddFavActorBtn/AddFavActorBtn';


const UserFavoritActors = () => {
    titleName('Favorit Actors List');
    //Fetch favoritlist
    const { data, refetch } = useGetUserFavoritActorListQuery();
    console.log("favorit list", data);

    return (
        <DashBoardLayout>
            <h1>Favorit Actors List: {data?.favoritActorsList?.length}</h1>

            <UserContentLayouts>
                {/* actors */}
                {data?.favoritActorsList?.map((actor) => (
                    <UserPrivatContent key={actor._id}>
                        <UserPrivatContent.Top>
                            <NavLink to={`/person/${actor.actorId}`}>
                                <Image variant='posterImg' src={actor?.actorPoster
                                    ? `https://image.tmdb.org/t/p/w500${actor.actorPoster}`
                                    : missingImg} title={actor.actorName} alt={actor.actorName} />
                            </NavLink>
                        </UserPrivatContent.Top>
                        <UserPrivatContent.Bottom>
                            <UserPrivatContent.BottomInfo>
                                <h3>{actor.actorName}</h3>
                            </UserPrivatContent.BottomInfo>
                            <UserPrivatContent.BottomBtns>
                                <AddFavActorBtn actorData={actor}
                                    mediaType={actor.mediaType} />
                            </UserPrivatContent.BottomBtns>
                        </UserPrivatContent.Bottom>
                    </UserPrivatContent>
                ))}
            </UserContentLayouts>
        </DashBoardLayout>

    )
}

export default UserFavoritActors