const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./route");
app.use("/", router);

app.listen(3000, () => {
  console.log(`Application listening on http://localhost:${3000}`);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

module.exports = app;
