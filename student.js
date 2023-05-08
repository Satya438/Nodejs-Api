const mongoose = require("mongoose");

const Studentinfo = mongoose.Schema({
  studentname: {
    type: String,
    required: true,
  },
  rollno: {
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
