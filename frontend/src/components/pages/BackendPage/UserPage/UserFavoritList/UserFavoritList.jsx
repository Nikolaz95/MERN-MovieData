import React from 'react'
import { NavLink } from 'react-router-dom';
import titleName from '../../../../hooks/useTitle';

//import css
import "./UserFavoritList.css"

//import pictures
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"

//import components
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout';
import UserContentLayouts from '../userLayout/UserContentLayouts';
import UserPrivatContent from '../userLayout/UserPrivatContent';
import AddToBtns from '../../../../layouts/Buttons/AddToBtns/AddToBtns';
import Image from '../../../../layouts/ImagesContent/Image';
import { useGetUserFavoritListQuery } from '../../../../../redux/api/favoritListApi';


const UserFavoritList = () => {
    titleName('Favorit List');
    //Fetch favoritlist
    const { data, isLoading } = useGetUserFavoritListQuery();
    console.log("favorit list", data);

    return (
        <DashBoardLayout>
            <h1>Favorit List: {data?.favoritList?.length}</h1>
            <UserContentLayouts>
                {/* wathc/favorit list */}
                {data?.favoritList?.map((userFavoritList) => (
                    <UserPrivatContent key={userFavoritList._id}>
                        <UserPrivatContent.Top>
                            <NavLink
                                to={`/${userFavoritList.mediaType === 'movie' ? 'movie' : 'tvShow'}/${userFavoritList.tmdbId}`}>
                                <Image variant='posterImg' src={userFavoritList?.posterMedia
                                    ? `https://image.tmdb.org/t/p/w500${userFavoritList.posterMedia}` : missingImg} alt={userFavoritList.titleName} />
                            </NavLink>
                        </UserPrivatContent.Top>
                        <UserPrivatContent.Bottom>
                            <UserPrivatContent.BottomInfo>
                                <h3>{userFavoritList.titleName}</h3>
                            </UserPrivatContent.BottomInfo>
                            <UserPrivatContent.BottomBtns>
                                <AddToBtns movieData={userFavoritList} mediaType={userFavoritList.mediaType} />
                            </UserPrivatContent.BottomBtns>
                        </UserPrivatContent.Bottom>
                    </UserPrivatContent>
                ))}
            </UserContentLayouts>
        </DashBoardLayout>
    )
}

export default UserFavoritList