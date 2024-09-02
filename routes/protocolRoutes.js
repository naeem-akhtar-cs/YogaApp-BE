import express from "express";
import protocolController from "../controllers/protocol.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/getProtocols', protocolController.getProtocols);
router.post('/getProtocolInfo', protocolController.getProtocolInfo);
router.get('/getUserProtocols', authMiddleware, protocolController.getUserProtocols);
router.get('/getProtocolTimeframes', authMiddleware, protocolController.getProtocolTimeframes);
router.get('/getTimeframeExercise', authMiddleware, protocolController.getTimeframeExercise);

// router.get('/getVideos', protocolController.getVideos);

export default router;
