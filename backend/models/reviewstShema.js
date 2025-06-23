import mongoose from "mongoose";


const reviewstShema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        tmdbId: {
            type: Number,
            required: true
        },
        mediaType: {
            type: String,
            enum: ["tv", "movie"],
            required: true
        },
        titleName: {
            type: String,
            required: true
        },
        avatar: {
            public_id: String,
            url: String,
        },
        review: {
            type: String,
            required: true,
            trim: true
        },
    },
    { timestamps: true }
);

export default mongoose.model("Reviews", reviewstShema);
