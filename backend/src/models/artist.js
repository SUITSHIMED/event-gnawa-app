import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Artist = sequelize.define("Artist", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT },
  photo_url: { type: DataTypes.STRING },
  schedule: { type: DataTypes.JSONB }, 
}, {
  tableName: "artists",
});

export default Artist;
