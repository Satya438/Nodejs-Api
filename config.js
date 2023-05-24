const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAR4WX7NDSI7AVL2VV",
  secretAccessKey: "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",
  region: "ap-south-1",
});

module.exports = AWS;
