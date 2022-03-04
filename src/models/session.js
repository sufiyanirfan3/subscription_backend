const { sequelize, DataTypes } = require('sequelize');
const db = require('../../config/database');

const Session = db.define('session', {

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
Session.sync().then(() => {
    console.log('table created');
});
module.exports = Session;


