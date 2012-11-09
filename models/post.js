var Sequelize = require('sequelize');
exports.Post = function(sequelize) {
  var Post = sequelize.define('Post', {
    title: Sequelize.STRING,
    text: Sequelize.TEXT
  });
  Post.sync();
  return Post;
};

