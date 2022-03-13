module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('session',
        {

            PKSessionId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },

            FKUserId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            RefreshToken: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "PKSessionId" }]
                },
                {
                    name: "FKUserId",
                    using: "BTREE",
                    fields: [{ name: "FKUserId" }]
                },
                {
                    name: "RefreshToken",
                    using: "BTREE",
                    fields: [{ name: "RefreshToken" }]
                }
            ]
        }
    );
    return Session

}
