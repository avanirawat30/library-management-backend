const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({
  email: req.body.email
});

if (existingUser) {
  return res.status(400).json({
    message: "User already exists"
  });
}
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
  name: req.body.name,
  email: req.body.email,
  password: hashedPassword,
  role: req.body.role || "student"
});

    res.json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });

    if (!user) {
  return res.status(400).json({
    message: "Invalid email or password"
  });
}

    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatch) {
  return res.status(400).json({
    message: "Invalid email or password"
  });
}

   const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);

res.json({
  message: "Login successful",
  token,
  role: user.role
});

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;