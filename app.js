var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors"); // add at the top

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(cors()); // add after 'app' is created
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// shows that the backend is deployed successfully
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

module.exports = app;
