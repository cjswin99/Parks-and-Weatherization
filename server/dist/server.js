import express from 'express';
// import sequelize from "./config/connection.js"
// import parksRoutes from './routes/api/parkRoutes.js';
// import weatherRoutes from './routes/api/weatherRouts.js';
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
// app.use('/api/parks', parksRoutes);
// app.use('/api/weather', weatherRoutes);
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
app.use(routes);
// sequelize.sync({force: true}).then(() => {
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
// });
