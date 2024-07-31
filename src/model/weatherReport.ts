"use strict";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
  Sequelize,
} from "sequelize";
// const { Model } = require("sequelize");
import db from "../Connection/index";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class weatherReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
    }
  }
  weatherReport.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      description: {
        type: DataTypes.STRING,
      },
      temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timezone: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      lon: {
        type: DataTypes.FLOAT,
      },
      lat: {
        type: DataTypes.FLOAT,
      },

      createdAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "weather_report",
    }
  );
  return weatherReport;
};
