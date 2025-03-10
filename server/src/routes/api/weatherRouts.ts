import express from 'express';
import { getWeatherData } from '../api/weatherApi';
import Weather from '../models/Weather';

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

router.post('/', async (req, res) => {
  try {
    const { park_id, forecast } = req.body;

    if (!park_id || !forecast) {
      return res.status(400).json({ error: "Missing required weather fields" });
    }

    const newWeather = await Weather.create({
      park_id,
      forecast,
    });

    res.status(201).json(newWeather);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add weather forecast' });
  }
});

export default router;
