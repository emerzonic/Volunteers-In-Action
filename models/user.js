var bcrypt = require('bcrypt-nodejs');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
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
  }, {
    dialect: 'mysql'
  });
  User.validPassword = function (password, passwd, done, user) {
    bcrypt.compare(password, passwd,(err, isMatch) => {
      if (err) console.log(err);
      if (isMatch) {
        return done(null, user.get());
      } else {
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