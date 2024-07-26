const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const http = require("http");
const path = require("path");
require("dotenv").config();
require("./middlewares/passport-google");
const app = express();
const port = 3000;
const server = http.createServer(app);
const database = require("../config/connect");
const router = require("./api/v1/routes/index.route");
const initSocket = require("./middlewares/socket");
const io = initSocket(server);

database.connect();

// Middleware setup
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "my-custom-header", "Content-Type"],
}));
app.options("*", cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 minutes
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("socketio", io);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", async (req, res) => {
  res.send("Server is listening...");
});

router(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});