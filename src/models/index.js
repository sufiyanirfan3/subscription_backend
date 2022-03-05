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
   foreignKey: "FKUserId"
});
db.package.belongsTo(db.user,{
   onDelete: "cascade"
})

db.package.hasMany(db.subscription, {
   onDelete: "cascade",
   foreignKey: "FKPackageId",
});
db.subscription.belongsTo(db.package,{
   onDelete:"cascade"
})




module.exports = db;
