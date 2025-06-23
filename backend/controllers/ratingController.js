
import Rating from "../models/userRatingSchema.js";


// ➕ Add a rating /rating/createRating
export const addRating = async (req, res) => {
    try {
        const { tmdbId, mediaType, titleName, value } = req.body;

        const existingRating = await Rating.findOne({
            user: req.user._id,
            tmdbId,
        });
        if (existingRating) {
            return res.status(400).json({ message: "You already rated this media." });
        }

        const rating = await Rating.create({
            user: req.user._id,
            tmdbId,
            mediaType,
            titleName,
            value,
        });
        res.status(201).json({ message: "Rating added", rating });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 🔄 Update a rating /rating/:tmdbId/update
export const updateRating = async (req, res) => {
    try {
        const { tmdbId } = req.params;
        const { value } = req.body;

        const rating = await Rating.findOneAndUpdate(
            { user: req.user._id, tmdbId },
            { value },
            { new: true }
        );

        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }

        res.status(200).json({ message: "Rating updated", rating });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//❌ Delete a rating  /rating/:tmdbId/:mediaType/deleteRating
export const deleteRating = async (req, res) => {
    try {
        const { tmdbId, mediaType } = req.params;

        const rating = await Rating.findOneAndDelete({
            user: req.user._id,
            tmdbId,
            mediaType
        });

        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }

        res.status(200).json({ message: "Rating deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get single rating for a specific tmdbId by the logged-in user. /rating/getRating/:tmdbId
export const getUserRatingByTmdbId = async (req, res) => {
    try {
        const { tmdbId } = req.params;
        const rating = await Rating.findOne({ user: req.user._id, tmdbId });
        if (!rating) {
            return res.status(404).json({ message: "No rating found" });
        }
        res.status(200).json({ rating }); // Send the rating object back
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🚀 Get all ratings from the logged-in user
// GET /rating/userRatings
export const getAllUserRatings = async (req, res) => {
    try {
        const ratings = await Rating.find({ user: req.user._id });
        res.status(200).json({ ratings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📋 Get all ratings from all users (admin only)
// api/admin/ratings
export const getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.find().populate("user", "username email");

        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};