// import "../config/loadEnv.js";
import express from "express";
import sequelize from "./db/config/connection";
import authRoutes from "./routes/api/authRoutes";
import parkRoutes from "./routes/api/parkRoutes";
import parksApiProxy from "./routes/api/parksApiProxy";
import weatherRoutes from "./routes/api/weatherRoutes";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
console.log("🧪 DB_USER loaded as:", process.env.DB_USER);

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/api/weather", weatherRoutes);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/parks", parkRoutes);
app.use("/api/parks", parksApiProxy);
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

const startServer = async () => {
  try {
    console.log("🔐 Loaded DB credentials:", {
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
    });

    await sequelize.authenticate();
    console.log("✅ Database connected.");

    await sequelize.sync();
    console.log("✅ Models synced.");

    app.listen(PORT, () => {
      console.log(`🌐 Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
