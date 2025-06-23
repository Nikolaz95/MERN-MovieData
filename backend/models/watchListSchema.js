import mongoose from "mongoose";


const watchListSchema = new mongoose.Schema(
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
        titleName: {
            type: String,
            required: true
        },
        mediaType: {
            type: String,
            enum: ["tv", "movie"],
            required: true
        },
        posterMedia: {
            type: String,
            required: true
        },
        addDate: {
            type: Date,
            default: () => new Date(new Date().toLocaleString())
        }
    },);

export default mongoose.model("WatchList", watchListSchema);
