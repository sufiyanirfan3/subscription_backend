const { sequelize, DataTypes } = require('sequelize');
const db = require('../../config/database');

const Customer = db.define('customer', {

   PKCustomerId: {
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

   PhoneNo: {
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
            args: [11, 11],
            msg: "CNIC no must be 11 characters long"
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
         isAlpha:{
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
         isAlpha:{
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
         isAlpha:{
             msg: "Area can only contain letters"
         },
      }
   },

});
Customer.sync().then(() => {
   console.log('table created');
});
module.exports = Customer;


