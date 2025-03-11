import express from 'express';
import Park from '../../models/parks.js'; // Ensure the correct relative path to your Parks.ts file
import parkService from '../../service/parkService.js';
const router = express.Router();
// GET route to fetch parks by state
router.get('/:state', async (req, res) => {
    try {
        const targetState = req.params.state;
        const parks = await parkService.getParksByState(targetState);
        // save the parks data to the database
        parks.forEach(async (park) => {
            await Park.create(park);
        });
        res.json(parks);
    }
    catch (error) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create park' });
    }
});
export default router;
