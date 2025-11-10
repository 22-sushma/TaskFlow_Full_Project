import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '3306',
  database: process.env.DB_NAME || 'taskflow_db',
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
  waitForConnections: true,
});

pool.on('connection', (connection) => {
  console.log('DB Connection established');
});