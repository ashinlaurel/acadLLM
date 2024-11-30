const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  res.json(user);
};

