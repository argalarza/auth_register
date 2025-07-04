// models/user.js
const pool = require('../config/db');

async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function createUser(user) {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, password_hash, birthdate, gender, provider, role)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user.name, user.email, user.password_hash, user.birthdate, user.gender, user.provider, user.role]
  );
  return result.insertId;
}

module.exports = {
  findUserByEmail,
  createUser
};
