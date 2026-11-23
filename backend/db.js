const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'portafolio_kail',
  password: process.env.DB_PASSWORD,
  port: 5432
})

pool.on('error', (err) => {
  console.error('Error inesperado de PostgreSQL:', err.message)
})

module.exports = pool