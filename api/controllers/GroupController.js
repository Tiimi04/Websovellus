import { pool } from '../models/db.js'

const createGroup = async (req, res, next) => {
    try {
        const { name } = req.body

        if (!name?.trim()) {
            const error = new Error('Ryhmän nimi ei voi olla tyhjä')
            error.status = 400
            throw error
        }

        const result = await pool.query(
            `INSERT INTO groups (name, owner_id) VALUES ($1, $2) RETURNING
            id, name, owner_id, created`,
            [name.trim(), req.user.id]
        )

        await pool.query(
            `INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)`,
            [result.rows[0].id, req.user.id]
        )

        res.status(201).json({
            ...result.rows[0],
            owner_username: req.user.username
        })
        
    } catch (error) {
        next(error)
    }
}

const getGroups = async (req, res, next) => {

    try {
        const result = await pool.query(
            `SELECT g.id, g.name, g.owner_id, g.created,
            u.username AS owner_username FROM groups g
            JOIN users u ON u.id = g.owner_id
            JOIN group_members gm ON gm.group_id = g.id WHERE gm.user_id = $1
            ORDER BY g.created DESC`,
            [req.user.id]
        )

        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

const deleteGroup = async (req, res, next) => {
    try {
        const { groupId } = req.params

        const result = await pool.query(
            `DELETE FROM groups
             WHERE id = $1 AND owner_id = $2
             RETURNING id, name`,
            [groupId, req.user.id]
        )

        if (!result.rows[0]) {
            const error = new Error('Ryhmää ei löytynyt tai sinulla ei ole oikeutta poistaa sitä')
            error.status = 404
            throw error
        }

        res.json({ message: 'Ryhmä poistettu', group: result.rows[0] })
    } catch (error) {
        next(error)
    }
}

export { getGroups, createGroup, deleteGroup}