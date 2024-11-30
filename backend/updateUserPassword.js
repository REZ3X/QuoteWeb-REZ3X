const bcrypt = require('bcrypt');
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

const updateUserPassword = async (username, password) => {
  const hash_password = await bcrypt.hash(password, 10);
  const query = 'UPDATE users SET hash_password = ? WHERE username = ?';
  sequelize.query(query, { replacements: [hash_password, username], type: sequelize.QueryTypes.UPDATE })
    .then(() => {
      console.log('User password updated successfully');
    })
    .catch((err) => {
      console.error('Error updating user password:', err.message);
    });
};

// Example usage
updateUserPassword('REZ3X', 'ceber222');