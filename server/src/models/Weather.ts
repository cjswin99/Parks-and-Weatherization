import { DataTypes, Model } from "sequelize";
import sequelize from "../db/config/connection.js";
import { User } from "./User.js";

class Weather extends Model {
  public id!: number;
  public location!: string;
  public temperature!: number;
  public condition!: string;
  public userId!: number;
}

Weather.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    location: { type: DataTypes.STRING, allowNull: false },
    temperature: { type: DataTypes.FLOAT, allowNull: false },
    condition: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: true, references: { model: User, key: "id" } },
  },
  {
    sequelize,
    modelName: "Weather",
  }
);

User.hasMany(Weather, { foreignKey: "userId" });
Weather.belongsTo(User, { foreignKey: "userId" });

export { Weather };
