import { Artist } from "../models";
 export const getArtists = async (req , res) => {
    try {
        const artists = await Artist.findAll();
        res.json(artists);
    } catch (err) {
        res.status(500).json({err : "Server error"});
    }
 };
  export const getAllArtists = async (req , res) => {
    try {
        const artists = await Artist.findByPk(req.params.id);
        if(!artists) {
            return res.status(404).json({err : "Artist not found"})
        }
        res.json(artists);
    } catch (err) {
        res.status(500).json({err : "Server error"});
    }
};