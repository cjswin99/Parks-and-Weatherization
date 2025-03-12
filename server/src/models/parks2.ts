import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  type Sequelize,
} from 'sequelize';



export class Park extends Model<
  InferAttributes<Park>,
  InferCreationAttributes<Park>
> {
  declare id: CreationOptional<number>;
  declare park_id: string;
  declare city: string;
  declare latitude: string;
  declare longitude: string;
}

export function ParkFactory(sequelize: Sequelize) {
  Park.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      park_id: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'park',

    }
  );

  return Park;
}
