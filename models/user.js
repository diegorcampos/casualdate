var Sequelize = require('sequelize');
exports.User = function(sequelize) {
  var User = sequelize.define('User', {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    nickname: Sequelize.STRING,
    gender: Sequelize.STRING,
    gender_target: Sequelize.STRING,
    dob: Sequelize.DATE,
    deletedAt: Sequelize.DATE
  });
  User.sync();
  return User;
};

