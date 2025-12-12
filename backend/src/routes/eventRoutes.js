import express from "express";
import { getEventInfo } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEventInfo);

export default router;
