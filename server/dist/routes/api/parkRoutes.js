import express from "express";
import { authenticateToken } from "../../middleware/authMiddleware.js";
import { Park } from "../../models/Park.js";
const router = express.Router();
router.get("/", authenticateToken, async (req, res) => {
    try {
        const { state } = req.query;
        console.log("🌎 State query received:", state);
        const whereClause = state ? { state } : {};
        const parks = await Park.findAll({ where: whereClause });
        console.log("🌲 Parks returned:", parks.length);
        res.json(parks);
    }
    catch (error) {
        console.error("❌ Error fetching parks:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;
