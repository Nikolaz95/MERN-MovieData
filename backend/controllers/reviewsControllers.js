import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Reviews from "../models/reviewstShema.js";
import ErrorHandler from "../utils/errorHandler.js";


// create review
export const createReview = catchAsyncErrors(async (req, res) => {
    try {
        const { tmdbId, mediaType, review, titleName } = req.body;

        // ✅ Check if review has at least one non-whitespace character
        if (!review || !review.trim() || !/\S/.test(review)) {
            return res.status(400).json({ message: "Please write something in the review." });
        }

        const newReview = await Reviews.create({
            tmdbId,
            mediaType,
            review,
            titleName,
            user: req.user._id,
        });

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get review
export const getReviews = async (req, res) => {
    try {
        const { tmdbId } = req.params;


        const reviews = await Reviews.find({ tmdbId })
            .sort({ createdAt: -1 })
            .populate("user", "name avatar");

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// delete review

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user._id;

        const deletedReview = await Reviews.findOneAndDelete({
            _id: reviewId,
            user: userId,
        });

        if (!deletedReview) {
            return next(new ErrorHandler("Review not found or not authorized", 404));
        }

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}
