const s3 = require("./s3config");

// uploading file to s3
exports.upload = (req, res) => {
  // req.file contains information of the uploaded file
  if (!req.file) {
    res.status(400).json({ error: "Please select a file to upload" });
  }
  // setting up s3 upload parameters
  const params = {
    Bucket: s3.bucket_name,
    Key: req.file.originalname.replace(/\s+/g, "-"), // replace space in a filename with hyphen
    Body: req.file.buffer,
  };

  console.log("Starting file upload op");

  s3.client.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error while uploading file" });
    } else {
      res.status(200).json({
        message: "File uploaded successfully",
        object_url: `${data.Location}`,
      });
    }
  });
};
