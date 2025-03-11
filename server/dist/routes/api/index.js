import express from "express";
const router = express.Router();
import parkRoutes from "./parkRoutes.js";
import weatherRoutes from "./weatherRouts.js";
/* GET home page. */
router.use("/park", parkRoutes);
router.use("/weather", weatherRoutes);
export default router;
