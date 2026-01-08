const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,

  otp: String,
  otpExpiresAt: Date,

  isVerified: { type: Boolean, default: false },

  refreshToken: String
});

module.exports = mongoose.model("User", userSchema);
