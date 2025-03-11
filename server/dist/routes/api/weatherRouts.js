import dotenv from "dotenv";
import express from 'express';
dotenv.config();
const router = express.Router();
router.get('/:lat/:lon', async (req, res) => {
    try {
        const lat = req.params.lat;
        const lon = req.params.lon;
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch parks data' });
    }
});
export default router;
