import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const favoritActorListApi = createApi({
    reducerPath: "favoritActcorListApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["FavoritActorList"],
    endpoints: (builder) => ({
        //add to favorit actro list
        addToFavoritActorList: builder.mutation({
            query: (body) => ({
                url: "/favoritActorList/add",
                method: "POST",
                body,
            }),
            invalidatesTags: ["FavoritActorList"],
        }),

        //get user single favorit actor list
        getUserFavoritActorList: builder.query({
            query: () => "/favoritActorList/getUserList",
            providesTags: ["FavoritActorList"],
        }),

        //remove from user favorti actor list
        removeFromFavoritActorList: builder.mutation({
            query: ({ actorId, mediaType }) => ({
                url: `/favoritActorList/${actorId}/${mediaType}`,
                method: "DELETE",
            }),
            invalidatesTags: ["FavoritActorList"],
        }),
    })
})


export const { useAddToFavoritActorListMutation,
    useGetUserFavoritActorListQuery,
    useRemoveFromFavoritActorListMutation } = favoritActorListApi;