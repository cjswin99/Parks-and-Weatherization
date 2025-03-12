import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  type Sequelize,
} from 'sequelize';



export class Weather extends Model<
InferAttributes<Weather>,
InferCreationAttributes<Weather>
> {
  declare id: CreationOptional<number>;
  declare tempF: number;
  declare rain: number;
  declare windSpeed: number;
  declare humidity: number;
}

export function WeatherFactory(sequelize: Sequelize) {
  Weather.init(
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        tempF: {
          type: DataTypes.NUMBER,
        },
        rain: {
          type: DataTypes.NUMBER,
        },
        windSpeed: {
          type: DataTypes.NUMBER,
        },
        humidity: {
          type: DataTypes.NUMBER,
        }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'weather', 
    }
);

return Weather;
}
