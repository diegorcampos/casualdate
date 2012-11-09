var Sequelize = require('sequelize');
exports.Image = function(sequelize) {
  var awssum = require('awssum');
  var amazon = awssum.load('amazon/amazon');
  var S3 = awssum.load('amazon/s3').S3;
  var uuid = require('node-uuid');

  var s3 = new S3({
    'accessKeyId'     : "AKIAJNR7326D2WISNE3Q",
    'secretAccessKey' : "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",
    'region'          : amazon.US_EAST_1
  });

  var Image = sequelize.define('Image', {
    user_id: Sequelize.INTEGER,
    url: Sequelize.STRING
  }, {
    classMethods: {
      upload: function(user_id, dataUri, callback) {
        var matches = dataUri.match(/^data:(.+);base64,(.*)$/);
        var contentType = matches[1];
        var base64Data = matches[2];

        var bucketName = "casualist-production";
        var objectName = uuid.v4();
        var url = bucketName + ".s3.amazonaws.com/" + objectName;
        var buffer = new Buffer(base64Data, 'base64');

        var params = {
          BucketName    : 'casualist-production',
          ObjectName    : objectName,
          ContentLength : buffer.length,
          Body          : buffer,
          Acl           : 'public-read',
          ContentType   : contentType
        };

        s3.PutObject(params, function(err, data) {
          console.log(err);
          console.log(data);

          if (err) {
            callback(err, data);
          } else {
            var image = Image.create({user_id: user_id, url: url}).complete(function(err, model) {
              callback(err, model);
            });
          }
        });
      },
      destroyClean: function(id, callback) {
        var image = Image.find(id).complete(function(err, image) {
          var matches = image.url.match(/^(.+?)\..+\/(.+)$/);
          var bucketName = matches[1];
          var objectName = matches[2];

          console.log(bucketName);
          console.log(objectName);

          var params = {
            BucketName    : bucketName,
            ObjectName    : objectName,
          };

          s3.DeleteObject(params, function(err, data) {
            image.destroy().complete(function(err, data) {
              callback(err, data);
            });
          });
        });
      }
    }});
    Image.sync();
    return Image;
};

