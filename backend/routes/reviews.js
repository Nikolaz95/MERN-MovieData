import express from "express";

import { isAuthenticatedUser } from "../middlewares/auth.js";
import { createReview, deleteReview, getReviews } from "../controllers/reviewsControllers.js";

const router = express.Router();


//user route
router.route("/review/create").post(isAuthenticatedUser, createReview);
router.route("/review/:tmdbId").get(getReviews);
router.route("/review/delete/:reviewId").delete(isAuthenticatedUser, deleteReview);


export default router;
