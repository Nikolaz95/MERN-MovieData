

//import img
import DashBoardIcon from "../../../../../../assets/icons/icon-dashboard.png"
import ListOfUsers from "../../../../../../assets/icons/icon-users.png"
import DataAnalytic from "../../../../../../assets/icons/icon-web-analytics.png"
import AvatarIcon from "../../../../../../assets/icons/avatar-profile.jpg"
import UpdateProfile from "../../../../../../assets/icons/icon-profile.png"
import UploadImg from "../../../../../../assets/icons/icon-upload.png"
import UpdatePassword from "../../../../../../assets/icons/icon-update-password.png"
import DeleteAccoutn from "../../../../../../assets/icons/icon-delete-account.png"

import AddWatchList from "../../../../../../assets/icons/icon-add.png"
import AddFavorit from "../../../../../../assets/icons/icons-favorite.png"
import Rating from "../../../../../../assets/icons/icons-star.png"
import ActorFavorit from "../../../../../../assets/icons/icons-actor.png"


const SidebarData = [
    {
        id: 0,
        titleName: "Dashboard",
        icon: DashBoardIcon,
        roles: ["admin"],

        dropDownList: [
            {
                title: "Dashboard",
                path: "/admin/dashBoard",
                icon: DashBoardIcon
            },
            {
                title: "List of Users",
                path: "/admin/listOfUsers",
                icon: ListOfUsers
            },
            {
                title: "Data fact",
                path: "/admin/dataFacts",
                icon: DataAnalytic,
            }
        ]
    },

    {
        id: 1,
        titleName: "User Profile",
        icon: ListOfUsers,
        roles: ["user", "admin"],
        dropDownList: [
            {
                title: "Profile Info",
                path: "/user/settings-Profile",
                icon: AvatarIcon
            },
            {
                title: "Update Profile",
                path: "/user/update-Profile",
                icon: UpdateProfile
            },

            {
                title: "Upload Picture",
                path: "/user/update-Picture",
                icon: UploadImg,
            },
            {
                title: "Update Password",
                path: "/user/update-Password",
                icon: UpdatePassword,
            },

            {
                title: "Delete account",
                path: "/user/delete-Account",
                icon: DeleteAccoutn,
            },
        ]
    },

    {
        id: 2,
        titleName: "Users Content",
        /* path: "/admin/listOfUsers", */
        icon: ListOfUsers,
        dropDownList: [
            {
                title: "Your WatchList",
                path: "/user/watchList",
                icon: AddWatchList
            },
            {
                title: "Your FavoritList",
                path: "/user/favoritList",
                icon: AddFavorit
            },

            {
                title: "Your RatingList",
                path: "/user/ratingList",
                icon: Rating,
            },
            {
                title: "Favorit Actors",
                path: "/user/favoritActor",
                icon: ActorFavorit,
            },
        ]
    },
]



export default SidebarData