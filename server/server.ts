import express from 'express';
import parksRoutes from './routes/parksRoutes';
import weatherRoutes from './routes/weatherRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/parks', parksRoutes);
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
