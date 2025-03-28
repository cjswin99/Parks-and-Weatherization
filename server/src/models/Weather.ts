import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../db/config/connection.js";

interface WeatherAttributes {
  id: number;
  parkId: string;
  date: string;
  description?: string;
  tempHigh?: number;
  tempLow?: number;
}

interface WeatherCreationAttributes extends Optional<WeatherAttributes, "id" | "description" | "tempHigh" | "tempLow"> {}

class Weather extends Model<WeatherAttributes, WeatherCreationAttributes> implements WeatherAttributes {
  public id!: number;
  public parkId!: string;
  public date!: string;
  public description?: string;
  public tempHigh?: number;
  public tempLow?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Weather.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    parkId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    tempHigh: {
      type: DataTypes.FLOAT,
    },
    tempLow: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "Weather",
    tableName: "Weather",
    timestamps: true,
  }
);

export { Weather };
