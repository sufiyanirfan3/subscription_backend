const {sequelize,DataTypes} = require('sequelize');
const db = require('../../config/database');

const User = db.define('user', {

      PKUserId: {
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
            isAlphanumeric:{
                msg: "Username can only contain letters and numbers"
            },
            len: {
                args: [4,20],
            },
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
                args: [8,50],
                msg: "Password must be between 8 and 50 characters in length"
            },
         }
      }
   
});
User.sync().then(() => {
   console.log('table created');
 });
 module.exports = User;

    
