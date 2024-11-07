// src/controllers/authController.js
const { auth } = require('../config/firebase');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    res.cookie('token', user.getIdToken(), { httpOnly: true });
    res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    res.status(401).send({ message: 'Authentication failed', error });
  }
};

const registerUser = async (req, res) => {
  const { email, password, nickname } = req.body;
  try {
    const user = await auth.createUser({ email, password, displayName: nickname });
    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).send({ message: 'Registration failed', error });
  }
};

module.exports = { loginUser, registerUser };
