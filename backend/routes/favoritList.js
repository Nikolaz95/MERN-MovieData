import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { addToFavoritList, getUserFavoritList, removeFromFavoritList } from "../controllers/favoritListController.js";


const router = express.Router();



router.route("/favoritList/add").post(isAuthenticatedUser, addToFavoritList);
router.route("/favoritList/getUserList").get(isAuthenticatedUser, getUserFavoritList);


router.route("/favoritList/:tmdbId/:mediaType").delete(isAuthenticatedUser, removeFromFavoritList);

export default router;