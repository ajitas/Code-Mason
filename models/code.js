/**************************Ajita*******************************/
module.exports = function(sequelize, DataTypes) {
    var Code = sequelize.define("Code", {
      title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate :
                    {
                        notEmpty: true
                    }
      },
      description: {
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
          deafultValue:0
      },
      dislikes: {
          type: DataTypes.INTEGER,
          deafultValue:0
      },
      language: {
          type: DataTypes.STRING,
          allowNull : false
      }
    });

    Code.associate = function (models) {
        models.Code.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        models.Code.hasMany(models.Comment, {
            onDelete: "cascade"
        });
        models.Code.hasMany(models.Tag, {
            onDelete: "cascade"
        });
    }

    return Code;
};









/**************************Ajita*******************************/

/**************************Taylor*******************************/










/**************************Taylor*******************************/

/**************************Craig*******************************/










/**************************Craig*******************************/