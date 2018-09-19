module.exports = function(sequelize, DataTypes) {
    var Like = sequelize.define("Like", {
      
    });

    Like.associate = function (models) {
        models.Like.belongsTo(models.Code, {
          foreignKey: {
            allowNull: false
          }
        });
        models.Like.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
    }

    return Like;
};
