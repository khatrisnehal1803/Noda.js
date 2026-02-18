const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("process.env.mongodb://localhost:27017");
  console.log("MongoDB Connected");
};

module.exports = connectDB;
