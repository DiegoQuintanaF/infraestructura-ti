import { pool } from '../connection/index.js'

const createTicket = async ({ userId, showId, totalSeats }) => {
  const query = `
    INSERT INTO tickets (user_id, show_id, number_of_seats, status)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `
  const values = [userId, showId, totalSeats, true]

  const { rows } = await pool.query(query, values)

  return rows[0]
}

export const tickets = { createTicket }
