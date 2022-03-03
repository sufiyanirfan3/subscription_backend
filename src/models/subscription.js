// Subscription
// 	FKPackageId
// 	FKCustomerId
// 	DeletedAt

// compound unique fkpackageid + fkcustomerid

const { sequelize, DataTypes } = require('sequelize');
const db = require('../../config/database');

const Subscription = db.define(
    "subscription",
    {
        FKCustomerID: {
            type: DataTypes.INTEGER,
            //  primaryKey: true,
            //  unique: true,
            //  autoIncrement: true
        },
        // first name
        //last name
        FKPackageID: {
            type: DataTypes.STRING(20),
            //  allowNull: false,
            //  unique: true,


        },
        CompoundPK: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            primaryKey: true,
            // value: this.FKCustomerID.value + this.FKPackageID.value

        },

        deletedAt: {
            allowNull: false,
            type: sequelize.DATE
        },

    });

Subscription.sync().then(() => {
    console.log('table created');
});

module.exports = Subscription;
