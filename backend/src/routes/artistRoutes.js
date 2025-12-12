
import express from "express";
import { getArtists } from "../controllers/artistController";
import { getArtistsById } from "../controllers/artistController";

export const router = express.Router();
router.get ("/" , getArtists);
router.get("/:id", getArtistsById);
export default router;