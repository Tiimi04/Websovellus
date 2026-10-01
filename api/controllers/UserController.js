import { searchUsers, findPublicById } from '../models/User.js'

const search = async (req, res, next) => {
    try {
        const { query } = req.query
        if (!query || query.trim().length < 2) {
            return res.json([])
        }

        const users = await searchUsers(query.trim())
        return res.json(users)
    } catch (error) {
        next(error)
    }
}

const getPublicById = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await findPublicById(id)
        if (!user) {
           const error = new Error('Käyttäjää ei löytynyt')
           error.status = 404
           return next(error)
        }
        return res.json(user)
    } catch (error) {
        next(error)
    }
}


export { search, getPublicById }