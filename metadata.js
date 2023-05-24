const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAR4WX7NDSI7AVL2VV",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const s3 = new AWS.S3();
const bucketName = "nodejsprctc";
const objectKey = "nodejsservice_accessKeys.csv";

const params = {
  Bucket: bucketName,
  Key: objectKey,
};

s3.headObject(params, function (err, data) {
  if (err) {
    console.error("Error retrieving object metadata:", err);
  } else {
    console.log("Object metadata:", data.Metadata);
  }
});
