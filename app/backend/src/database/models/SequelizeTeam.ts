import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeTeam extends Model<
InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>
> {
  id!: CreationOptional<number>;

  teamName!: string;
}

SequelizeTeam.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    field: 'team_name',
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default SequelizeTeam;
