'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    event_name: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.DATE,
    start_time: DataTypes.STRING,
    end_time: DataTypes.STRING,
    description: DataTypes.STRING,
    organizer: DataTypes.STRING,
    contact: DataTypes.STRING,
    volunteers_needed: DataTypes.INTEGER,
    status_passed: {
      type: DataTypes.BOOLEAN,
      validate: {
        defaulValue: false
      }
    },
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Volunteer);
    Event.belongsTo(models.User);
  };
  return Event;
};