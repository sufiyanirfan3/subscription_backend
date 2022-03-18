module.exports = (sequelize, DataTypes) => {

    const Otp = sequelize.define(
        "otp",
        {
            PKOtpId: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true
            },

            FKCustomerId: {
                type: DataTypes.INTEGER
            },

            FKPackageId: {
                type: DataTypes.INTEGER
            },

            OtpCode: {
                type: DataTypes.STRING(200),
            }
        },
        {
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "PKOtpId" }]
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
                },
                {
                    name: "Otp",
                    using: "BTREE",
                    fields: [{ name: "OtpCode" }]
                },
            ]
        },
    );
    return Otp
}