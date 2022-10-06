  // Class info -  import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

  // Class info -  import our database connection from config.js
const sequelize = require('../config/connection');

  // Class info -  Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

  // Class info - set up fields and rules for Product model
// This allows us to define each column in the "Product" js
Product.init(
  {
// This defines the id column with the required keys
    id: {
      type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true,
    },
// This defines the product_name column with the required keys
    product_name: {
      type: DataTypes.STRING, allowNull: false,
    },
// This defines the price column with required keys
// Datatype decimal for price in order to give an expression in [$4.99] format
    price: {
      type: DataTypes.DECIMAL, allowNull: false,
    },
// This defines the stock column with the required keys
    stock: {
      type: DataTypes.INTEGER, allowNull: false, defaultValue: 10, validate: { isNumeric: true }
    },
// This defines the category_id column with the required keys
// This also allows for product to be found in category
    category_id: {
      type: DataTypes.INTEGER,
      references : { model: "category", key: "id" }
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
