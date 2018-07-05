'use strict';
module.exports = (sequelize, Sequelize) => {
  var Event = sequelize.define('Event', {
    event_name: Sequelize.STRING,
    address1: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.INTEGER,
    fullAddress:Sequelize.STRING,
    lat:Sequelize.DECIMAL(10, 2) ,
    lng:Sequelize.DECIMAL(10, 2), 
    date: Sequelize.DATE,
    start_time: Sequelize.STRING,
    end_time: Sequelize.STRING,
    description: Sequelize.STRING,
    organizer: Sequelize.STRING,
    contact: Sequelize.STRING,
    volunteers_needed: Sequelize.INTEGER,
    status: Sequelize.BOOLEAN,
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Volunteer);
    Event.belongsTo(models.User);
  };
  return Event;
};