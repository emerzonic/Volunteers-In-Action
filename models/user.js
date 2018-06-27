var bcrypt = require('bcrypt-nodejs');


'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      validPassword: function (password, passwd, done, user) {
        bcrypt.compare(password, passwd, function (err, isMatch) {
          if (err) console.log(err);
          if (isMatch) {
            return done(null, user);
          }else{
            return done(null,false);
          }
        });
      }

    }
  });
  User.associate = function (models) {
    User.hasMany(models.Event);
  };
  return User;
};