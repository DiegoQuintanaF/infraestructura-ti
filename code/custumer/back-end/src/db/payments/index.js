import { pool } from '../connection/index.js'

const createPayment = async ({ ticketId }) => {
  const query = `
    INSERT INTO payments (ticket_id)
    VALUES ($1)
    RETURNING *
  `

  const { rows } = await pool.query(query, [ticketId])
  return rows[0]
}

export const payments = {
  createPayment
}
