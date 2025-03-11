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

export default router;



