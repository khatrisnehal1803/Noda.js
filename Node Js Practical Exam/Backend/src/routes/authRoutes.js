const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashedPassword
  });

  res.send("User Registered Successfully");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Wrong Password");

  req.session.user = user._id;

  res.send("Login Successful");
});


router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out");
});

module.exports = router;
