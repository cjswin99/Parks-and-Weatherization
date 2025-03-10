import express from 'express';
import { getParksData } from '../api/parksApi';
import Park from '../models/Parks'; // Ensure the correct relative path to your Parks.ts file

const router = express.Router();

// GET route to fetch parks by state
router.get('/', async (req, res) => {
  try {
    const state = req.query.state as string;
    if (!state) return res.status(400).json({ error: "State is required" });

    const data = await getParksData(state); // Fetch data from external API
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch parks data' });
  }
});

// POST route to add a new park to the database
router.post('/', async (req, res) => {
  try {
    const { park_id, name, city, state, latitude, longitude } = req.body;

    if (!park_id || !name || !state || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: "Missing required park fields" });
    }

    const newPark = await Park.create({
      park_id,
      name,
      city,
      state,
      latitude,
      longitude,
    });

    res.status(201).json(newPark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create park' });
  }
});

export default router;
