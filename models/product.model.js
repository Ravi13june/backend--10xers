const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./users.model');

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  price: DataTypes.FLOAT,
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,    
      key: 'id'
    }
  }
});

Product.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });

module.exports = Product;
