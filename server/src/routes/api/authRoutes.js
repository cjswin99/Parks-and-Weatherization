import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
// Register User (Signup)
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password required." });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists." });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: "User created successfully!", user: newUser });
    }
    catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Login User
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password required." });
        }
        // Find user
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials." });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials." });
        }
        // Generate JWT Token
        const jwtSecret = process.env.JWT_SECRET || "default_secret_key"; // Use a fallback if JWT_SECRET is undefined

        const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
        expiresIn: "1h",
        });
    }
    catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;
