const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017")
.then(() => console.log("MongoDB Connected "))
.catch((err) => console.log("MongoDB Error ", err));

app.get("/", (req, res) => {
  res.send("Backend + MongoDB Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
