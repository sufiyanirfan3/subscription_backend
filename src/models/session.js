module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('session', {

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




    });
    return Session

}
