import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './redux/store.js';

import './index.css'
import ErrorPage from './components/pages/ErrorPage/ErrorPage.jsx';
import HomePage from './components/pages/HomePage/HomePage.jsx';
import Root from './Root.jsx';
import SearchPage from './components/pages/SearchPage/SearchPage.jsx';
import MoviesListPage from './components/pages/MovieTvShowsListPage/MoviesListPage/MoviesListPage.jsx';
import TvShowsListsPage from './components/pages/MovieTvShowsListPage/TvShowsListsPage/TvShowsListsPage.jsx';
import SingInPage from './components/pages/SignInRegisterPage/SingInPage/SingInPage.jsx';
import RegisterPage from './components/pages/SignInRegisterPage/RegisterPage/RegisterPage.jsx';
import MovieDetails from './components/pages/DetailsPage/MovieDetails/MovieDetails.jsx';
import TvShowDetails from './components/pages/DetailsPage/TvShowDetails/TvShowDetails.jsx';
import PersonDetails from './components/pages/DetailsPage/PersonDetails/PersonDetails.jsx';
import { AdminRoutes } from './components/routes/AdminRoutes.jsx';
import { UserRoutes } from './components/routes/UserRoutes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "*",
        element: <ErrorPage />
      },
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/searchPage",
        element: <SearchPage />
      },
      {
        path: "/moviesPage",
        element: <MoviesListPage />
      },
      {
        path: "/tvShowsPage",
        element: <TvShowsListsPage />
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />
      },
      {
        path: "/tvShow/:id",
        element: <TvShowDetails />
      },
      {
        path: "/person/:id",
        element: <PersonDetails />
      },
      {
        path: "/signIn",
        element: <SingInPage />
      },

      {
        path: "/registration",
        element: <RegisterPage />
      },

      // Spread the admin routes
      ...AdminRoutes,

      // Spread the user routes
      ...UserRoutes
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
