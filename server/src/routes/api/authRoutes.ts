import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

interface AuthRequestBody {
  email: string;
  username: string;
  password: string;
}

router.post("/register", async (req: Request<{}, {}, AuthRequestBody>, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, username, password: hashedPassword });

    const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully!", token, user: { username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required." });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
