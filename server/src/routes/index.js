import express from "express";
import parkRoutes from "./api/parkRoutes";
import weatherRoutes from "./api/weatherRoutes.js";
import authRoutes from "./api/authRoutes";
const router = express.Router();
// Define API route prefixes
router.use("/parks", parkRoutes);
router.use("/weather", weatherRoutes);
router.use("/auth", authRoutes);
export default router;
