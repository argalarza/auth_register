const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  port: process.env.MYSQL_DB_PORT || 3306,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
