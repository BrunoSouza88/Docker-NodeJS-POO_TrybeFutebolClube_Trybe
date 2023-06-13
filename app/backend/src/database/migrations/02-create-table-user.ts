import { DataTypes, Model, QueryInterface } from 'sequelize';
import IUser from '../../Interfaces/Users/IUser';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUser>>('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userName: {
        field: 'username',
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        field: 'role',
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        field: 'email',
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        field: 'password',
        allowNull: false,
        type: DataTypes.STRING,
      }
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};