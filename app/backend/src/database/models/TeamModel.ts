import {
  InferAttributes,
  Model,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import db from '.';

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Team.init(
  {
    id: {
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    teamName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'Team',
    timestamps: false,
    underscored: true,
  },
);

export default Team;
