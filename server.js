const express = require("express");

const mongoose = require("mongoose");

const Studentinfo = require("./student");

mongoose
  .connect(
    "mongodb+srv://cluster:Satyapower2@cluster12.pntyc88.mongodb.net/test"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.post("/studentdetals", async (req, res) => {
  const { studentname } = req.body;
  const { rollno } = req.body;
  const { joiningdate } = req.body;
  try {
    const newdata = new Studentinfo({ studentname, rollno, joiningdate });
    newdata.save();
    return res.json(await Studentinfo.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getstudenttdetails", async (req, res) => {
  try {
    const data = await Studentinfo.find();
    return res.json(data);
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/getstudenttdetail/:id", async (req, res) => {
  try {
    const Data = await Studentinfo.findById(req.params.id);
    return res.json(Data);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/updatestudentdetails/:id", async (req, res) => {
  try {
    const update = await Studentinfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json(update);
  } catch (err) {
    console.log(err.message);
  }
});
app.delete("/deletestudentdetails/:id", async (req, res) => {
  try {
    const data = await Studentinfo.findByIdAndDelete(req.params.id);
    return res.json(data);
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(4000, () => console.log("server running..."));

module.exports = app;