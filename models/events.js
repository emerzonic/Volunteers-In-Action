module.exports = function(sequelize, Sequelize) {
  var Events = sequelize.define("Event", {
  event_name: Sequelize.STRING,
  location: Sequelize.STRING,
  date: Sequelize.DATE,
  start_time: Sequelize.STRING,
  end_time: Sequelize.STRING,
  description: Sequelize.STRING,
  organizer: Sequelize.STRING,
  contact: Sequelize.STRING,
  volunteers_needed: Sequelize.INTEGER
    });
    return Events;
  };