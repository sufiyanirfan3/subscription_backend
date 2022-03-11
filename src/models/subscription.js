// Subscription
// 	FKPackageId
// 	FKCustomerId
// 	DeletedAt

// compound unique fkpackageid + fkcustomerid

module.exports = (sequelize, DataTypes) => {

    const Subscription = sequelize.define(
        "subscription",
        {
            PKSubscriptionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true
            },

            FKCustomerId: {
                type: DataTypes.INTEGER
            },

            FKPackageId: {
                type: DataTypes.INTEGER
            },

            IsDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            DeletedDate: {
                type: DataTypes.DATE
            }
        },
        {
            indexes: [
                {
                    name: "FK_Customer_Package_Composite_Unique_Key",
                    unique: true,
                    fields: ["FKCustomerId", "FKPackageId"]
                },
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "PKSubscriptionId" }]
                },
                {
                    name: "FKCustomerId",
                    using: "BTREE",
                    fields: [{ name: "FKCustomerId" }]
                },
                {
                    name: "FKPackageId",
                    using: "BTREE",
                    fields: [{ name: "FKPackageId" }]
                }
            ]
        },
    );
    return Subscription
}