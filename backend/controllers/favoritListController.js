import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import FavoritList from "../models/favoriteListSchema.js";

// ➕ Add to favoritList api/favoritList/add
export const addToFavoritList = catchAsyncErrors(async (req, res, next) => {
    const { tmdbId, mediaType, titleName, posterMedia } = req.body;
    const userId = req.user._id;
    // 1️⃣ Check if the media already exists in the user's watchlist
    const existingItem = await FavoritList.findOne({
        user: userId,
        tmdbId,
        mediaType,
    });
    if (existingItem) {
        return res.status(400).json({
            success: false,
            message: "Item already in Favorit List !"
        });
    }
    // 2️⃣ Create new watchlist item
    const favoritListItems = await FavoritList.create({
        user: userId,
        tmdbId,
        mediaType,
        titleName,
        posterMedia,
    });
    // 3️⃣ Send success response
    res.status(201).json({
        success: true,
        message: "Added to Favorit List",
        favoritListItems,
    });
});


// Get  single user favoritList  api/favoritList/getUserList
export const getUserFavoritList = catchAsyncErrors(async (req, res, next) => {
    const { mediaType } = req.query; // Only keep mediaType filter
    const userId = req.user._id;

    // Base query - now actually used in the find()
    const query = { user: userId };

    // Add mediaType filter if provided
    if (mediaType && ['movie', 'tv'].includes(mediaType)) {
        query.mediaType = mediaType;
    }

    const favoritList = await FavoritList.find(query) // Now using the query object
        .sort({ addDate: -1 }); // Newest first

    res.status(200).json({
        success: true,
        count: favoritList.length,
        favoritList
    });
});


// ❌ Remove from favoritList /watchlist/:tmdbId/:mediaType
export const removeFromFavoritList = catchAsyncErrors(async (req, res, next) => {
    const { tmdbId, mediaType } = req.params; // Extracted from URL
    const userId = req.user._id;

    console.log("Removing from Favorit List:", { tmdbId, mediaType, userId });

    const deletedItem = await FavoritList.findOneAndDelete({
        user: userId,
        tmdbId: Number(tmdbId),
        mediaType
    });

    if (!deletedItem) {
        return next(new ErrorHandler("Item not found in Favorit List", 404));
    }

    res.status(200).json({
        success: true,
        message: "Removed from Favorit List"
    });
});