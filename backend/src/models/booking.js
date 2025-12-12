import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import e from "express";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  artist_id: { type: DataTypes.UUID, allowNull: true }, 
  seats: { type: DataTypes.INTEGER, defaultValue: 1 },
  status: { type: DataTypes.STRING, defaultValue: 'confirmed' },
  event_date: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: "bookings",
});

export default Booking;
