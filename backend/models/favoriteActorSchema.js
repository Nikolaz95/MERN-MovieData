import mongoose from "mongoose";


const favoritActorsListSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        actorId: {
            type: Number,
            required: true
        },
        mediaType: {
            type: String,
            enum: ["person"],
            required: true
        },
        actorName: {
            type: String,
            required: true
        },
        actorPoster: {
            type: String,
            required: true
        },
        addDate: {
            type: Date,
            default: () => new Date(new Date().toLocaleString())
        }
    },);

export default mongoose.model("FavoritActorsList", favoritActorsListSchema);