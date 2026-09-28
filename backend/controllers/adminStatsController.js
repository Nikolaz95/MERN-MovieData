import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import WatchList from "../models/watchListSchema.js";
import FavoritList from "../models/favoriteListSchema.js";
import FavoritActorsList from "../models/favoriteActorSchema.js";
import Rating from "../models/userRatingSchema.js";
import Reviews from "../models/reviewstShema.js";

const TOP_LIMIT = 10;

// most added movies / tv shows in a list (every item is one document per user)
const topTitles = (Model) => Model.aggregate([
    {
        $group: {
            _id: { tmdbId: "$tmdbId", mediaType: "$mediaType" },
            count: { $sum: 1 },
            titleName: { $last: "$titleName" },
            posterMedia: { $last: "$posterMedia" },
        },
    },
    { $sort: { count: -1, titleName: 1 } },
    { $limit: TOP_LIMIT },
    {
        $project: {
            _id: 0,
            tmdbId: "$_id.tmdbId",
            mediaType: "$_id.mediaType",
            titleName: 1,
            posterMedia: 1,
            count: 1,
        },
    },
]);

// highest average user rating (more ratings wins a tie)
const topRated = () => Rating.aggregate([
    {
        $group: {
            _id: { tmdbId: "$tmdbId", mediaType: "$mediaType" },
            avgRating: { $avg: "$value" },
            count: { $sum: 1 },
            titleName: { $last: "$titleName" },
        },
    },
    { $sort: { avgRating: -1, count: -1, titleName: 1 } },
    { $limit: TOP_LIMIT },
    {
        $project: {
            _id: 0,
            tmdbId: "$_id.tmdbId",
            mediaType: "$_id.mediaType",
            titleName: 1,
            count: 1,
            avgRating: { $round: ["$avgRating", 1] },
        },
    },
]);

// actors saved by the most users
const topActors = () => FavoritActorsList.aggregate([
    {
        $group: {
            _id: "$actorId",
            count: { $sum: 1 },
            actorName: { $last: "$actorName" },
            actorPoster: { $last: "$actorPoster" },
        },
    },
    { $sort: { count: -1, actorName: 1 } },
    { $limit: TOP_LIMIT },
    { $project: { _id: 0, actorId: "$_id", actorName: 1, actorPoster: 1, count: 1 } },
]);

// movies / tv shows with the most reviews
const topReviewed = () => Reviews.aggregate([
    {
        $group: {
            _id: { tmdbId: "$tmdbId", mediaType: "$mediaType" },
            count: { $sum: 1 },
            titleName: { $last: "$titleName" },
            lastReviewAt: { $max: "$createdAt" },
        },
    },
    { $sort: { count: -1, lastReviewAt: -1 } },
    { $limit: TOP_LIMIT },
    {
        $project: {
            _id: 0,
            tmdbId: "$_id.tmdbId",
            mediaType: "$_id.mediaType",
            titleName: 1,
            count: 1,
            lastReviewAt: 1,
        },
    },
]);


// Admin dashboard: top 10 lists + totals  =>  /api/admin/stats/top
export const getTopStats = catchAsyncErrors(async (req, res, next) => {
    const [
        watchList, favoritList, rated, actors, reviewed,
        users, watchListCount, favoritListCount, ratingCount, actorCount, reviewCount,
    ] = await Promise.all([
        topTitles(WatchList),
        topTitles(FavoritList),
        topRated(),
        topActors(),
        topReviewed(),
        User.countDocuments(),
        WatchList.countDocuments(),
        FavoritList.countDocuments(),
        Rating.countDocuments(),
        FavoritActorsList.countDocuments(),
        Reviews.countDocuments(),
    ]);

    res.status(200).json({
        totals: {
            users,
            watchList: watchListCount,
            favoritList: favoritListCount,
            ratings: ratingCount,
            favoritActors: actorCount,
            reviews: reviewCount,
        },
        top: { watchList, favoritList, rated, actors, reviewed },
    });
});
