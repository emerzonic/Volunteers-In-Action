module.exports = function(sequelize, Sequelize) {
    var Users = sequelize.define("User", {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email:Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
      });
      return Users;
    };