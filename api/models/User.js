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

const deleteUserById = async (id) => {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING id, username, email',
    [id]
  )
  return result.rows[0]
}

const updateProfileImage = async (id, profileImagePath) => {
  const result = await pool.query(
    `UPDATE users SET profile_image = $1
     WHERE id = $2
     RETURNING id, username, email, profile_image`,
    [profileImagePath, id]
  )
  return result.rows[0]
}

export {
  findByUsername,
  findByEmail,
  createUser,
  deleteUserById,
  updateProfileImage
}
