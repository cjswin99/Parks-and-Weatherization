import express from "express";
import { authenticateToken } from "../../middleware/authMiddleware.js";
import { Park } from "../../models/Park.js";
const router = express.Router();
// GET all parks (protected route)
router.get("/", authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const parks = await Park.findAll();
        res.json(parks);
    }
    catch (error) {
        console.error("Error fetching parks:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;
