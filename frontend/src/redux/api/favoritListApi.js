import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const favoritListApi = createApi({
    reducerPath: "favoritListApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["FavoritList"],
    endpoints: (builder) => ({

        //add to favorit list
        addToFavoritList: builder.mutation({
            query: (body) => ({
                url: "/favoritList/add",
                method: "POST",
                body,
            }),
            invalidatesTags: ["FavoritList"],
        }),

        //get user single favorit list
        getUserFavoritList: builder.query({
            query: () => "/favoritList/getUserList",
            providesTags: ["FavoritList"],
        }),

        //remove from user favorti list
        removeFromFavoritList: builder.mutation({
            query: ({ tmdbId, mediaType }) => ({
                url: `/favoritList/${tmdbId}/${mediaType}`,
                method: "DELETE",
            }),
            invalidatesTags: ["FavoritList"],
        }),
    })
});



export const { useAddToFavoritListMutation,
    useGetUserFavoritListQuery,
    useRemoveFromFavoritListMutation } = favoritListApi;