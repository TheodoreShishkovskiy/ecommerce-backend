const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
class Category extends Model {}

// Defining the columns for "Category"

Category.init(
  {
// This column defines the Id in category
    id: {
      type:DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    },
// This column defines the category_name column
    category_name: {
      type: DataTypes.STRING, allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
