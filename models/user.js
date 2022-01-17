/* eslint-disable no-unused-vars */
// import {Model} from 'sequelize';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      values: ['ACTIVE', 'DELETED', 'BLOCKED'],
      defaultValue: 'ACTIVE',
    },
    last_login_at: DataTypes.DATE,
    last_ip_address: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'User',
  });
  return User;
};
