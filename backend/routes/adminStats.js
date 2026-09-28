import express from "express";
import { getTopStats } from "../controllers/adminStatsController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

// admin only
router.route("/admin/stats/top").get(isAuthenticatedUser, authorizeRoles("admin"), getTopStats);

export default router;
