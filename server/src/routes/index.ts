import express from "express";
const router = express.Router();

import apiRoutes from "./api/index.js"

/* GET home page. */
router.use("/api", apiRoutes)

export default router;
