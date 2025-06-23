import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const reviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Reviews"],
    endpoints: (builder) => ({
        // 🔘 Create Review
        addReview: builder.mutation({
            query: (body) => ({
                url: "/review/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Reviews"],
        }),

        // 🔘 Get Reviews for a Movie/TV Show
        getReviews: builder.query({
            query: (tmdbId) => `/review/${tmdbId}`,
            providesTags: ["Reviews"],
        }),

        // 🔘 Delete Review
        deleteReview: builder.mutation({
            query: (reviewId) => ({
                url: `/review/delete/${reviewId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Reviews"],
        }),
    }),
});


export const { useAddReviewMutation, useGetReviewsQuery, useDeleteReviewMutation } = reviewsApi;