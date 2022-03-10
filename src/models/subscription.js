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
                unique: 'compositeIndex'
                //  primaryKey: true,
                //  unique: true,
                //  autoIncrement: true
            },
            
            // FKPackageID: {
            //     type: DataTypes.STRING(20),
            //     unique: 'compositeIndex'
            //     //  allowNull: false,
            //     //  unique: true,


            // },

            PKSubscriptionId: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                primaryKey: true,
                // value: this.FKCustomerID.value + this.FKPackageID.value

            },

            IsDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
             },
       
             DeletedDate: {
                type: DataTypes.DATE
             }
        });
    return Subscription
}