import express from "express";
import { getEventInfo } from "../controllers/eventController.js";
import { getEventInfoById } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEventInfo);
router.get("/:id", getEventInfoById);

export default router;
