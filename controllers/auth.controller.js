const db = require('../models');
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create user
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).send({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    // Check password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: 'Invalid password!' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, 'supersecret', {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({ id: user.id, username: user.username, accessToken: token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
