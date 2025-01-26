const Pool = require('pg').Pool;
require("dotenv").config();
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Ensure correct path

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    port: process.env.POSTGRES_DB_PORT
});


// Test the connection
(async () => {
    try {
      const res = await pool.query('SELECT NOW() AS connected_at');
      console.log('Database connected successfully at:', res.rows[0].connected_at);
    } catch (err) {
      console.error('Error connecting to the database:', err);
    } finally {
      pool.end();
    }
  })();

module.exports = pool;