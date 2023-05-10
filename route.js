const express = require("express");
const router = express.Router();

const upload = require("./multer");
const controller = require("./s3controller");

// endpoint - http://localhost:3001/api/upload
// 'file' is the name of our file input field in the form
router.post("/api/upload", upload.single("file"), controller.upload);

module.exports = router;
