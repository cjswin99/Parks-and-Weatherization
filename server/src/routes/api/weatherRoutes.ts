import express, { Request, Response } from "express";
import { authenticateToken } from "../../middleware/authMiddleware.js";
import { Weather } from "../../models/Weather.js"; // ✅ Singular

const router = express.Router();

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

// GET user's weather search history (protected route)
router.get("/", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const searches = await Weather.findAll({ where: { userId: req.user.id } });
    res.json(searches);
  } catch (error) {
    console.error("Error fetching weather history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST new weather search data (protected route)
router.post("/", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { location, temperature, condition } = req.body;

    if (!location || !temperature || !condition) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newSearch = await Weather.create({
      location,
      temperature,
      condition,
      userId: req.user.id,
    });

    res.status(201).json(newSearch);
  } catch (error) {
    console.error("Error saving weather search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
