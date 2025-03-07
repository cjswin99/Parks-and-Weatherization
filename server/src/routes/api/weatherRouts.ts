import express from 'express';
import { getParksData } from '../api/parksApi';

const router = express.Router();

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

export default router;
