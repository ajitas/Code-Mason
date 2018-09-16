/**************************Ajita*******************************/
module.exports = function(sequelize, DataTypes) {
    var Code = sequelize.define("Code", {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate :
                    {
                        notEmpty: true
                    }
      },
      text: {
          type: DataTypes.TEXT('long'),
          allowNull: false,
          validate :
                    {
                        notEmpty: true
                    }
      },
      public: {
          type: DataTypes.BOOLEAN,
          defaultValue:true,
          allowNull: false
      },
      likes: {
          type: DataTypes.INTEGER,
          deafultValue:0,
      },
      dislikes: {
          type: DataTypes.INTEGER,
          deafultValue:0,
      }
    });

    Code.associate = function (models) {
        models.Code.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        models.Code.hasMany(models.Comment, {
            onDelete: "cascade",
            foreignKey: {
              allowNull: false
            }
        });
    }

    return Code;
};









/**************************Ajita*******************************/

/**************************Taylor*******************************/










/**************************Taylor*******************************/

/**************************Craig*******************************/










/**************************Craig*******************************/