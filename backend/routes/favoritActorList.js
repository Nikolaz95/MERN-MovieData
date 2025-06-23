import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { addFavoritActorList, getUserFavoritActorList, removeFromFavoritActorList } from "../controllers/favoritActorsControllers.js";



const router = express.Router();
//add favorit actor do the favorit list
router.route("/favoritActorList/add").post(isAuthenticatedUser, addFavoritActorList);

//get all users favorit actor list
router.route("/favoritActorList/getUserList").get(isAuthenticatedUser, getUserFavoritActorList);

//remove from user favorit actor list 
router.route("/favoritActorList/:actorId/:mediaType").delete(isAuthenticatedUser, removeFromFavoritActorList);

export default router;