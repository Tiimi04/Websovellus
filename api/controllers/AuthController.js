import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { findByUsername, findByEmail, createUser } from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = 10

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      const error = new Error('Username, email and password are required')
      error.status = 400
      throw error
    }

    const existingUsername = await findByUsername(username)
    if (existingUsername) {
      const error = new Error('Username is already taken')
      error.status = 409
      throw error
    }

    const existingEmail = await findByEmail(email)
    if (existingEmail) {
      const error = new Error('Email is already registered')
      error.status = 409
      throw error
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await createUser({ username, email, passwordHash })

    res.status(201).json({ user })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      const error = new Error('Username and password are required')
      error.status = 400
      throw error
    }

    const user = await findByUsername(username)
    if (!user) {
      const error = new Error('Invalid username or password')
      error.status = 401
      throw error
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatches) {
      const error = new Error('Invalid username or password')
      error.status = 401
      throw error
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '2h' }
    )

    res.status(200).json({
      token,
      user: { id: user.id, username: user.username, email: user.email }
    })
  } catch (error) {
    next(error)
  }
}

export {
  register,
  login
}
