import express from "express";
import { createBooking , getBookingByEmail, getBookingByCode } from "../controllers/bookingController.js";

const router = express.Router();

router.post ("/", createBooking);
router.get ("/:code", getBookingByCode);
router.get ("/email/:email", getBookingByEmail);

export default router;
