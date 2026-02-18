const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: false
}));

mongoose.connect("process.env.mongodb://localhost:27017")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.use("/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

module.exports = app;
