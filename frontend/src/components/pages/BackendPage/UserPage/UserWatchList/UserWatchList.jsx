import React from 'react'
import titleName from '../../../../hooks/useTitle';
import { NavLink } from 'react-router-dom';

//import css
import "./UserWatchList.css"
//import pictures
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"

//import components
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout';
import Image from '../../../../layouts/ImagesContent/Image';
import AddToBtns from '../../../../layouts/Buttons/AddToBtns/AddToBtns';
import UserContentLayouts from '../userLayout/UserContentLayouts';
import UserPrivatContent from '../userLayout/UserPrivatContent';
import { useGetWatchlistQuery } from '../../../../../redux/api/watchlistApi';


const UserWatchList = () => {
    titleName('Watch List');

    //Fetch Watchlist
    const { data, isLoading } = useGetWatchlistQuery();
    console.log(data);


    return (
        <DashBoardLayout>
            < h1 > Watch List: {data?.watchlist?.length}</ h1>
            <UserContentLayouts>
                {/* wathc/favorit list */}
                {data?.watchlist?.map((userWatchList) => (
                    <UserPrivatContent key={userWatchList._id}>
                        <UserPrivatContent.Top>
                            <NavLink to={`/${userWatchList.mediaType === 'movie' ? 'movie' : 'tvShow'}/${userWatchList.tmdbId}`}>
                                <Image variant='posterImg' src={userWatchList?.posterMedia
                                    ? `https://image.tmdb.org/t/p/w500${userWatchList.posterMedia}`
                                    : missingImg} alt={userWatchList.titleName} />
                            </NavLink>
                        </UserPrivatContent.Top>
                        <UserPrivatContent.Bottom>
                            <UserPrivatContent.BottomInfo>
                                <h3>{userWatchList.titleName}</h3>
                            </UserPrivatContent.BottomInfo>
                            <UserPrivatContent.BottomBtns>
                                <AddToBtns movieData={userWatchList}
                                    mediaType={userWatchList.mediaType} />
                            </UserPrivatContent.BottomBtns>
                        </UserPrivatContent.Bottom>
                    </UserPrivatContent>
                ))}
            </UserContentLayouts>
        </DashBoardLayout>
    )
}

export default UserWatchList