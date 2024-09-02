import express from "express";
import paymentController from "../controllers/payment.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/createSubscription', authMiddleware, paymentController.createSubscription);
router.post('/createPaymentIntent', authMiddleware, paymentController.createPaymentIntent);

export default router;
