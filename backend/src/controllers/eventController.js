import { EventInfo } from "../models/index.js";
export const getEventInfo = async ( req , res) => {
    try {
        const eventInfo = await EventInfo.findAll();
        res.json(eventInfo);
    } catch (err) {
        res.status(500).json({err : " server error "});
    }
};
 export const getEventInfoById = async (req , res ) => {
    try {
        const eventInfo = await EventInfo.findByPk(req.params.id);
        if(!eventInfo) {
            return res.status(404).json({err : "event infos not found "})
        };
    }catch (err){
        res.status(500).json({err : "server errror"});
    }
 }