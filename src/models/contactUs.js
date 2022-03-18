module.exports = (sequelize, DataTypes) => {
    const contactUs = sequelize.define(
        "contact_us",
        {
            PKContactFormId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },

            Name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please enter your name"
                    },
                    isAlpha: {
                        msg: "Name can only contain letters"
                    }
                }
            },

            Email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please enter your email"
                    },
                    isEmail: {
                        msg: "Email address must be valid"
                    }
                }
            },

            PhoneNumber: {
                type: DataTypes.BIGINT(20),
                allowNull: false,
                unique: true,
                validate: {
                    notNull: {
                        msg: "Please enter your phone no"
                    },
                    isNumeric: {
                        msg: "Phone no can only contain numbers"
                    }
                }
            },

            Message: {
                type: DataTypes.STRING(1000),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please enter your message"
                    },
                }
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
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "PKContactFormId" }]
                },
                {
                    name: "Name",
                    using: "BTREE",
                    fields: [{ name: "Name" }]
                },
                {
                    name: "Email",
                    using: "BTREE",
                    fields: [{ name: "Email" }]
                },
                {
                    name: "PhoneNumber",
                    using: "BTREE",
                    fields: [{ name: "PhoneNumber" }]
                },
                {
                    name: "Message",
                    using: "BTREE",
                    fields: [{ name: "Message" }]
                },
                {
                    name: "IsDeleted",
                    using: "BTREE",
                    fields: [{ name: "IsDeleted" }]
                },
                {
                    name: "DeletedDate",
                    using: "BTREE",
                    fields: [{ name: "DeletedDate" }]
                }
            ]
        },
    );
    return contactUs
};