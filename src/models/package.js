module.exports = (sequelize, DataTypes) => {
    const Package = sequelize.define('package', {

        PKPackageId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

        PackageName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "Please enter your package name"
                },
                isAlpha: {
                    msg: "Package name can only contain letters"
                }
            }
        },

        PackageCost: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "Please enter your package cost"
                },
                isNumeric: {
                    msg: "Package cost can only contain numbers"
                }
            }
        },

        SubscriptionPeriod: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "Please enter your subscription period"
                },
                isAlpha: {
                    msg: "Subscripton period can only contain letters"
                }
            }
        },

        FKUserId:{
            type: DataTypes.INTEGER
        },

        FKSubscriptionId:{
            type: DataTypes.INTEGER,
            // allowNull:true
        }



    });
    return Package

}