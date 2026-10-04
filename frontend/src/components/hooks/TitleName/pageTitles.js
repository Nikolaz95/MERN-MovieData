import { matchPath } from "react-router-dom";

//import images
import LogoIcon from "../../../assets/icons/logo-movie.png"
import MoviesIcon from "../../../assets/icons/icon-movies.png"
import TvIcon from "../../../assets/icons/icon-tvs.png"
import SearchIcon from "../../../assets/icons/icon-search.png"
import LoginIcon from "../../../assets/icons/icon-login.png"
import RegisterIcon from "../../../assets/icons/icon-addAccount.png"
import ActorIcon from "../../../assets/icons/icons-actor.png"
import DashboardIcon from "../../../assets/icons/icon-dashboard.png"
import UsersIcon from "../../../assets/icons/icon-users.png"
import AnalyticsIcon from "../../../assets/icons/icon-web-analytics.png"
import ProfileIcon from "../../../assets/icons/icon-profile.png"
import UpdateIcon from "../../../assets/icons/icons-gear.png"
import UploadIcon from "../../../assets/icons/icon-upload.png"
import PasswordIcon from "../../../assets/icons/icon-update-password.png"
import DeleteIcon from "../../../assets/icons/icon-delete-account.png"
import WatchListIcon from "../../../assets/icons/icon-show.png"
import FavoriteIcon from "../../../assets/icons/icons-favorite.png"
import StarIcon from "../../../assets/icons/icons-star.png"
import ErrorIcon from "../../../assets/icons/icon-error.png"

// tab title + icon for every route (details pages set their own title with the movie / show name)
export const PAGE_TITLES = [
    { path: "/", title: "Home", icon: LogoIcon },
    { path: "/searchPage", title: "Search", icon: SearchIcon },
    { path: "/moviesPage", title: "Movies", icon: MoviesIcon },
    { path: "/tvShowsPage", title: "TV Shows", icon: TvIcon },
    { path: "/movie/:id", title: "Movie", icon: MoviesIcon },
    { path: "/tvShow/:id/*", title: "TV Show", icon: TvIcon },
    { path: "/person/:id", title: "Actor", icon: ActorIcon },
    { path: "/signIn", title: "Sign In", icon: LoginIcon },
    { path: "/registration", title: "Registration", icon: RegisterIcon },

    /* admin */
    { path: "/admin/dashBoard", title: "Admin Dashboard", icon: DashboardIcon },
    { path: "/admin/listOfUsers", title: "List of Users", icon: UsersIcon },
    { path: "/admin/dataFacts", title: "Data Facts", icon: AnalyticsIcon },

    /* user */
    { path: "/user/settings-Profile", title: "My Profile", icon: ProfileIcon },
    { path: "/user/update-Profile", title: "Update Profile", icon: UpdateIcon },
    { path: "/user/update-Picture", title: "Update Picture", icon: UploadIcon },
    { path: "/user/update-Password", title: "Update Password", icon: PasswordIcon },
    { path: "/user/delete-Account", title: "Delete Account", icon: DeleteIcon },
    { path: "/user/watchList", title: "My Watchlist", icon: WatchListIcon },
    { path: "/user/favoritList", title: "My Favorites", icon: FavoriteIcon },
    { path: "/user/ratingList", title: "My Ratings", icon: StarIcon },
    { path: "/user/favoritActor", title: "Favorite Actors", icon: ActorIcon },
];

const NOT_FOUND = { title: "Page not found", icon: ErrorIcon };

export const getPageTitle = (pathname) =>
    PAGE_TITLES.find((page) => matchPath(page.path, pathname)) || NOT_FOUND;
