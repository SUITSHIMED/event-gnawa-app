import { EventInfo } from "../models/index.js";
export const getEventInfo = async (req , res) => {
  try {
    const eventInfo = await EventInfo.findOne();
    res.status(200).json(eventInfo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

 export const getEventInfoById = async (req, res) => {
  try {
    const eventInfo = await EventInfo.findByPk(req.params.id);
    if (!eventInfo) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(eventInfo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
