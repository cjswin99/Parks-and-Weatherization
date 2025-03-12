import { DataTypes, Model } from "sequelize";
import sequelize from "../db/config/connection.js";

class Park extends Model {
  public id!: number;
  public name!: string;
  public state!: string;
  public description!: string;
}

Park.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: "Park",
  }
);

export { Park };
