import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const ratingApi = createApi({
    reducerPath: "ratingApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Rating"],
    endpoints: (builder) => ({
        // 🔘 Add a rating
        addRating: builder.mutation({
            query: (body) => ({
                url: "/rating/createRating",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Rating"],
        }),

        // 🔘 Update a rating
        updateRating: builder.mutation({
            query: ({ tmdbId, value }) => ({
                url: `/rating/${tmdbId}/update`,
                method: "PUT",
                body: { value },
            }),
            invalidatesTags: ["Rating"],
        }),

        // 🔘 Delete a rating
        deleteRating: builder.mutation({
            query: ({ tmdbId, mediaType }) => ({
                url: `/rating/${tmdbId}/${mediaType}/deleteRating`,
                method: "DELETE",
            }),
            invalidatesTags: ["Rating"],
        }),

        // Get all ratings for the current user
        getAllUserRatings: builder.query({
            query: () => "/rating/userRatings",
            providesTags: ["Rating"],
        }),

        // 🔘 Get the current user's rating for a movie or TV show
        getRating: builder.query({
            query: (tmdbId) => `/rating/getUserRating/${tmdbId}`,
            providesTags: ["Rating"],
        }),


    })
})



export const { useAddRatingMutation,
    useUpdateRatingMutation, useDeleteRatingMutation, useGetRatingQuery, useGetAllUserRatingsQuery } = ratingApi;