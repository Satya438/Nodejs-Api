const AWS = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");

// Configure AWS SDK with your AWS credentials
AWS.config.update({
  accessKeyId: "AKIAR4WX7NDSI7AVL2VV",
  secretAccessKey: "ZgJVwT3PvwmOU5xT+0CL+RHeyTYWyWRlbjwRzeUC",
});

const s3 = new AWS.S3();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

// API endpoint to upload a file with a password provided by the user
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { originalname, path } = req.file;
  const password = req.body.password;

  // Check if the file was successfully uploaded
  if (!fs.existsSync(path)) {
    return res.status(500).json({ error: "Failed to upload the file" });
  }

  // Read the file data
  const fileData = fs.readFileSync(path);

  // Generate a unique random key
  const encryptionKey = crypto.randomBytes(32);

  // Encrypt the file data with the encryption key
  const cipher = crypto.createCipher("aes-256-cbc", encryptionKey);
  const encryptedData = Buffer.concat([
    cipher.update(fileData),
    cipher.final(),
  ]);

  // Set the password as metadata for the file
  const uploadParams = {
    Bucket: "nodejsprctc",
    Key: originalname,
    Body: encryptedData,
    Metadata: {
      password: password,
    },
  };

  // Upload the file to S3
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.error("Error uploading the file to S3:", err);
      return res.status(500).json({ error: "Failed to upload the file" });
    }

    return res.json({ message: "File uploaded successfully" });
  });
});

// API endpoint to download a file using the password
app.get("/download", (req, res) => {
  const fileName = req.query.fileName;
  const password = req.query.password;

  // Get the file from S3
  const downloadParams = {
    Bucket: "nodejsprctc",
    Key: "nodejsservice_accessKeys.csv",
  };

  s3.getObject(downloadParams, (err, data) => {
    if (err) {
      console.error("Error downloading the file from S3:", err);
      return res.status(500).json({ error: "Failed to download the file" });
    }

    const fileData = data.Body;

    // Decrypt the file data using the password
    const decipher = crypto.createDecipher("aes-256-cbc", password);
    const decryptedData = Buffer.concat([
      decipher.update(fileData),
      decipher.final(),
    ]);

    // Send the decrypted file as a response
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.send(decryptedData);
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
