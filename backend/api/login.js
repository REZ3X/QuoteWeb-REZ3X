// api/login.js
const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const query = 'SELECT * FROM users WHERE username = ?';
  sequelize.query(query, { replacements: [username], type: sequelize.QueryTypes.SELECT })
    .then(async (results) => {
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const user = results[0];
      const match = await bcrypt.compare(password, user.hash_password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      req.session.userId = user.id;
      req.session.role = user.role;
      res.json({ message: 'Login successful', userId: user.id, role: user.role });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Logout successful' });
  });
});

module.exports = router;