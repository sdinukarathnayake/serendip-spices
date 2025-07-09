const User = require('../models/User');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: "Invalid username or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid username or password" });

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.userId,
        name: user.name,
        username: user.username,
        type: user.type
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Respond with token and user info (omit password)
    res.json({
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        username: user.username,
        type: user.type
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, username, password, type } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ name, email, phone, username, password: hashedPassword, type });
    res.status(201).json({ message: 'User created', user });
    
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

exports.viewAllUsers = async (_req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

exports.viewUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    }

    const [rowsAffected, [updatedUser]] = await User.update(req.body, {
      where: { userId: req.params.userId },
      returning: true
    });

    if (!rowsAffected) return res.status(404).json({ message: "User not found" });
  
    res.json({ message: 'User updated', user: updatedUser });
    
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { userId: req.params.userId } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};