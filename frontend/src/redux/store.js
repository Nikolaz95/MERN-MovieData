import { watchListApi } from './api/watchlistApi.js';
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import userReducer from "./features/userSlice.js"
import { ratingApi } from './api/ratingApi.js';
import { reviewsApi } from './api/reviewsApi.js';
import { favoritListApi } from './api/favoritListApi.js';
import { favoritActorListApi } from './api/favoritActorsListApi.js';

export const store = configureStore({
    reducer: {
        auth: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [watchListApi.reducerPath]: watchListApi.reducer,
        [ratingApi.reducerPath]: ratingApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        [favoritListApi.reducerPath]: favoritListApi.reducer,
        [favoritActorListApi.reducerPath]: favoritActorListApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            userApi.middleware,
            watchListApi.middleware,
            ratingApi.middleware,
            reviewsApi.middleware,
            favoritListApi.middleware,
            favoritActorListApi.middleware,
        ]),
});