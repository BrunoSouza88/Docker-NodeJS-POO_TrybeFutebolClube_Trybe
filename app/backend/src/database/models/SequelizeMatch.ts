import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatch extends Model<
InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>> {
  id!: CreationOptional<number>;

  homeTeamId!: number;

  homeTeamGoals!: number;

  awayTeamId!: number;

  awayTeamGoals!: number;

  inProgress!: boolean;
}

SequelizeMatch.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default SequelizeMatch;
