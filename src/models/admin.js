const {sequelize,DataTypes} = require('sequelize');
const db = require('../../config/database');

const Admin = db.define(
   "admin",
   {
      PKAdminId: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         unique: true,
         autoIncrement: true
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
      
      PhoneNo: {
         type: DataTypes.BIGINT(20),
         allowNull: false,
         unique: true,
         validate: {
            notNull: {
               msg: "Please enter your phone no"
            },
            isNumeric:{
               msg: "Phone no can only contain numbers"
            }
         }
      },

   });

   Admin.sync().then(() => {
      console.log('table created');
    });

module.exports = Admin;

