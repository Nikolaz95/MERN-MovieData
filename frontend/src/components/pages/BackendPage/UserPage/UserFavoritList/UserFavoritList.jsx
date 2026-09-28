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
import { PageHeader, EmptyState, PrimaryButton } from '../userLayout/DashboardUI';
import { useGetUserFavoritListQuery } from '../../../../../redux/api/favoritListApi';


const UserFavoritList = () => {
    titleName('Favorit List');
    //Fetch favoritlist
    const { data, isLoading } = useGetUserFavoritListQuery();
    const favoritList = data?.favoritList || [];

    return (
        <DashBoardLayout>
            <PageHeader title="Favorit List" count={favoritList.length}
                subtitle="Movies and TV shows you love" />

            {!isLoading && favoritList.length === 0 ? (
                <EmptyState
                    icon={<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>}
                    title="No favorites yet"
                    text="Tap “Add to Favorit List” on a movie or show you love.">
                    <PrimaryButton as={NavLink} to="/moviesPage">Browse movies</PrimaryButton>
                </EmptyState>
            ) : (
                <UserContentLayouts>
                    {/* wathc/favorit list */}
                    {favoritList.map((userFavoritList, i) => (
                        <UserPrivatContent key={userFavoritList._id} index={i}>
                            <UserPrivatContent.Top>
                                <NavLink
                                    to={`/${userFavoritList.mediaType === 'movie' ? 'movie' : 'tvShow'}/${userFavoritList.tmdbId}`}>
                                    <Image variant='posterImg' src={userFavoritList?.posterMedia
                                        ? `https://image.tmdb.org/t/p/w342${userFavoritList.posterMedia}` : missingImg} alt={userFavoritList.titleName} />
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
            )}
        </DashBoardLayout>
    )
}

export default UserFavoritList
