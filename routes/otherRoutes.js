import express from "express";
import { contact, courseRequest, getDashboardStats } from "../controllers/otherController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/contact").post(isAuthenticated,contact)
router.route("/courserequest").post(isAuthenticated,courseRequest)
router.route("/admin/stats").get(isAuthenticated,authorizedAdmin,getDashboardStats)


export default router;
 