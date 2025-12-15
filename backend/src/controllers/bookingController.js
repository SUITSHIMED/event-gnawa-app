import { randomUUID } from 'node:crypto';
import { Booking, Artist } from "../models/index.js";
export const createBooking = async (req, res) => {
    try {
        let { full_name, email, event_date, artist_id, seats, phone } = req.body;
        const code = randomUUID().slice(0, 6).toUpperCase();

        // If artist_id not provided, use first available artist
        if (!artist_id) {
            const firstArtist = await Artist.findOne();
            if (!firstArtist) {
                return res.status(400).json({ error: "No artists available for booking" });
            }
            artist_id = firstArtist.id;
        }

        const newBooking = await Booking.create({
            code, full_name, email, event_date, artist_id, seats, phone
        });
        
        res.status(201).json(newBooking);
    } catch (err) {
        // ⚠️ IMPROVED ERROR HANDLING: Log the Sequelize error and return detail
        console.error("Booking creation failed:", err); 
        
        // Check for specific validation errors (e.g., missing field)
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                error: "Validation failed. Please ensure all required fields are correct.", 
                details: err.errors.map(e => e.message)
            });
        }
        
        // Default Server Error
        res.status(500).json({ error: "Internal Server Error. Cannot create booking." });
    }
};
    export const getBookingByCode = async (req, res )=>{
        try {
            const booking = await Booking.findOne({
                where: { code : req.params.code }
            }); 
            if(!booking) {
                return res.status(404).json({ err : "Booking not found"});
            }
            res.json(booking);
        } catch (err){
            res.status(500).json({err : "cannot create booking by code "})

        }
    };
    export const getBookingByEmail = async (req , res)=>{
        try{
            const booking = await Booking.findAll({
                where: { email : req.params.email }
            });
            res.json(booking);
        }catch (err){
            res.status(500).json({err : "cannot get booking by email"})
        }
    };
