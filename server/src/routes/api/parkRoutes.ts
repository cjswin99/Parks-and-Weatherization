import express from 'express';
import { getWeatherData } from '../api/weatherApi';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const location = req.query.location as string;
    if (!location) return res.status(400).json({ error: "Location is required" });

    const data = await getWeatherData(location);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default router;
