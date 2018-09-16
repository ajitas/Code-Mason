/**************************Ajita*******************************/
module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
      text: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate :
                    {
                        notEmpty: true
                    }

      }
    });

    Comment.associate = function (models) {
        models.Comment.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        models.Comment.belongsTo(models.Code, {
            foreignKey: {
              allowNull: false
            }
          });
    }

    return Comment;
};








/**************************Ajita*******************************/

/**************************Taylor*******************************/










/**************************Taylor*******************************/

/**************************Craig*******************************/










/**************************Craig*******************************/