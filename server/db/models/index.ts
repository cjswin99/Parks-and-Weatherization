import sequelize from '../config/connection.js';
// import { ParkFactory } from './parks2.js';
// import { WeatherFactory } from './weather2.js';
import Park from './parks.js';
import Weather from './Weather.js';

    // const Park = ParkFactory(sequelize);
    // const Weather = WeatherFactory(sequelize);

    // Park.hasMany(Weather, { foreignKey: 'assignedParkId'});
    // Weather.belongsTo(Park, { foreignKey: 'assignedParkId', as: 'assignedPark'});

export { Park, Weather };
