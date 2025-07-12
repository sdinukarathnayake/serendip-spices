const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {}

Product.init({
  productId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  itemname:  { type: DataTypes.STRING, allowNull: false },
  priceperkg: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  sellerId:  { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: true,
});

module.exports = Product;