import { db } from '../../db/index.js'
import { response } from '../../network/response.js'

const createCheckout = async (req, res) => {
  const { userId, showId, seats } = req.body

  try {
    if (!userId || !showId || !seats) {
      return response.error(res, 'Missing required fields', 400)
    }

    const totalSeats = seats?.length

    // Create ticket
    const ticketRes = await db.tickets.createTicket({
      userId,
      showId,
      totalSeats
    })

    seats.forEach(async (seat) => {
      await db.shows.createShowSeat({
        price: 7600,
        auditoriumSeatId: seat.auditoriumSeatId,
        showId,
        ticketId: ticketRes.ticket_id
      })
    })

    const paymentRes = await db.payments.createPayment({
      ticketId: ticketRes.ticket_id
    })

    console.log(ticketRes)
    console.log(paymentRes)

    response.success(res, ticketRes, 201)
  } catch (error) {
    console.log(error)
    response.error(res, error, 500)
  }
}

export { createCheckout }
