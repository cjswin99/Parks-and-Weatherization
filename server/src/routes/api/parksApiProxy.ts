import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  const { state } = req.query;

  if (!state) return res.status(400).json({ error: "Missing state parameter" });

  try {
    const apiKey = process.env.API_KEY;
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=20&api_key=${apiKey}`;

    console.log("🌐 Fetching NPS API:", url);
    const response = await fetch(url);
    const data = await response.json();

    const simplified = data.data.map((park: any) => ({
      id: park.id,
      fullName: park.fullName,
      latitude: park.latitude,
      longitude: park.longitude,
    }));

    res.json(simplified);
  } catch (err) {
    console.error("❌ NPS API Error:", err);
    res.status(500).json({ error: "Failed to fetch parks from NPS API" });
  }
});

export default router;
