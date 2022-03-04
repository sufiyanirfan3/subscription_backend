// Subscription
// 	FKPackageId
// 	FKCustomerId
// 	DeletedAt

// compound unique fkpackageid + fkcustomerid

module.exports = (sequelize, DataTypes) => {

    const Subscription = sequelize.define(
        "subscription",
        {
            FKCustomerID: {
                type: DataTypes.INTEGER,
                //  primaryKey: true,
                //  unique: true,
                //  autoIncrement: true
            },
            
            FKPackageID: {
                type: DataTypes.STRING(20),
                //  allowNull: false,
                //  unique: true,


            },
            CompoundPK: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                primaryKey: true,
                // value: this.FKCustomerID.value + this.FKPackageID.value

            },

            DeletedDate: {
                type: DataTypes.DATE
            }
        });
    return Subscription
}