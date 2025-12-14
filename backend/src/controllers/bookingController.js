import { randomUUID } from 'node:crypto';
import { Booking } from "../models/index.js";
export const createBooking = async (req , res) => {
    try {
        const { full_name, email, event_date, artist_id, seats, phone }= req.body ;
        const code = randomUUID().slice(0,6).toUpperCase();
        const newBooking = await Booking.create({
            code, full_name, email, event_date, artist_id, seats, phone
        });
            res.status(201).json(newBooking);
        } catch (err){
            res.status(500).json({err : "cannot create booking"})
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
