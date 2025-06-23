import React from 'react'
import ProtectRoute from '../pages/SignInRegisterPage/ProtectRoute'
import UserProfileInfo from '../pages/BackendPage/UserPage/UserProfileInfo/UserProfileInfo'
import UpdateProfile from '../pages/BackendPage/UserPage/UpdateProfile/UpdateProfile'
import UploadPicture from '../pages/BackendPage/UserPage/UploadPicture/UploadPicture'
import UpdatePassword from '../pages/BackendPage/UserPage/UpdatePassword/UpdatePassword'
import DeleteAccount from '../pages/BackendPage/UserPage/DeleteAccount/DeleteAccount'
import UserWatchList from '../pages/BackendPage/UserPage/UserWatchList/UserWatchList'
import UserFavoritList from '../pages/BackendPage/UserPage/UserFavoritList/UserFavoritList'
import UserRatingList from '../pages/BackendPage/UserPage/UserRatingList/UserRatingList'
import UserFavoritActors from '../pages/BackendPage/UserPage/UserFavoritActors/UserFavoritActors'



export const UserRoutes = [
    {
        path: "/user/settings-Profile",
        element: <ProtectRoute>
            <UserProfileInfo />
        </ProtectRoute>
    },

    {
        path: "/user/update-Profile",
        element:
            <ProtectRoute>
                <UpdateProfile />
            </ProtectRoute>
    },

    {
        path: "/user/update-Picture",
        element:
            <ProtectRoute>
                <UploadPicture />
            </ProtectRoute>
    },

    {
        path: "/user/update-Password",
        element:
            <ProtectRoute>
                <UpdatePassword />
            </ProtectRoute>
    },
    {
        path: "/user/delete-Account",
        element:
            <ProtectRoute>
                <DeleteAccount />
            </ProtectRoute>
    },

    {
        path: "/user/watchList",
        element:
            <ProtectRoute>
                <UserWatchList />
            </ProtectRoute>
    },

    {
        path: "/user/favoritList",
        element:
            <ProtectRoute>
                <UserFavoritList />
            </ProtectRoute>

    },

    {
        path: "/user/ratingList",
        element:
            <ProtectRoute>
                <UserRatingList />
            </ProtectRoute>
    },

    {
        path: "/user/favoritActor",
        element:
            <ProtectRoute>
                <UserFavoritActors />
            </ProtectRoute>
    },

]

