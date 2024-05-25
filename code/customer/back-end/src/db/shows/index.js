import { pool } from '../connection/index.js'

const createShowSeat = async ({
  price,
  auditoriumSeatId,
  showId,
  ticketId
}) => {
  const query = `
    INSERT INTO show_seats (price, auditorium_seat_id, show_id, ticket_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `
  const values = [price, auditoriumSeatId, showId, ticketId]

  const { rows } = await pool.query(query, values)

  return rows[0]
}

const getShowSeatByShowId = async (showId) => {
  const query = 'SELECT * FROM show_seats WHERE show_id = $1'
  const { rows } = await pool.query(query, [showId])

  return rows
}

export const shows = {
  createShowSeat,
  getShowSeatByShowId
}
