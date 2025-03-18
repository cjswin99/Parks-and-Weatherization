import { DataTypes, Model } from "sequelize";
import sequelize from "../db/config/connection.js";

class User extends Model {
  public id!: number;
  public email!: string;
  public username!: string;
  public password!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export { User };
