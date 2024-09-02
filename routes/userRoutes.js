import express from "express";
const router = express.Router();

import authController from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/addNewProtocol", authMiddleware, userController.addNewProtocol);
router.get("/getUserDetails", authMiddleware, userController.getUserDetails);
router.post("/updateProfile", authMiddleware, userController.updateProfile);
router.post("/refreshSession", authController.refreshSession);
router.post("/signout", authMiddleware, authController.signout);

export default router;
