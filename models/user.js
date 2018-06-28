var bcrypt = require('bcrypt-nodejs');
var Sequelize = require('sequelize');


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
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    }, {
      hooks: {
        afterValidate: function (user) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12), null);
          return user;
        },

      }
    },

    // {
    //   classMethods: {
    //     validPassword: function (password, passwd, done, user) {
    //       bcrypt.compare(password, passwd, function (err, isMatch) {
    //         if (err) console.log(err);
    //         if (isMatch) {
    //           return done(null, user);
    //         } else {
    //           return done(null, false);
    //         }
    //       });
    //     }
    //   }

    // }, 
    {
      dialect: 'mysql'
    }
  );
  
  User.validPassword = function (password, passwd, done, user) {
  bcrypt.compare(password, passwd, function (err, isMatch) {
    if (err) console.log(err);
    if (isMatch) {
     console.log(user);
      return done(null, user);
    } else {
      // return console.log('not matched');
      return done(null, false);
    }
  });
};

  User.associate = function (models) {
    User.hasMany(models.Event);
  };


  return User;
};

















































// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var User = sequelize.define('User', {
//       first_name: DataTypes.STRING,
//       last_name: DataTypes.STRING,
//       email: DataTypes.STRING,
//       username: {
//         type: DataTypes.STRING,
//         unique: true,
//         validate: {
//           notEmpty: true
//         }
//       },
//       password: {
//         type: DataTypes.STRING,
//         validate: {
//           notEmpty: true
//         }
//       },
//     }, {
//       hooks: {
//         afterValidate: function (user) {
//           return bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
//           // user.password = bcrypt.hashSync(user.password, 8);
//           // user.password = bcrypt.hashSync(user.password, 8);
//         },

//       }
//     }

//   );
//   User.associate = function (models) {
//     User.hasMany(models.Event);
//   },
//   passportLocalSequelize.attachToUser(User, {
//     hashField: 'hooks',
//     saltField: 'salt',
//   });
//   return User;
// };