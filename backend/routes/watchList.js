import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { addToWatchList, getWatchlist, removeFromWatchList } from "../controllers/watchListController.js";

const router = express.Router();

// Add to Watch List route

// Admin-only route

router.route("/watchlist/add").post(isAuthenticatedUser, addToWatchList);
router.route("/watchlist/me").get(isAuthenticatedUser, getWatchlist);
router.route("/watchlist/:tmdbId/:mediaType").delete(isAuthenticatedUser, removeFromWatchList);
export default router;