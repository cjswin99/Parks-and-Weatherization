import sequelize from './db';
import Park from './models/Park';
import Weather from './models/Weather';

sequelize.sync()  // Optionally, use { force: true } during development to drop and recreate tables
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => console.error('Error synchronizing database:', err));
