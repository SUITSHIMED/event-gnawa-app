import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const EventInfo = sequelize.define("EventInfo", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  venue: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  banner_url: { type: DataTypes.STRING },
  contact_email: { type: DataTypes.STRING }
}, {
  tableName: "event_info",
});

export default EventInfo;
