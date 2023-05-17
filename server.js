const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  // allowedHeaders: ["Content-Type", "Authorization"],
};

const Studentinfo = require("./student");
const app = express();
app.use(cors(corsOptions));

mongoose
  .connect(
    "mongodb+srv://cluster:Satyapower2@cluster12.pntyc88.mongodb.net/test"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.post("/studentdetals", async (req, res) => {
  const { Name } = req.body;
  const { EmpId } = req.body;
  const { joiningdate } = req.body;
  try {
    const newdata = new Studentinfo({ Name, EmpId, joiningdate });
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

app.listen(3000, () => console.log("server running..."));

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle the request
  // ...
};

module.exports = app;
