const express = require("express");
const mongoose = require("mongoose");

const BrandName = require("./model");

const app = express();
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://cluster:Satyapower2@cluster12.pntyc88.mongodb.net/test"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.post("/addbrand", async (req, res) => {
  const { brandname } = req.body;
  try {
    const newdata = new BrandName({ brandname });
    newdata.save();
    return res.json(await BrandName.find());
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/getallbrands", async (req, res) => {
  try {
    const data = await BrandName.find();
    return res.json(data);
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/getallbrands/:id", async (req, res) => {
  try {
    const Data = await BrandName.findById(req.params.id);
    return res.json(Data);
  } catch (err) {
    console.log(err.message);
  }
});
app.delete("/deletebrand/:id", async (req, res) => {
  try {
    const deletedat = await BrandName.findByIdAndDelete(req.params.id);
    return res.json(deletedat);
  } catch (err) {
    console.log(err.message);
  }
});
app.put("/updatebrand/:id", async (req, res) => {
  try {
    const update = await BrandName.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(update);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => console.log("server running..."));

module.exports = app;
