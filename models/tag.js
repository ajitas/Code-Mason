/**************************Ajita*******************************/
module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define("Tag", {
      tagname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate :
                    {
                        notEmpty: true
                    }
      }
    });

    Tag.associate = function (models) {
        models.Tag.belongsTo(models.Code, {
          foreignKey: {
            allowNull: false
          }
        });
    }

    return Tag;
};









/**************************Ajita*******************************/

/**************************Taylor*******************************/










/**************************Taylor*******************************/

/**************************Craig*******************************/










/**************************Craig*******************************/