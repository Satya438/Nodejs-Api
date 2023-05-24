const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("received message");
    io.emit("chat message", msg);
  });

  socket.on("disconected", () => {
    console.log("a user disconnected");
  });
});

app.listen(3000, () => {
  console.log("server running in 3000");
});
