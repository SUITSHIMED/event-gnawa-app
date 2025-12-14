
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database.js";
import "./src/models/index.js";
import { runSeeder } from "./src/utils/seed.js";


import artistRoutes from "./src/routes/artistRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/artists", artistRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/event", eventRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
  
    console.log(" DB connected");
      
    await sequelize.sync({ alter: true });
    console.log(" Models synced (tables created/updated)");

    await runSeeder();

    app.listen(PORT, () => console.log(`Server running on :${PORT}`));
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

start();
