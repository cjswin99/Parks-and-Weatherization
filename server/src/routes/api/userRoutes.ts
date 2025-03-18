import express, { Request, Response } from "express";
import { authenticateToken } from "../../middleware/authMiddleware.js"; // ✅ Correct path
import { User } from "../../models/User.js"; // ✅ Correct path

const router = express.Router();

// Extend Request type
interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

// Example protected route
router.get("/profile", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
