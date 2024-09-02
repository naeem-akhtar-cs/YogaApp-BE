import express from "express";
import subscriptionController from "../controllers/subscription.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/getUserSubscriptions', authMiddleware, subscriptionController.getUserSubscriptions);
router.delete('/unsubscribe', authMiddleware, subscriptionController.unsubscribeFromProtocol);

export default router;