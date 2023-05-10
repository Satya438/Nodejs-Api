const express = require("express");
const app = express();

const router = require("./route");
app.use("/", router);

app.listen(3000, () => {
  console.log(`Application listening on http://localhost:${3000}`);
});
