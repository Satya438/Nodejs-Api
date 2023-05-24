const io = require("socket.io-client");

const socket = io.connect("http://localhost:3000");

socket.on("connect", () => {
  console.log("server connected");
  socket.emit("chat message", "hello");
});

socket.on("chat message", (msg) => {
  console.log("received messaage", msg);
});

socket.on("disconneted", () => {
  console.log("disconnected from the server");
});
