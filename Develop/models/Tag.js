const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
const { types } = require('util');

class Tag extends Model {}

Tag.init(
  {
    // lets define tag columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
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
