import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../db/config/connection.js";

interface ParkAttributes {
  id: string;
  fullName: string;
  state: string;
  latitude?: string;
  longitude?: string;
}

interface ParkCreationAttributes extends Optional<ParkAttributes, "latitude" | "longitude"> {}

class Park extends Model<ParkAttributes, ParkCreationAttributes> implements ParkAttributes {
  public id!: string;
  public fullName!: string;
  public state!: string;
  public latitude?: string;
  public longitude?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Park.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Park",
    tableName: "Parks",
    timestamps: true,
  }
);

export { Park };
