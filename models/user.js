/**************************Ajita*******************************/
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate :
                    {
                        notEmpty: true
                    }
      },
      email : {
          type: DataTypes.STRING,
          allowNull : false,
          validate :
                {
                    isEmail: true
                }
      }
    });

    User.associate = function (models) {
        models.User.hasMany(models.Code, {
            onDelete: "cascade"
        });
        models.User.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    }

    return User;
};

/**************************Ajita*******************************/

/**************************Taylor*******************************/










/**************************Taylor*******************************/

/**************************Craig*******************************/










/**************************Craig*******************************/