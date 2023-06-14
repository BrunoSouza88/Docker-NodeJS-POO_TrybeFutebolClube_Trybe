import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatch from '../../Interfaces/Matchs/IMatch';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      homeTeamId: {
        field: 'home_team_id',
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        allowNull: false,        
        type: DataTypes.INTEGER,
      },
      awayTeamId: {
        field: 'away_team_id',
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      inProgress: {
        field: 'in_progress',
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};