const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = require('../../config/database')

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./admin")(sequelize, DataTypes);
db.user = require("./user")(sequelize, DataTypes);
db.customer = require("./customer")(sequelize, DataTypes);
db.package = require("./package")(sequelize, DataTypes);
db.subscription = require("./subscription")(sequelize, DataTypes);
db.session = require("./session")(sequelize, DataTypes);



db.user.hasMany(db.package, {
   onDelete: "cascade",
   foreignKey: "FKCategoryId"
});
db.package.belongsTo(db.user)

module.exports = db;
