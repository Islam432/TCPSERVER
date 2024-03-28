
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function connectionTCP() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DBC_USER,
    password: process.env.DBC_PASSWORD,
    database: process.env.DBC_NAME,
  });
  return connection;
}