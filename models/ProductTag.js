const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

// ProductTag model columns

ProductTag.init(
  {
// Defines the id properties in ProductTag model
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
// Defines the tag_name properties in ProductTag model
    tag_name: { type: DataTypes.STRING }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
