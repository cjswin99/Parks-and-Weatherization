import express, { Request, Response } from "express";
import { authenticateToken } from "../../middleware/authMiddleware.js";
import { Park } from "../../models/Park.js";

const router = express.Router();

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

// GET all parks (protected route)
router.get("/", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const parks = await Park.findAll();
    res.json(parks);
  } catch (error) {
    console.error("Error fetching parks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
