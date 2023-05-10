const AWS = require("aws-sdk");
const env = require("./env");

const client = new AWS.S3({
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  region: env.REGION,
});

const s3 = {
  client: client,
  bucket_name: env.BUCKET_NAME,
};

module.exports = s3;
