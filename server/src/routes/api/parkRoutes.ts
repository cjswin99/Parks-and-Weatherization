import express from 'express';
import parksService from '../../service/parksService';

const router = express.Router();

router.get('/:state', async (req, res) => {
  const state = req.params.state;
  try {
    const parks = await parksService.getParksByState(state);
    res.json(parks);
  } catch (error) {
    console.error("❌ Parks API error:", error);
    res.status(500).json({ error: 'Failed to fetch parks' });
  }
});

export default router;
