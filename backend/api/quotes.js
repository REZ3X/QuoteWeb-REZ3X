// api/quotes.js
const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
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

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

const isAdmin = (req, res, next) => {
  if (req.session.role === 'admin') {
    return next();
  }
  res.status(403).json({ error: 'Forbidden' });
};

// Get all quotes
router.get('/', isAuthenticated, (req, res) => {
  let query;
  let replacements;
  if (req.session.role === 'admin') {
    query = 'SELECT * FROM quotes';
    replacements = [];
  } else {
    query = 'SELECT * FROM quotes WHERE user_id = ?';
    replacements = [req.session.userId];
  }
  sequelize.query(query, { replacements, type: sequelize.QueryTypes.SELECT })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Add a new quote
router.post('/', isAuthenticated, (req, res) => {
  const { quote, date, writer } = req.body;
  const userId = req.session.userId;
  const query = 'INSERT INTO quotes (quote, date, writer, user_id) VALUES (?, ?, ?, ?)';
  const currentDate = date || new Date().toISOString().split('T')[0]; // Use current date if date is not provided
  sequelize.query(query, { replacements: [quote, currentDate, writer, userId], type: sequelize.QueryTypes.INSERT })
    .then((results) => {
      res.json({ id: results[0], quote, date: currentDate, writer, user_id: userId });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Update a quote
router.put('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const { quote, date, writer } = req.body;
  const userId = req.session.userId;
  let query;
  let replacements;
  if (req.session.role === 'admin') {
    query = 'UPDATE quotes SET quote = ?, date = ?, writer = ? WHERE id = ?';
    replacements = [quote, date, writer, id];
  } else {
    query = 'UPDATE quotes SET quote = ?, date = ?, writer = ? WHERE id = ? AND user_id = ?';
    replacements = [quote, date, writer, id, userId];
  }
  sequelize.query(query, { replacements, type: sequelize.QueryTypes.UPDATE })
    .then(() => {
      res.json({ id, quote, date, writer });
    })
    .catch((err) => {
      console.error('Error updating quote:', err);
      res.status(500).json({ error: err.message });
    });
});

// Delete a quote
router.delete('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;
  let query;
  let replacements;
  if (req.session.role === 'admin') {
    query = 'DELETE FROM quotes WHERE id = ?';
    replacements = [id];
  } else {
    query = 'DELETE FROM quotes WHERE id = ? AND user_id = ?';
    replacements = [id, userId];
  }
  sequelize.query(query, { replacements, type: sequelize.QueryTypes.DELETE })
    .then(() => {
      res.json({ message: 'Quote deleted successfully' });
    })
    .catch((err) => {
      console.error('Error deleting quote:', err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;