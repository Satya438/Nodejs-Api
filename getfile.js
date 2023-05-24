const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");

const app = express();
const upload = multer({ dest: "uploads/" });

const s3 = new AWS.S3();

app.post("/upload", upload.single("file"), (req, res) => {
  const { file } = req;

  // Generate a random password
  const password = "satya";

  // Set the desired bucket name and file key
  const bucketName = "nodejsprctc";
  const fileKey = `uploads/${file.originalname}`;

  // Generate the pre-signed URL
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: file.buffer,
    Expires: 3600,
    Metadata: {
      password: password,
    },
  };

  const url = s3.getSignedUrl("putObject", params);

  res.json({ password, uploadUrl: url });
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
