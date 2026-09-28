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
import { PageHeader, EmptyState, PrimaryButton } from '../userLayout/DashboardUI';
import { useGetWatchlistQuery } from '../../../../../redux/api/watchlistApi';


const UserWatchList = () => {
    titleName('Watch List');

    //Fetch Watchlist
    const { data, isLoading } = useGetWatchlistQuery();
    const watchlist = data?.watchlist || [];

    return (
        <DashBoardLayout>
            <PageHeader title="Watch List" count={watchlist.length}
                subtitle="Movies and TV shows you want to watch" />

            {!isLoading && watchlist.length === 0 ? (
                <EmptyState
                    icon={<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>}
                    title="Your watch list is empty"
                    text="Tap “Add to WatchList” on any movie or show to save it here.">
                    <PrimaryButton as={NavLink} to="/moviesPage">Browse movies</PrimaryButton>
                </EmptyState>
            ) : (
                <UserContentLayouts>
                    {/* wathc/favorit list */}
                    {watchlist.map((userWatchList, i) => (
                        <UserPrivatContent key={userWatchList._id} index={i}>
                            <UserPrivatContent.Top>
                                <NavLink to={`/${userWatchList.mediaType === 'movie' ? 'movie' : 'tvShow'}/${userWatchList.tmdbId}`}>
                                    <Image variant='posterImg' src={userWatchList?.posterMedia
                                        ? `https://image.tmdb.org/t/p/w342${userWatchList.posterMedia}`
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
            )}
        </DashBoardLayout>
    )
}

export default UserWatchList
