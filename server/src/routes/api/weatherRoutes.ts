import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Weather API error:", error);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

router.get("/forecast", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Forecast API error:", error);
    res.status(500).json({ error: "Failed to fetch forecast" });
  }
});

export default router;
