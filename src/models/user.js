const { sequelize, DataTypes } = require('sequelize');
const db = require('../../config/database');

const User = db.define('user', {

   PKUserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
   },
//first name
//last name
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
      type: DataTypes.STRING(50),
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
         isNumeric:{
            msg: "Phone no can only contain numbers"
         }
      }
   },

   CNIC: {
      type: DataTypes.BIGINT(20),
      allowNull: true,
      unique: true,
      validate: {
         isNumeric:{
            msg: "CNIC no can only contain numbers"
         },
         len: {
            args: [11, 11],
            msg: "CNIC no must be 11 characters long"
         },
      }
   }



});
User.sync().then(() => {
   console.log('table created');
});
module.exports = User;


