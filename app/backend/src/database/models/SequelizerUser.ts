import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

class SequelizeUser extends Model<
InferAttributes<SequelizeUser>,
InferCreationAttributes<SequelizeUser>> {
  id!: CreationOptional<number>;
  username!: CreationOptional<string>;
  role!: CreationOptional<string>;
  email!: CreationOptional<string>;
  password!: CreationOptional<string>;
}

SequelizeUser.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    field: 'username',
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    field: 'role',
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    field: 'email',
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    field: 'password',
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

export default SequelizeUser;
