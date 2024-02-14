"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      record.belongsTo(models.user, {
        foreignKey: "userId",
      });

      record.belongsTo(models.category, {
        foreignKey: "categoryId",
      });
    }
  }
  record.init(
    {
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      amount: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "record",
    }
  );
  return record;
};
