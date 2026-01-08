const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../config/mail");
const { generateOTP, otpExpiry } = require("../utils/generateOTP");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

// Signup
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  await User.create({
    email,
    password: hashed,
    otp,
    otpExpiresAt: otpExpiry()
  });

  await mailer.sendMail({
    to: email,
    subject: "OTP Verification",
    text: `OTP: ${otp}`
  });

  res.status(201).json({ message: "OTP sent to email" });
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();

  res.json({ message: "Email verified" });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.isVerified)
    return res.status(401).json({ message: "Unauthorized" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid password" });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({ accessToken, refreshToken });
};

// Refresh Token
exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(decoded.id);
    res.json({ accessToken: newAccessToken });
  });
};
