const socket = require("socket.io");

const initSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: function (origin, callback) {
        if (!origin) {
          return callback(null, true);
        }
        if (process.env.NODE_ENV === "production") {
          if (origin === process.env.CLIENT_URL) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        } else {
          callback(null, true);
        }
      },
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