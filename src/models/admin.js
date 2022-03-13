module.exports = (sequelize, DataTypes) => {
   const Admin = sequelize.define(
      "admin",
      {
         PKAdminId: {
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

         Username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
               notNull: {
                  msg: "Please enter your username"
               },
               isAlphanumeric: {
                  msg: "Username can only contain letters and numbers"
               },
               len: {
                  args: [4, 20],
               },
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

         Password: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
               notNull: {
                  msg: "Please enter your password"
               },
               len: {
                  args: [8, 128],
                  msg: "Password must be between 8 and 128 characters in length"
               },
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
               fields: [{ name: "PKAdminId" }]
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
               name: "Username",
               using: "BTREE",
               fields: [{ name: "Username" }]
            },
            {
               name: "Email",
               using: "BTREE",
               fields: [{ name: "Email" }]
            },
            {
               name: "Password",
               using: "BTREE",
               fields: [{ name: "Password" }]
            },
            {
               name: "PhoneNumber",
               using: "BTREE",
               fields: [{ name: "PhoneNumber" }]
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
   return Admin
};