import { pool } from '../connection/index.js'

const getAuditoriums = async () => {
  const query = 'SELECT * FROM auditoriums'
  const { rows } = await pool.query(query)

  return rows
}

const getAuditoriumById = async (id) => {
  const query = 'SELECT * FROM auditoriums WHERE auditorium_id = $1'
  const { rows } = await pool.query(query, [id])

  return rows
}

const getSeatsByAuditoriumId = async ({ auditoriumId, showId }) => {
  const query = `SELECT
          a_seats.*,
          CASE WHEN a_seats.auditorium_seat_id = s_seats.auditorium_seat_id AND s_seats.show_id = $1
              THEN true
              ELSE false
          END as used
      FROM auditorium_seats AS a_seats
      INNER JOIN show_seats AS s_seats ON
      a_seats.auditorium_id = $2;`
  const { rows } = await pool.query(query, [showId, auditoriumId])

  return rows
}

export const auditoriums = {
  getAuditoriums,
  getAuditoriumById,
  getSeatsByAuditorium: getSeatsByAuditoriumId
}
