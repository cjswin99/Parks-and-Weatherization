import { DataTypes, Model } from "sequelize";
import sequelize from "../db/config/connection.js";
import { User } from "./User.js";

class Park extends Model {
  public id!: number;
  public name!: string;
  public state!: string;
  public description!: string;
  public userId!: number;
}

Park.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: true, references: { model: User, key: "id" } },
  },
  {
    sequelize,
    modelName: "Park",
  }
);

User.hasMany(Park, { foreignKey: "userId" });
Park.belongsTo(User, { foreignKey: "userId" });

export { Park };
