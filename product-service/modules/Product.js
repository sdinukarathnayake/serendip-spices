const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {}

Product.init({
  productId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productName:  { type: DataTypes.STRING, allowNull: false },
  description:  { type: DataTypes.TEXT, allowNull: false },
  pricePerKg: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false,
    references: {
      model: 'users',     // name of the table you're referencing
      key: 'userId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: true,
});

module.exports = Product;
