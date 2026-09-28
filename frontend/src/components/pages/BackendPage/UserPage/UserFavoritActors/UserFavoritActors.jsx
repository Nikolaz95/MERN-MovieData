import React from 'react'
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
import { PageHeader, EmptyState, PrimaryButton } from '../userLayout/DashboardUI';
import { useGetUserFavoritActorListQuery } from '../../../../../redux/api/favoritActorsListApi';
import AddFavActorBtn from '../../../../layouts/Buttons/AddFavActorBtn/AddFavActorBtn';


const UserFavoritActors = () => {
    titleName('Favorit Actors List');
    //Fetch favoritlist
    const { data, isLoading } = useGetUserFavoritActorListQuery();
    const actors = data?.favoritActorsList || [];

    return (
        <DashBoardLayout>
            <PageHeader title="Favorit Actors" count={actors.length}
                subtitle="Actors you follow" />

            {!isLoading && actors.length === 0 ? (
                <EmptyState
                    icon={<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>}
                    title="No favorite actors yet"
                    text="Open an actor's page and tap “Add to Favorit Actor List”.">
                    <PrimaryButton as={NavLink} to="/searchPage">Search actors</PrimaryButton>
                </EmptyState>
            ) : (
                <UserContentLayouts>
                    {/* actors */}
                    {actors.map((actor, i) => (
                        <UserPrivatContent key={actor._id} index={i}>
                            <UserPrivatContent.Top>
                                <NavLink to={`/person/${actor.actorId}`}>
                                    <Image variant='posterImg' src={actor?.actorPoster
                                        ? `https://image.tmdb.org/t/p/w342${actor.actorPoster}`
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
            )}
        </DashBoardLayout>

    )
}

export default UserFavoritActors
