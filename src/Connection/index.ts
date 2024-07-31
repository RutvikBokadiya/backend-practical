"use strict";
import { Model, Sequelize, DataTypes, Association } from "sequelize";
const env = `${process.env.NODE_ENV}`;
const config = require("../../config/database.json")[env];


let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db: any = {
  users: require("../model/users")(sequelize, DataTypes),
  weather: require("../model/weatherReport")(sequelize, DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export = db;
