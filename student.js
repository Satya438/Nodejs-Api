const mongoose = require("mongoose");

const Studentinfo = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  EmpId: {
    type: Number,
    required: true,
    unique: true,
  },
  joiningdate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("studentinfo", Studentinfo);
