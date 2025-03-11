import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js';
// import Park from './parks.js';

class Weather extends Model {}

Weather.init({
  // id: {
  //   type: DataTypes.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  // },
  park_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  forecast: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  // updated_at: {
  //   type: DataTypes.DATE,
  //   defaultValue: DataTypes.NOW,
  // },
}, {
  sequelize,
  modelName: 'Weather',
  tableName: 'weather',
  timestamps: false,
});

// Define association
// Weather.belongsTo(Park, { foreignKey: 'park_id', targetKey: 'park_id' });

export default Weather;
