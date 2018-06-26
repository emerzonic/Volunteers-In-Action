'use strict';
module.exports = (sequelize, DataTypes) => {
  var Volunteer = sequelize.define('Volunteer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    contact: DataTypes.STRING
  }, {});
  Volunteer.associate = function(models) {
    // associations can be defined here
    Volunteer.belongsTo(models.Event,{ foreignKey: { allowNull: false }});
  };
  return Volunteer;
};