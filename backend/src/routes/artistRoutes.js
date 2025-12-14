
import express from "express";
import { getArtists, getAllArtists } from "../controllers/artistController.js";

const router = express.Router();
router.get("/", getArtists);
router.get("/:id", getAllArtists);

export default router;