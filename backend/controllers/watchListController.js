import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import WatchList from "../models/watchListSchema.js";
import User from "../models/user.js";


// ➕ Add to watchlist
export const addToWatchList = catchAsyncErrors(async (req, res, next) => {
    try {
        const { mediaType, tmdbId, posterMedia, titleName } = req.body;
        const userId = req.user.id;

        console.log("Adding to Watchlist:", { tmdbId, mediaType, userId, titleName });

        // Step 1: Create a new WatchList item
        const watchListItem = await WatchList.create({
            user: userId,
            mediaType,
            tmdbId,
            posterMedia,
            titleName,
        });

        // Step 3: Return the updated watchlist
        res.status(201).json({
            success: true,
            message: "Item added to watchlist successfully!",
            watchListItem,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to add item to watchlist",
        });
    }
});

// Get user's watchlist - optimized version
export const getWatchlist = catchAsyncErrors(async (req, res, next) => {
    const { mediaType } = req.query; // Only keep mediaType filter
    const userId = req.user._id;

    // Base query - now actually used in the find()
    const query = { user: userId };

    // Add mediaType filter if provided
    if (mediaType && ['movie', 'tv'].includes(mediaType)) {
        query.mediaType = mediaType;
    }

    const watchlist = await WatchList.find(query) // Now using the query object
        .sort({ addDate: -1 }); // Newest first

    res.status(200).json({
        success: true,
        count: watchlist.length,
        watchlist
    });
});

// Get any user's watchlist - ADMIN ONLY
export const getAnyUserWatchlist = async (req, res) => {
    const { userId } = req.params;

    try {
        const watchlist = await WatchList.find({ user: userId });

        if (!watchlist.length) {
            return res.status(404).json({ message: 'No watchlist found for this user.' });
        }

        res.status(200).json({ success: true, watchlist });
    } catch (error) {
        console.error("Error fetching watchlist:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// ❌ Remove from watchlist
export const removeFromWatchList = catchAsyncErrors(async (req, res, next) => {
    const { tmdbId, mediaType } = req.params; // Extracted from URL
    const userId = req.user._id;

    console.log("Removing from Watchlist:", { tmdbId, mediaType, userId });

    const deletedItem = await WatchList.findOneAndDelete({
        user: userId,
        tmdbId: Number(tmdbId),
        mediaType,

    });

    if (!deletedItem) {
        return next(new ErrorHandler("Item not found in watchlist", 404));
    }

    res.status(200).json({
        success: true,
        message: "Removed from watchlist"
    });
});
