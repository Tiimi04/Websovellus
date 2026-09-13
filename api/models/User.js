import { pool } from './db.js'

const findByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])
  return result.rows[0]
}

const findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  return result.rows[0]
}

const createUser = async ({ username, email, passwordHash }) => {
  const result = await pool.query(
    `INSERT INTO users (username, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, username, email`,
    [username, email, passwordHash]
  )
  return result.rows[0]
}

export {
  findByUsername,
  findByEmail,
  createUser
}
