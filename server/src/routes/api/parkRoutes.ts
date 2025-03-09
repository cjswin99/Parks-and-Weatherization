import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await fetch(`${process.env.NPS_API_BASE_URL} `)
})
  

export default router;



let cityLocation = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`)
let cityLocationData = await cityLocation.json()
let weather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLocationData[0].lat}&lon=${cityLocationData[0].lon}&units=imperial&appid=${process.env.API_KEY}`)