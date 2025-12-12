import sequelize from "../../config/database.js";
import Artist from "./artist.js";
import Booking from "./booking.js";
import EventInfo from "./event.js";

Artist.hasMany(Booking, { foreignKey: "artist_id", as: "bookings" });
Booking.belongsTo(Artist, { foreignKey: "artist_id", as: "artist" });

export {
  sequelize,
  Artist,
  Booking,
  EventInfo
};
