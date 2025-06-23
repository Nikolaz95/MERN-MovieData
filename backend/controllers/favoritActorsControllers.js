
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import FavoritActorList from "../models/favoriteActorSchema.js";


// ➕ Add to favoritActorList /favoritActorList/add
export const addFavoritActorList = catchAsyncErrors(async (req, res, next) => {
    const { actorId, mediaType, actorName, actorPoster } = req.body;
    const userId = req.user._id;
    // 1️⃣ Check if the media already exists in the user's watchlist
    const existingItem = await FavoritActorList.findOne({
        user: userId,
        actorId,
        mediaType,
    });
    if (existingItem) {
        return res.status(400).json({
            success: false,
            message: "Actor is already in Your Favorit List !"
        });
    }
    // 2️⃣ Create new watchlist item
    const favoritActorListItems = await FavoritActorList.create({
        user: userId,
        actorId,
        mediaType,
        actorName,
        actorPoster,
    });
    // 3️⃣ Send success response
    res.status(201).json({
        success: true,
        message: "Actor added to your Favorit List",
        favoritActorListItems,
    });
});


// Get  single user favoritList  /favoritActorList/getUserList
export const getUserFavoritActorList = catchAsyncErrors(async (req, res, next) => {
    const { mediaType } = req.query; // Only keep mediaType filter
    const userId = req.user._id;

    // Base query - now actually used in the find()
    const query = { user: userId };

    // Add mediaType filter if provided
    if (mediaType && ["person"].includes(mediaType)) {
        query.mediaType = mediaType;
    }

    const favoritActorsList = await FavoritActorList.find(query) // Now using the query object
        .sort({ addDate: -1 }); // Newest first

    res.status(200).json({
        success: true,
        count: favoritActorsList.length,
        favoritActorsList
    });
});


// ❌ Remove from favoritList /favoritActorList/:tmdbId/:mediaType
export const removeFromFavoritActorList = catchAsyncErrors(async (req, res, next) => {
    const { actorId, mediaType } = req.params; // Extracted from URL
    const userId = req.user._id;

    console.log("Removing from Favorit Actor List:", { actorId, mediaType, userId });

    const deletedItem = await FavoritActorList.findOneAndDelete({
        user: userId,
        actorId: Number(actorId),
        mediaType
    });

    if (!deletedItem) {
        return next(new ErrorHandler("Item not found in Favorit Actor List", 404));
    }

    res.status(200).json({
        success: true,
        message: "Removed from Favorit Actor List"
    });
});