import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./db/config/connection.js";
import parkRoutes from "./routes/api/parkRoutes.js";
import authRoutes from "./routes/api/authRoutes.js";
import userRoutes from "./routes/api/userRoutes.js";
import weatherRoutes from "./routes/api/weatherRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/parks", parkRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/weather", weatherRoutes);

sequelize.authenticate().then(() => {
  console.log("✅ Database connected.");
  return sequelize.sync();
}).then(() => {
  console.log("✅ Models synced.");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => console.error("❌ Server startup error:", err));
