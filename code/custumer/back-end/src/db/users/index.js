import { pool } from '../connection/index.js'

const getUsers = async () => {
  const query = 'SELECT * FROM users'
  const response = await pool.query(query)
  return response.rows
}

const getUserById = async (id) => {
  const query = 'SELECT user_id, name, email FROM users WHERE user_id = $1'
  const response = await pool.query(query, [id])
  return response.rows[0]
}

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1'
  const response = await pool.query(query, [email])
  return response.rows[0]
}

const createUser = async (name, email, password) => {
  const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'
  try {
    const response = await pool.query(query, [name, email, password])
    return response.rows[0]
  } catch (error) {
    throw new Error('Error creating user')
  }
}

export const users = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser
}
