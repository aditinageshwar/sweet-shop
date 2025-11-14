const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'This account already exists.Please try log in to continue.' });

    const user = new User({
      username,
      email,
      password: password,
      role,
    });

    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } 
  catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role },process.env.JWT_SECRET,{ expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } 
  catch (err) {
    res.status(400).json({ error: err.message });
  }
};
