import dotenv from "dotenv";
import express from 'express';
// import { getWeatherData } from '../api/weatherApi';
// import {Weather} from '../../models/index.js';
dotenv.config();
const router = express.Router();
router.get('/:lat/:lon', async (req, res) => {
    try {
        const lat = req.params.lat;
        const lon = req.params.lon;
        if (!lat || !lon)
            return res.status(400).json({ error: "Location is required" });
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});
router.post('/', async (req, res) => {
    try {
        const { park_id, forecast } = req.body;
        if (!park_id || !forecast) {
            return res.status(400).json({ error: "Missing required weather fields" });
        }
        // const newWeather = await Weather.create({
        //   park_id,
        //   forecast,
        // });
        // res.status(201).json(newWeather);
        res.status(201).json({ message: "Hello" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add weather forecast' });
    }
});
export default router;
