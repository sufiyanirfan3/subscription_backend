module.exports = (sequelize, DataTypes) => {
   const Customer = sequelize.define('customer',
      {

         PKCustomerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
         },

         FirstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: false,
            validate: {
               notNull: {
                  msg: "Please enter your firstname"
               },
               isAlpha: {
                  msg: "Firstname can only contain letters"
               }
            }
         },

         LastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: false,
            validate: {
               notNull: {
                  msg: "Please enter your lastname"
               },
               isAlpha: {
                  msg: "Lastname can only contain letters"
               }
            }
         },

         Email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
            validate: {
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

         CNIC: {
            type: DataTypes.BIGINT(20),
            allowNull: true,
            unique: true,
            validate: {
               isNumeric: {
                  msg: "CNIC no can only contain numbers"
               },
               len: {
                  args: [13, 13],
                  msg: "CNIC no must be 13 characters long"
               },
            }
         },

         Address: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: false,
            validate: {
               notNull: {
                  msg: "Please enter your address"
               }
            }
         },

         Country: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: false,
            validate: {
               notNull: {
                  msg: "Please enter your country"
               },
               isAlpha: {
                  msg: "Country can only contain letters"
               },
            }
         },

         City: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: false,
            validate: {
               notNull: {
                  msg: "Please enter your city"
               },
               isAlpha: {
                  msg: "City can only contain letters"
               },
            }
         },

         Area: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: false,
            validate: {
               notNull: {
                  msg: "Please enter your area"
               },
               isAlpha: {
                  msg: "Area can only contain letters"
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
               fields: [{ name: "PKCustomerId" }]
            },
            {
               name: "FirstName",
               using: "BTREE",
               fields: [{ name: "FirstName" }]
            },
            {
               name: "LastName",
               using: "BTREE",
               fields: [{ name: "LastName" }]
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
               name: "CNIC",
               using: "BTREE",
               fields: [{ name: "CNIC" }]
            },
            {
               name: "Address",
               using: "BTREE",
               fields: [{ name: "Address" }]
            },
            {
               name: "Country",
               using: "BTREE",
               fields: [{ name: "Country" }]
            },
            {
               name: "City",
               using: "BTREE",
               fields: [{ name: "City" }]
            },
            {
               name: "Area",
               using: "BTREE",
               fields: [{ name: "Area" }]
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
   return Customer
}

