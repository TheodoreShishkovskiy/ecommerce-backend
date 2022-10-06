const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
class Tag extends Model {}

// Tag column Model

Tag.init(
  {
// Defines the id column for Tag
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
// Defines the tag_name column for Tag
    tag_name: { type: DataTypes.STRING}
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
