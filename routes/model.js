const mongoose = require("mongoose");

const BrandName = mongoose.Schema({
  brandname: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model("brandname", BrandName);
