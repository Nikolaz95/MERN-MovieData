import React from 'react'
import { NavLink } from 'react-router-dom';
import titleName from '../../../../hooks/useTitle';
import { useSelector } from 'react-redux';
//import css
import "./UserProfileInfo.css"


import avatarDefault from "../../../../../assets/pictures/avatar-profile.jpg"
import WatchListIcon from "../../../../../assets/icons/icon-add.png"
import FavoritIcon from "../../../../../assets/icons/icons-favorite.png"
import RatingIcon from "../../../../../assets/icons/icons-star.png"
import ActorIcon from "../../../../../assets/icons/icons-actor.png"


//import components
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import { PageHeader, GhostButton } from '../userLayout/DashboardUI';
import { useGetWatchlistQuery } from '../../../../../redux/api/watchlistApi';
import { useGetUserFavoritListQuery } from '../../../../../redux/api/favoritListApi';
import { useGetAllUserRatingsQuery } from '../../../../../redux/api/ratingApi';
import { useGetUserFavoritActorListQuery } from '../../../../../redux/api/favoritActorsListApi';

const UserProfileInfo = () => {
    titleName(`Profile Info`)
    const { user } = useSelector((state) => state.auth);

    // numbers for the stat tiles (same queries as the list pages, so they are cached)
    const { data: watchlistData } = useGetWatchlistQuery();
    const { data: favoritData } = useGetUserFavoritListQuery();
    const { data: ratingData } = useGetAllUserRatingsQuery();
    const { data: actorData } = useGetUserFavoritActorListQuery();

    const stats = [
        { label: "Watch List", value: watchlistData?.watchlist?.length, icon: WatchListIcon, path: "/user/watchList" },
        { label: "Favorites", value: favoritData?.favoritList?.length, icon: FavoritIcon, path: "/user/favoritList" },
        { label: "Ratings", value: ratingData?.ratings?.length, icon: RatingIcon, path: "/user/ratingList" },
        { label: "Favorite Actors", value: actorData?.favoritActorsList?.length, icon: ActorIcon, path: "/user/favoritActor" },
    ];

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
        : null;

    return (
        <DashBoardLayout>
            <PageHeader title="Profile" subtitle="Your account at a glance" />

            <section className="userProfileConteiner">
                {/* profile card */}
                <div className="userProfileCard">
                    <div className="userProfileBanner" />
                    <div className="userProfileConteinerTop">
                        <img src={user?.avatar?.url || avatarDefault} className='userProfileImg' alt="" />
                        <div className="userProfileMain">
                            <h2 className="userProfileName">{user?.name}</h2>
                            <p className="userProfileEmail">{user?.email}</p>
                            <div className="userProfileTags">
                                <span className={`userProfileRole ${user?.role === "admin" ? "admin" : ""}`}>
                                    {user?.role === "admin" ? "Admin" : "User"}
                                </span>
                                {memberSince && <span className="userProfileSince">Member since {memberSince}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="userProfileActions">
                        <GhostButton as={NavLink} to="/user/update-Profile">Edit profile</GhostButton>
                        <GhostButton as={NavLink} to="/user/update-Picture">Change picture</GhostButton>
                        <GhostButton as={NavLink} to="/user/update-Password">Change password</GhostButton>
                    </div>
                </div>

                {/* stat tiles */}
                <div className="userProfileStats">
                    {stats.map((stat, i) => (
                        <NavLink key={stat.label} to={stat.path} className="userProfileStat" style={{ "--i": i }}>
                            <img src={stat.icon} alt="" className="userProfileStatIcon" />
                            <span className="userProfileStatValue">{stat.value ?? "–"}</span>
                            <span className="userProfileStatLabel">{stat.label}</span>
                        </NavLink>
                    ))}
                </div>
            </section>
        </DashBoardLayout>
    )
}

export default UserProfileInfo
