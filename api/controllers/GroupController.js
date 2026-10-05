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

const getDiscoverGroups = async (req, res, next) => {
    try {
        const result = await pool.query(
            `Select g.id, g.name, g.owner_id, g.created,
            u.username AS owner_username FROM groups g
            JOIN users u ON u.id = g.owner_id
            WHERE g.id NOT IN (SELECT group_id FROM group_members WHERE user_id = $1)`,
            [req.user.id]
        )

        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

const joinGroup = async (req, res, next) => {
    try {
        const result = await pool.query(
            `INSERT INTO group_members (group_id, user_id)
            VALUES ($1, $2) RETURNING group_id, user_id`,
            [req.params.groupId, req.user.id]
        )

        res.status(201).json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const getGroupMembers = async (req, res, next) => {
    try {
        const { groupId } = req.params

        const result = await pool.query(
            `SELECT u.id, u.username, u.profile_image, gm.joined_at
             FROM group_members gm
             JOIN users u ON u.id = gm.user_id
             WHERE gm.group_id = $1`,
            [groupId]
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
            const error = new Error('Ryhmää ei löytynyt')
            error.status = 404
            throw error
        }

        res.json({ message: 'Ryhmä poistettu', group: result.rows[0] })
    } catch (error) {
        next(error)
    }
}

const leaveGroup = async (req, res, next) => {
    try {
        const { groupId } = req.params
        const result = await pool.query(
            `DELETE FROM group_members
            WHERE group_id = $1 AND user_id = $2
            RETURNING group_id, user_id`,
            [groupId, req.user.id]
        )

        if (!result.rows[0]) {
            const error = new Error('You are not a member of this group')
            error.status = 404
            throw error
        }

        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

export { getGroups,
    getGroupMembers,
    createGroup,
    deleteGroup,
    getDiscoverGroups,
    joinGroup,
    leaveGroup
}