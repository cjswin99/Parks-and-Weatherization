import dotenv from "dotenv";
dotenv.config();  // Load .env variables before other imports

import express from "express";
//import cors from "cors";
import parkRoutes from "./routes/api/parkRoutes.js";
import weatherRoutes from "./routes/api/weatherRoutes.js";
import authRoutes from "./routes/api/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS Middleware
//app.use(cors());

// Enable JSON & URL Encoding Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API Routes
app.use("/api/parks", parkRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
