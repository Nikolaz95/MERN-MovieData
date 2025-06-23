import mongoose from "mongoose";


const ratingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        mediaType: {
            type: String,
            enum: ["tv", "movie"],
            required: true
        },
        tmdbId: {
            type: Number,
            required: true
        },
        titleName: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true,
            min: 0.5,
            max: 10
        }
    },
    { timestamps: true }
);


export default mongoose.model("Rating", ratingSchema);
