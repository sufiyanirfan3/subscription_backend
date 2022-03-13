module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define('user',
      {

         PKUserId: {
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
            type: DataTypes.STRING(20),
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

         IsSuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
         },

         SuspendedDate: {
            type: DataTypes.DATE
         },

         IsTemporarySuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
         },

         TemporarySuspendedDate: {
            type: DataTypes.DATE
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
               fields: [{ name: "PKUserId" }]
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
               name: "CNIC",
               using: "BTREE",
               fields: [{ name: "CNIC" }]
            },
            {
               name: "IsSuspended",
               using: "BTREE",
               fields: [{ name: "IsSuspended" }]
            },
            {
               name: "SuspendedDate",
               using: "BTREE",
               fields: [{ name: "SuspendedDate" }]
            },
            {
               name: "IsTemporarySuspended",
               using: "BTREE",
               fields: [{ name: "IsTemporarySuspended" }]
            },
            {
               name: "TemporarySuspendedDate",
               using: "BTREE",
               fields: [{ name: "TemporarySuspendedDate" }]
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
   return User
}