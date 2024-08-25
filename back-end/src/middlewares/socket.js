const socket = require("socket.io");

const initSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Authorization", "Content-Type"],
    }
  });
  
  io.on("connection", (socket) => {
    console.log("User connected...");
    socket.on("disconnect", () => {
      console.log("User disconnected...");
    });
  });
  return io;
};

module.exports = initSocket;