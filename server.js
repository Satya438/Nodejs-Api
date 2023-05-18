const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Employeinfo = require("./student");
const app = express();

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
    const newdata = new Employeinfo({ Name, EmpId, joiningdate });
    newdata.save();
    return res.json(await Employeinfo.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getstudenttdetails", async (req, res) => {
  try {
    const data = await Employeinfo.find();
    return res.json(data);
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/getstudenttdetail/:id", async (req, res) => {
  try {
    const Data = await Employeinfo.findById(req.params.id);
    return res.json(Data);
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/updatestudentdetails/:id", async (req, res) => {
  try {
    const update = await Employeinfo.findByIdAndUpdate(
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
    const data = await Employeinfo.findByIdAndDelete(req.params.id);
    return res.json(data);
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(3000, () => console.log("server running..."));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
// module.exports = (req, res) => {
//   // Set CORS headers
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   // Handle the request
//   // ...
// };

module.exports = app;
