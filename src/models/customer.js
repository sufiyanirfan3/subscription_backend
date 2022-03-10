module.exports = (sequelize, DataTypes) => {
   const Customer = sequelize.define('customer', {

      PKCustomerId: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         unique: true,
         autoIncrement: true
      },

      FirstName: {
         type: DataTypes.STRING(20),
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
         type: DataTypes.STRING(20),
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

   });
}

