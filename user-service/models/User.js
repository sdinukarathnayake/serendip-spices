const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name:       { type: DataTypes.STRING, allowNull: false },
  email:      { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  phone:      { type: DataTypes.STRING, allowNull: false },
  username:   { type: DataTypes.STRING, allowNull: false, unique: true },
  password:   { type: DataTypes.STRING, allowNull: false },
  type:       { type: DataTypes.ENUM('Buyer','Seller','Admin'), allowNull: false, defaultValue: 'Buyer' },

}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});

module.exports = User;