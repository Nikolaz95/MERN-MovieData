import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { addRating, deleteRating, getAllUserRatings, getUserRatingByTmdbId, updateRating } from "../controllers/ratingController.js";

const router = express.Router();
//user route
//create rating
router.route("/rating/createRating").post(isAuthenticatedUser, addRating);

//update rating
router.route("/rating/:tmdbId/update").put(isAuthenticatedUser, updateRating);

//get aget single rating for a specific tmdbId by the logged-in user.
router.route("/rating/getUserRating/:tmdbId").get(isAuthenticatedUser, getUserRatingByTmdbId);


//Get all ratings from the logged-in user
router.route("/rating/userRatings").get(isAuthenticatedUser, getAllUserRatings);


//delete rating
router.route("/rating/:tmdbId/:mediaType/deleteRating").delete(isAuthenticatedUser, deleteRating);


//admin route


export default router;