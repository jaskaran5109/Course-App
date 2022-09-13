import express from "express";
import { buySubscription, cancelSubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/subscribe").get(isAuthenticated,buySubscription)
router.route("/paymentVerification").post(isAuthenticated,paymentVerification)
router.route("/razorpaykey").get(getRazorPayKey)
router.route("/subscribe/cancel").delete(isAuthenticated,cancelSubscription)

export default router;
 