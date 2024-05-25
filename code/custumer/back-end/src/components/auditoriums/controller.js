import { db } from '../../db/index.js'
import { response } from '../../network/response.js'
import { groupBy } from '../../utils/groupBy.js'

const getSeatByAuditoriumId = async (req, res) => {
  const { auditoriumId, showId } = req.query
  const seats = await db.auditoriums.getSeatsByAuditorium({
    auditoriumId,
    showId
  })

  response.success(res, {
    seats: groupBy(seats, ({ seat_row: seatRow }) => seatRow)
  })
}

export { getSeatByAuditoriumId }
