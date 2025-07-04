const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, username, password, type } = req.body;
    const user = await User.create({ name, email, phone, username, password, type });
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
    const [ updated ] = await User.update(req.body, {
      where: { userId: req.params.userId },
      returning: true
    });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated', user: updated });
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