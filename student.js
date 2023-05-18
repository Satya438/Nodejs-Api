const mongoose = require("mongoose");

const Employeinfo = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  EmpId: {
    type: Number,
    required: true,
  },
  joiningdate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Employeinfo", Employeinfo);
