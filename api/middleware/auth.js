import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    const error = new Error('Kirjautuminen vaaditaan')
    error.status = 401
    return next(error)
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    const error = new Error('Virheellinen tai vanhentunut kirjautuminen')
    error.status = 401
    next(error)
  }
}

export default authenticate
