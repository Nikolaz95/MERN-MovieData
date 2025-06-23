import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const watchListApi = createApi({
    reducerPath: "watchListApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["WatchList"],
    endpoints: (builder) => ({

        getWatchlist: builder.query({
            query: () => "/watchlist/me",
            providesTags: ["WatchList"],
        }),

        addToWatchlist: builder.mutation({
            query: (body) => ({
                url: "/watchlist/add",
                method: "POST",
                body,
            }),
            invalidatesTags: ["WatchList"],
        }),

        removeFromWatchlist: builder.mutation({
            query: ({ tmdbId, mediaType }) => ({
                url: `/watchlist/${tmdbId}/${mediaType}`,
                method: "DELETE",
            }),
            invalidatesTags: ["WatchList"],
        }),
    })
});


export const { useAddToWatchlistMutation,
    useGetWatchlistQuery,
    useRemoveFromWatchlistMutation } = watchListApi;