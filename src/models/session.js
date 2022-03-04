const { sequelize, DataTypes } = require('sequelize');
const db = require('../../config/database');

const Package = db.define('package', {

    PKSessionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    FKAdminId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    RefreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },




});
Package.sync().then(() => {
    console.log('table created');
});
module.exports = Package;


