'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weather extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Weather.init({
    parkId: DataTypes.INTEGER,
    temperature: DataTypes.FLOAT,
    condition: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Weather',
  });
  return Weather;
};