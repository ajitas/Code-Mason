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
      }
    });

    User.associate = function (models) {
        models.User.hasMany(models.Code, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
        models.User.hasMany(models.Comment, {
            onDelete: "cascade",
            foreignKey: {
              allowNull: false
            }
        });
    }

    return User;
};





/**************************Ajita*******************************/

/**************************Taylor*******************************/










/**************************Taylor*******************************/

/**************************Craig*******************************/










/**************************Craig*******************************/