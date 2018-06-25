module.exports = function(sequelize, Sequelize) {
    var Volunteers = sequelize.define("Volunteer", {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    age:Sequelize.INTEGER,
    contact: Sequelize.STRING,
    event_id:Sequelize.INTEGER,
      });
      return Volunteers;
    };