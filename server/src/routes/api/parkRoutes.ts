import express from 'express';
<<<<<<< HEAD
import dotenv from 'dotenv';
dotenv.config()

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await fetch(`${process.env.NPS_API_BASE_URL} `)
})
  
=======
import parkService from '../../service/parkService.js';

const router = express.Router();

router.get('/:state', async (req, res) => {
  try {
    const targetState = req.params.state;

    const parks = await parkService.getParksByState(targetState)


    res.json(parks)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});
>>>>>>> cc939d237484e986441555b36d0a443d737fb5de

export default router;



let cityLocation = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`)
let cityLocationData = await cityLocation.json()
let weather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLocationData[0].lat}&lon=${cityLocationData[0].lon}&units=imperial&appid=${process.env.API_KEY}`)