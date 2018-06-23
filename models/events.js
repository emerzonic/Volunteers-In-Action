module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Event", {
  event_name: DataTypes.STRING,
  location: DataTypes.STRING,
  date: DataTypes.STRING,
  time: DataTypes.STRING,
  description: DataTypes.STRING,
  organizer: DataTypes.STRING,
  contact: DataTypes.STRING
 
    });
    return Events;
  };